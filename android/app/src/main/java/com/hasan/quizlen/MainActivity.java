package com.hasan.quizlen;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.speech.tts.TextToSpeech;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import androidx.webkit.WebViewAssetLoader;
import org.json.JSONObject;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MainActivity extends Activity {
    private static final String ORIGIN = "https://appassets.androidplatform.net";
    private static final int EXPORT = 101, IMPORT = 102, AUTO_BACKUP = 103;
    private static final int MAX_BYTES = 5 * 1024 * 1024;
    private WebView web;
    private SharedPreferences data, backupSettings;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private final ExecutorService io = Executors.newSingleThreadExecutor();
    private TextToSpeech speech;
    private boolean speechReady, resumed;
    private final Runnable backupTask = () -> saveAutomaticBackup();

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        data = getSharedPreferences("quizlen_data", MODE_PRIVATE);
        backupSettings = getSharedPreferences("quizlen_backup_settings", MODE_PRIVATE);
        web = new WebView(this);
        web.setBackgroundColor(Color.rgb(10, 9, 45));
        setContentView(web);
        web.setOnApplyWindowInsetsListener((view, insets) -> {
            if (Build.VERSION.SDK_INT >= 30) {
                android.graphics.Insets bars = insets.getInsets(android.view.WindowInsets.Type.systemBars() | android.view.WindowInsets.Type.ime());
                view.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            } else {
                view.setPadding(insets.getSystemWindowInsetLeft(), insets.getSystemWindowInsetTop(), insets.getSystemWindowInsetRight(), insets.getSystemWindowInsetBottom());
            }
            return insets;
        });
        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMediaPlaybackRequiresUserGesture(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        WebViewAssetLoader loader = new WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this)).build();
        web.setWebViewClient(new WebViewClient() {
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                WebResourceResponse response = loader.shouldInterceptRequest(request.getUrl());
                return response != null ? response : new WebResourceResponse("text/plain", "UTF-8", 403, "Blocked", null, new ByteArrayInputStream(new byte[0]));
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if ("https".equals(uri.getScheme()) && "appassets.androidplatform.net".equals(uri.getHost()) && "/assets/index.html".equals(uri.getPath())) return false;
                if (request.isForMainFrame() && request.hasGesture() && ("https".equals(uri.getScheme()) || "http".equals(uri.getScheme()))) {
                    try { startActivity(new Intent(Intent.ACTION_VIEW, uri)); } catch (Exception e) { message("Bağlantıyı açacak tarayıcı bulunamadı."); }
                }
                return true;
            }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onJsAlert(WebView view, String url, String text, JsResult result) {
                new AlertDialog.Builder(MainActivity.this).setMessage(text).setPositiveButton("Tamam", (d,w) -> result.confirm()).setOnCancelListener(d -> result.cancel()).show();
                return true;
            }
            @Override public boolean onJsConfirm(WebView view, String url, String text, JsResult result) {
                new AlertDialog.Builder(MainActivity.this).setMessage(text).setPositiveButton("Devam et", (d,w) -> result.confirm()).setNegativeButton("Vazgeç", (d,w) -> result.cancel()).setOnCancelListener(d -> result.cancel()).show();
                return true;
            }
        });
        web.addJavascriptInterface(new Bridge(), "QuizlenAndroid");
        speech = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                int available = speech.setLanguage(Locale.US);
                speechReady = available != TextToSpeech.LANG_MISSING_DATA && available != TextToSpeech.LANG_NOT_SUPPORTED;
                speech.setSpeechRate(0.95f);
            }
        });
        if (Build.VERSION.SDK_INT >= 33) getOnBackInvokedDispatcher().registerOnBackInvokedCallback(0, this::goBack);
        web.loadUrl(ORIGIN + "/assets/index.html");
    }

    private void goBack() {
        if (web == null) { finish(); return; }
        web.evaluateJavascript("!!(window.quizlenCloseMenu && window.quizlenCloseMenu())", closed -> {
            if ("true".equals(closed) || web == null) return;
            if (web.canGoBack()) web.goBack(); else finish();
        });
    }
    // API 33+ uses the registered OnBackInvokedCallback above; this is the API 23-32 fallback.
    @android.annotation.SuppressLint("GestureBackNavigation")
    @Override public void onBackPressed() { goBack(); }
    @Override protected void onResume() {
        super.onResume(); resumed = true;
        if (web != null) {
            web.resumeTimers(); web.onResume();
            web.evaluateJavascript("window.quizlenSetBackground && window.quizlenSetBackground(false)", null);
        }
    }
    @Override protected void onPause() {
        resumed = false;
        if (speech != null) speech.stop();
        if (web != null) {
            web.evaluateJavascript("window.quizlenSetBackground && window.quizlenSetBackground(true)", value -> { if (!resumed && web != null) web.pauseTimers(); });
            web.onPause();
        }
        super.onPause();
    }
    @Override protected void onStop() {
        handler.removeCallbacks(backupTask);
        saveAutomaticBackup();
        super.onStop();
    }
    @Override protected void onDestroy() {
        handler.removeCallbacks(backupTask);
        if (speech != null) { speech.stop(); speech.shutdown(); }
        if (web != null) { web.removeJavascriptInterface("QuizlenAndroid"); web.destroy(); web = null; }
        io.shutdown();
        super.onDestroy();
    }
    private void message(String text) { runOnUiThread(() -> Toast.makeText(this, text, Toast.LENGTH_LONG).show()); }
    private void notifyBackup(String text) {
        runOnUiThread(() -> { if (web != null) web.evaluateJavascript("window.quizlenBackupNotice && window.quizlenBackupNotice(" + JSONObject.quote(text) + ")", null); });
    }
    private String snapshot() {
        JSONObject result = new JSONObject();
        for (Map.Entry<String, ?> entry : data.getAll().entrySet()) {
            try { if (entry.getKey().startsWith("qz_") && entry.getValue() instanceof String) result.put(entry.getKey(), entry.getValue()); } catch (Exception ignored) { }
        }
        return result.toString();
    }
    private String backupJson() {
        try { return new JSONObject().put("format", "quizlen-backup").put("version", 1).put("createdAt", System.currentTimeMillis()).put("data", new JSONObject(snapshot())).toString(); }
        catch (Exception e) { throw new IllegalStateException(e); }
    }
    private void changed() {
        runOnUiThread(() -> { handler.removeCallbacks(backupTask); handler.postDelayed(backupTask, 2000); });
    }
    private void saveAutomaticBackup() {
        String uri = backupSettings.getString("uri", "");
        if (uri.isEmpty() || io.isShutdown()) return;
        String json = backupJson();
        String contents = snapshot();
        if (contents.equals(backupSettings.getString("lastContents", ""))) return;
        io.execute(() -> {
            try {
                writeDocument(Uri.parse(uri), json);
                backupSettings.edit().putString("lastContents", contents).putLong("lastSaved", System.currentTimeMillis()).remove("error").apply();
                notifyBackup("Otomatik yedek güncel.");
            } catch (Exception e) {
                backupSettings.edit().putString("error", "Yedek dosyasına yazılamadı. Dosyayı yeniden seçin.").apply();
                notifyBackup("Otomatik yedek yazılamadı. Yedekleme ekranından dosyayı yeniden seçin.");
            }
        });
    }
    private void writeDocument(Uri uri, String json) throws Exception {
        try (OutputStream output = getContentResolver().openOutputStream(uri, "wt")) {
            if (output == null) throw new java.io.IOException("Dosya açılamadı");
            output.write(json.getBytes(StandardCharsets.UTF_8));
            output.flush();
        }
    }
    private void selectDocument(int code) {
        Intent intent = new Intent(code == IMPORT ? Intent.ACTION_OPEN_DOCUMENT : Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType(code == IMPORT ? "*/*" : "application/json");
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
        if (code != IMPORT) intent.putExtra(Intent.EXTRA_TITLE, code == AUTO_BACKUP ? "Quizlen-otomatik-yedek.json" : "Quizlen-yedek-" + System.currentTimeMillis() + ".json");
        try { startActivityForResult(intent, code); } catch (Exception e) { message("Telefonun dosya seçicisi açılamadı."); }
    }
    @Override protected void onActivityResult(int code, int result, Intent intent) {
        super.onActivityResult(code, result, intent);
        if (result != RESULT_OK || intent == null || intent.getData() == null) return;
        Uri uri = intent.getData();
        if (code == AUTO_BACKUP) {
            try {
                getContentResolver().takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
                backupSettings.edit().putString("uri", uri.toString()).remove("lastContents").remove("lastSaved").remove("error").apply();
                saveAutomaticBackup();
            } catch (Exception e) { message("Bu konum otomatik yedeklemeyi desteklemiyor. Belgeler klasörünü deneyin."); }
        } else if (code == EXPORT) {
            String json = backupJson();
            io.execute(() -> { try { writeDocument(uri, json); message("Yedek dosyası kaydedildi."); notifyBackup("Yedek dosyası kaydedildi."); } catch (Exception e) { message("Yedek kaydedilemedi; tekrar deneyin."); } });
        } else if (code == IMPORT) {
            io.execute(() -> {
                try (InputStream input = getContentResolver().openInputStream(uri); ByteArrayOutputStream output = new ByteArrayOutputStream()) {
                    if (input == null) throw new java.io.IOException();
                    byte[] buffer = new byte[8192]; int count;
                    while ((count = input.read(buffer)) != -1) { if (output.size() + count > MAX_BYTES) throw new java.io.IOException("Dosya çok büyük"); output.write(buffer, 0, count); }
                    String text = output.toString("UTF-8");
                    runOnUiThread(() -> { if (web != null) web.evaluateJavascript("window.quizlenImportBackup(" + JSONObject.quote(text) + ")", null); });
                } catch (Exception e) { message("Yedek okunamadı. En fazla 5 MB boyutunda Quizlen yedeği seçin."); }
            });
        }
    }
    public class Bridge {
        @JavascriptInterface public String getAll() { return snapshot(); }
        @JavascriptInterface public boolean setItem(String key, String value) {
            if (!key.matches("qz_[A-Za-z0-9_.-]+") || value.length() > MAX_BYTES) return false;
            data.edit().putString(key, value).apply(); changed(); return true;
        }
        @JavascriptInterface public boolean replaceAll(String text) {
            try {
                if (text.length() > MAX_BYTES) return false;
                JSONObject values = new JSONObject(text);
                if (values.length() > 10000) return false;
                SharedPreferences.Editor edit = data.edit().clear();
                Iterator<String> keys = values.keys();
                while (keys.hasNext()) {
                    String key = keys.next();
                    if (!key.matches("qz_[A-Za-z0-9_.-]+") || !(values.get(key) instanceof String)) return false;
                    edit.putString(key, values.getString(key));
                }
                boolean saved = edit.commit();
                if (saved) changed();
                return saved;
            } catch (Exception e) { return false; }
        }
        @JavascriptInterface public void exportBackup() { runOnUiThread(() -> selectDocument(EXPORT)); }
        @JavascriptInterface public void importBackup() { runOnUiThread(() -> selectDocument(IMPORT)); }
        @JavascriptInterface public void enableAutoBackup() { runOnUiThread(() -> selectDocument(AUTO_BACKUP)); }
        @JavascriptInterface public String backupStatus() {
            try { return new JSONObject().put("enabled", !backupSettings.getString("uri", "").isEmpty()).put("lastSaved", backupSettings.getLong("lastSaved", 0)).put("error", backupSettings.getString("error", "")).toString(); }
            catch (Exception e) { return "{}"; }
        }
        @JavascriptInterface public void speak(String text) {
            if (text.length() > 2000) return;
            runOnUiThread(() -> { if (speechReady && speech != null) speech.speak(text, TextToSpeech.QUEUE_FLUSH, null, "quizlen"); else message("Telefon ayarlarından İngilizce metin okuma sesini yükleyin."); });
        }
    }
}
