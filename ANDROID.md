# Quizlen Android

Android 6.0 ve üzeri için çevrimdışı APK. Uygulama kimliği: `com.hasan.quizlen`.

## Telefonda kurulum ve güncelleme

1. `releases` klasöründeki APK dosyasını telefona gönderip açın.
2. Sonraki sürümleri uygulamayı **silmeden**, aynı şekilde açıp **Güncelle** diyerek kurun.
3. İlk kullanımda üstteki **Yedek → Otomatik yedek dosyası seç** düğmesine basın; **Belgeler** veya **İndirilenler** içinde bir dosya seçin. Son başarılı yedek tarihini kontrol edin.
4. Uygulamayı silmeniz gerekirse önce yedeğin güncel olduğunu kontrol edin. Yeniden kurunca **Yedek → Yedeği geri yükle** ile bu dosyayı seçin. Geri yükleme mevcut iki profilin kayıtlarını değiştirir.

Android, uygulama kaldırılınca uygulamanın kendi alanını silebilir. Harici dosya yedeği bu yüzden gereklidir. Destekleyen telefonlarda kaldırma ekranındaki verileri saklama seçeneği de açıktır. Android sistem yedeği ek korumadır; çalışması ve güncelliği telefon/Google yedekleme ayarlarına bağlıdır ve garanti edilmez. [Android sistem yedekleme belgeleri](https://developer.android.com/identity/data/autobackup) bu koşulları açıklar. Harici dosyayı da silerseniz bu kopyadan geri yüklenemez.

Tarayıcıdaki mevcut ilerleme APK’ya kendiliğinden geçmez: güncellenmiş web uygulamasında **Yedek dosyası kaydet**, APK içinde **Yedeği geri yükle** kullanın. Hasan ve Zehra birlikte taşınır.

## Yeni APK üretme

Bu bilgisayarda proje içindeki araçlar hazır. İçerikleri düzenledikten sonra `build-apk.cmd` dosyasına çift tıklayın. İmzalı APK `releases` içine yazılır; sürüm numarası önceki başarılı derlemeye göre otomatik artar. PowerShell alternatifi:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/build-apk.ps1
```

Başka bilgisayarda ilk kurulum (resmi JDK, Gradle ve Android SDK indirir; SDK lisanslarını kabul eder):

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/setup-android.ps1
```

**İmza anahtarını yedekleyin:** `android/keystore/quizlen-release.p12` ve `android/signing.properties` dosyalarını birlikte, özel ve güvenli bir yerde saklayın. Bu dosyaları GitHub’a yüklemeyin. Aynı uygulamanın üzerine güncelleme yüklemek için aynı anahtar ve uygulama kimliği gerekir. `android/version.json` başarılı derlemenin sürümünü tutar; onu da koruyun.

## Veri ve pil davranışı

- Android kayıtları SharedPreferences içinde, web kayıtları mevcut localStorage anahtarlarıyla tutulur.
- JSON yedekleri sürümlüdür; biçim ve boyut kontrolü yapılır. Android geri yüklemesi tek işlemde yazılır; tarayıcı yazma hatasında eski kayıtları geri koyar.
- Kelime kataloğu, sonraki içerik güncellemelerinde aynı kelime/anlam çiftinin ilerlemesini korur. Poster paketleri arasındaki taşınmalar aynı kategori içinde izlenir. Kelimenin veya anlamının değişmesi yeni içerik sayılır; set kimliklerini ve poster kategori adlarını gereksiz değiştirmeyin. İlk kez bu sürüme geçmeden önce yapılmış sıralama değişiklikleri geçmiş veriden çıkarılamaz.
- Otomatik dosya yedeği yalnızca veri değiştiğinde kısa gecikmeyle ve uygulama kapanışında yazılır; sürekli kontrol döngüsü, arka plan servisi, konum takibi ve ekranı açık tutma kilidi yoktur.
- Arka planda WebView zamanlayıcıları ve ses durur. Eşleştirme süresi arka planda ilerlemez; sayfa değişiminde bekleyen eski geri çağrılar temizlenir.
- APK internet izni istemez. Kelimeler uygulamaya dahildir; sesli okuma telefonun İngilizce TTS sesini kullanır. Gerekirse telefon ayarlarından İngilizce ses yükleyin.
- Gerçek pil tüketimi cihaz, parlaklık ve kullanım süresine bağlıdır; fiziksel cihaz ölçümü yapılmadan pil yüzdesi garantisi verilmez.

## Doğrulama

`node scripts/test-storage.cjs`: iki profil, yedek geri yükleme, bozuk dosya reddi, kota hatasında geri alma, kelime sırası/paket değişikliği.

`scripts/build-apk.ps1`: release derleme + Android lint.

`node scripts/test-ui.cjs`: proje içindeki Playwright test kurulumu ile mobil arayüz, dosyadan geri yükleme ve arka plan zamanlayıcısı. Android köprüsü tarayıcı testinde taklit edilir; bu test gerçek Android dosya seçicisinin yerine geçmez.

Telefon üzerinde ilk kurulumdan sonra önerilen kontrol: bir kelimeyi yıldızlayın ve kurs dersi işaretleyin, yedek alın, sonraki APK’yı üzerine kurun ve kayıtları kontrol edin. Silme/yeniden kurma denemesini ancak yedek dosyasını güvenceye aldıktan sonra yapın.
