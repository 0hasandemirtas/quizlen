/* Quizlet klonu - uygulama mantığı */
(function () {
  "use strict";

  var D = window.DATA || {};

  /* ---------- Yardımcılar ---------- */
  function $(s, ctx) { return (ctx || document).querySelector(s); }
  function $$(s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  var store = {
    get: function (k, d) {
      try { var v = JSON.parse(localStorage.getItem("qz_" + k)); return v == null ? d : v; }
      catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem("qz_" + k, JSON.stringify(v)); } catch (e) {}
    }
  };
  function speak(text, lang) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = lang || "en-US";
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }

  /* ---------- İkonlar ---------- */
  var I = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
    library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="14" height="12" rx="2"/><path d="M8 4h11a2 2 0 0 1 2 2v11"/></svg>',
    learn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 10 5-10 5L2 8z"/><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"/></svg>',
    test: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    match: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/><path d="M17 3v4h-4M7 21v-4h4"/></svg>',
    grammar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2.5 2.9 5.9 6.6 1-4.7 4.6 1.1 6.5L12 17.4l-5.9 3.1 1.1-6.5L2.5 9.4l6.6-1z"/></svg>',
    audio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a6.5 6.5 0 0 1 0 13H11"/></svg>',
    progress: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/></svg>',
    tasks: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3h6v3H9z"/><path d="m9 14 2 2 4-4"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="m6 7 1 14h10l1-14"/><path d="M10 11v6M14 11v6"/></svg>',
    pencil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 3 4 4L8 20l-5 1 1-5z"/></svg>'
  };

  /* Yazılı cevap kontrolü: büyük/küçük harfe bakmaz, "to " önekini ve
     "/" ile ayrılmış alternatif cevapları kabul eder */
  function isCorrectAnswer(given, want) {
    function norm(x) { return String(x || "").trim().toLocaleLowerCase("en").replace(/\s+/g, " "); }
    var g = norm(given);
    if (!g) return false;
    return String(want).split("/").map(norm).some(function (w) {
      return g === w || (w.indexOf("to ") === 0 && g === w.slice(3));
    });
  }

  /* ---------- Veri: setleri kur ---------- */
  function buildSets() {
    var sets = [];
    if (D.words && D.words.length) {
      sets.push({
        id: "kelimeler", title: "Kelimeler", langs: ["İngilizce", "Türkçe"],
        terms: D.words.map(function (w) { return { term: w.en, def: w.tr, example: w.example || "" }; })
      });
    }
    if (D.phrases && D.phrases.length) {
      sets.push({
        id: "kaliplar", title: "Kalıplar / Cümleler", langs: ["İngilizce", "Türkçe"],
        terms: D.phrases.map(function (p) { return { term: p.en, def: p.tr, example: "" }; })
      });
    }
    if (D.irregular && D.irregular.length) {
      sets.push({
        id: "duzensiz-fiiller", title: "Düzensiz Fiiller", langs: ["V1", "V2 · V3 · Türkçe"],
        terms: D.irregular.map(function (v) {
          return { term: v.base, def: v.v2 + " · " + v.v3 + " — " + v.tr, example: "" };
        })
      });
    }
    (D.verbs || []).forEach(function (s, i) {
      if (s.items && s.items.length) {
        sets.push({
          id: "fiiller-" + i, title: s.name, langs: ["İngilizce", "Türkçe"],
          terms: s.items.map(function (v) { return { term: v.en, def: v.tr, example: "" }; })
        });
      }
    });
    return sets;
  }
  var SETS = buildSets();

  function getSet(id) {
    for (var i = 0; i < SETS.length; i++) if (SETS[i].id === id) return SETS[i];
    return null;
  }

  /* ---------- Yanlış hafızası ----------
     Yanlış cevaplanan terimler localStorage'da sayaçla tutulur.
     Her yanlış sayacı +1 artırır, her doğru -1 azaltır; sıfırlanınca listeden çıkar. */
  function hardKey(setId) { return "hard_" + setId; }
  function getHard(setId) { return store.get(hardKey(setId), {}); }
  function addMiss(setId, i) {
    var h = getHard(setId);
    h[i] = (h[i] || 0) + 1;
    store.set(hardKey(setId), h);
  }
  function decMiss(setId, i) {
    var h = getHard(setId);
    if (h[i] == null) return false;
    h[i]--;
    if (h[i] <= 0) delete h[i];
    store.set(hardKey(setId), h);
    return true;
  }
  function hardIndices(s) {
    var h = getHard(s.id);
    return s.terms.map(function (_, i) { return i; }).filter(function (i) { return h[i]; });
  }

  /* ---------- Doğru serisi ----------
     Üst üste doğru cevap sayısı tutulur; bir yanlış seriyi sıfırlar.
     MASTERED_AT seriye ulaşan kelime "kesin öğrenildi",
     TROUBLE_AT yanlışa ulaşan kelime "sürekli hata" sayılır. */
  var MASTERED_AT = 3, TROUBLE_AT = 3;
  function goodKey(setId) { return "good_" + setId; }
  function getGood(setId) { return store.get(goodKey(setId), {}); }
  function addHit(setId, i) {
    var g = getGood(setId);
    g[i] = (g[i] || 0) + 1;
    store.set(goodKey(setId), g);
  }
  function resetHit(setId, i) {
    var g = getGood(setId);
    var prev = g[i] || 0;
    if (g[i] != null) { delete g[i]; store.set(goodKey(setId), g); }
    return prev;
  }
  function setHit(setId, i, v) {
    var g = getGood(setId);
    if (v > 0) g[i] = v; else delete g[i];
    store.set(goodKey(setId), g);
  }
  function decHit(setId, i) {
    var g = getGood(setId);
    if (g[i] == null) return;
    g[i]--;
    if (g[i] <= 0) delete g[i];
    store.set(goodKey(setId), g);
  }

  /* ---------- Yıldızlar ---------- */
  function starKey(setId) { return "stars_" + setId; }
  function isStarred(setId, i) { return (store.get(starKey(setId), [])).indexOf(i) !== -1; }
  function toggleStar(setId, i) {
    var stars = store.get(starKey(setId), []);
    var pos = stars.indexOf(i);
    if (pos === -1) stars.push(i); else stars.splice(pos, 1);
    store.set(starKey(setId), stars);
  }

  /* ---------- Kenar menüsü ---------- */
  function renderSidebar(active) {
    var html = "";
    html += '<a class="side-link' + (active === "home" ? " active" : "") + '" href="#/">' + I.home + "Ana sayfa</a>";
    html += '<a class="side-link' + (active === "library" ? " active" : "") + '" href="#/kitaplik">' + I.library + "Kitaplığın</a>";
    html += '<a class="side-link' + (active === "progress" ? " active" : "") + '" href="#/ilerleme">' + I.progress + "İlerlemen</a>";
    html += '<a class="side-link' + (active === "course" ? " active" : "") + '" href="#/kurs">' + I.tasks + "Kurs ilerlemesi</a>";
    html += '<a class="side-link' + (active === "grammar" ? " active" : "") + '" href="#/gramer">' + I.grammar + "Gramer notları</a>";
    html += '<a class="side-link' + (active === "quiz" ? " active" : "") + '" href="#/quiz">' + I.test + "Quiz</a>";
    html += '<hr class="side-divider" />';
    html += '<div class="side-label">Setlerin</div>';
    SETS.forEach(function (s) {
      html += '<a class="side-link' + (active === "set:" + s.id ? " active" : "") + '" href="#/set/' + s.id + '">' + I.cards + esc(s.title) + "</a>";
    });
    $("#sidebar").innerHTML = html;
  }

  /* ---------- Görünüm durumu ---------- */
  var view = $("#view");
  var keyHandler = null; // aktif sayfanın klavye dinleyicisi
  var matchTimerId = null;

  function setPage(html, opts) {
    opts = opts || {};
    if (matchTimerId) { clearInterval(matchTimerId); matchTimerId = null; }
    keyHandler = null;
    document.body.classList.toggle("mode-open", !!opts.mode);
    // Eski sayfaların tıklama dinleyicileri birikmesin diye view'ı tazele
    var fresh = view.cloneNode(false);
    view.parentNode.replaceChild(fresh, view);
    view = fresh;
    view.innerHTML = html;
    renderSidebar(opts.side || "");
    window.scrollTo(0, 0);
  }

  document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;
    if (keyHandler) keyHandler(e);
  });

  /* ================= ANA SAYFA / KİTAPLIK ================= */
  function setCardHtml(s) {
    return '<a class="set-card" href="#/set/' + s.id + '">' +
      "<h3>" + esc(s.title) + "</h3>" +
      '<span class="term-badge">' + s.terms.length + " terim</span>" +
      '<div class="author"><span class="avatar">H</span> hasan</div></a>';
  }

  function renderHome(filter) {
    var list = SETS;
    if (filter) {
      var f = filter.toLocaleLowerCase("tr");
      list = SETS.filter(function (s) { return s.title.toLocaleLowerCase("tr").indexOf(f) !== -1; });
    }
    var html = '<div class="container-wide">';
    html += '<div class="section-title">' + (filter ? '"' + esc(filter) + '" için sonuçlar' : "Son çalışılanlar") + "</div>";
    html += '<div class="set-grid">' + (list.length ? list.map(setCardHtml).join("") : '<p class="empty-note">Sonuç bulunamadı.</p>') + "</div>";
    if (!filter) {
      html += '<div class="section-title">Popüler flash kart setleri</div>';
      html += '<div class="set-grid">' + shuffle(SETS).slice(0, 4).map(setCardHtml).join("") + "</div>";
    }
    html += "</div>";
    setPage(html, { side: filter ? "" : "home" });
  }

  function renderLibrary() {
    var html = '<div class="container-wide">';
    html += '<h1 class="page-title">Kitaplığın</h1>';
    html += '<div class="section-title">Flash kart setleri (' + SETS.length + ")</div>";
    html += '<div class="set-grid">' + SETS.map(setCardHtml).join("") + "</div></div>";
    setPage(html, { side: "library" });
  }

  /* ================= SET SAYFASI ================= */
  var fcState = { idx: 0, order: [], shuffled: false, flipped: false };

  function renderSet(setId) {
    var s = getSet(setId);
    if (!s) { location.hash = "#/"; return; }
    fcState = { idx: 0, order: s.terms.map(function (_, i) { return i; }), shuffled: false, flipped: false };

    var html = '<div class="container">';
    html += '<div class="set-head"><h1>' + esc(s.title) + "</h1>" +
      '<div class="meta">' + s.terms.length + " terim · " + esc(s.langs[0]) + " → " + esc(s.langs[1]) + "</div></div>";

    html += '<div class="mode-tiles">' +
      '<a class="mode-tile" href="#/set/' + s.id + '/kartlar">' + I.cards + "Kartlar</a>" +
      '<a class="mode-tile" href="#/set/' + s.id + '/ogren">' + I.learn + "Öğren</a>" +
      '<a class="mode-tile" href="#/set/' + s.id + '/test">' + I.test + "Test</a>" +
      '<a class="mode-tile" href="#/set/' + s.id + '/eslestir">' + I.match + "Eşleştir</a>" +
      "</div>";

    html += flashcardHtml(s);

    var hard = getHard(s.id);
    var good = getGood(s.id);
    var hardIdx = hardIndices(s);
    var restIdx = s.terms.map(function (_, i) { return i; }).filter(function (i) { return !hard[i]; });

    function rowHtml(i) {
      var t = s.terms[i];
      var mc = hard[i] || 0;
      var mastered = !mc && (good[i] || 0) >= MASTERED_AT;
      return '<div class="term-row' + (mc ? " hard" : mastered ? " mastered" : "") + '">' +
        '<div class="t-term">' + esc(t.term) + "</div>" +
        '<div class="t-def">' + esc(t.def) + (t.example ? "<small>" + esc(t.example) + "</small>" : "") + "</div>" +
        '<div class="t-actions">' +
        (mc ? '<span class="miss-badge" title="Yanlış cevap sayısı">' + mc + " kez yanlış</span>" : "") +
        (mastered ? '<span class="hit-badge" title="' + good[i] + ' kez üst üste doğru">Öğrenildi ✓</span>' : "") +
        '<button class="icon-btn small star-btn' + (isStarred(s.id, i) ? " starred" : "") + '" data-star="' + i + '" title="Yıldızla">' + I.star + "</button>" +
        '<button class="icon-btn small" data-speak="' + i + '" title="Sesli oku">' + I.audio + "</button>" +
        "</div></div>";
    }

    if (hardIdx.length) {
      html += '<div class="hard-banner">' +
        '<div class="hb-text"><h3>Yanlış yaptıkların seni bekliyor</h3>' +
        "<p>" + hardIdx.length + " terimi yanlış cevapladın. Bunları tekrar etmek öğrenmenin en hızlı yolu.</p></div>" +
        '<div class="hb-actions">' +
        '<a class="btn primary" href="#/set/' + s.id + '/ogren-yanlis">Yanlışlarını öğren</a>' +
        '<a class="btn ghost" href="#/set/' + s.id + '/kartlar-yanlis">Kartlarla tekrar et</a>' +
        '<button class="btn ghost" id="hard-clear" title="Yanlış listesini sıfırla">Temizle</button>' +
        "</div></div>";
    }

    html += '<div class="author-row"><span class="avatar">H</span><div class="who">Oluşturan<b>hasan</b></div></div>';
    if (hardIdx.length) {
      html += '<div class="terms-head"><h2>Hâlâ öğreniyorum (' + hardIdx.length + ")</h2></div>";
      html += hardIdx.map(rowHtml).join("");
      html += '<div class="terms-head"><h2>Diğer terimler (' + restIdx.length + ")</h2></div>";
      html += restIdx.map(rowHtml).join("");
    } else {
      html += '<div class="terms-head"><h2>Bu setteki terimler (' + s.terms.length + ")</h2></div>";
      html += restIdx.map(rowHtml).join("");
    }
    html += "</div>";

    setPage(html, { side: "set:" + s.id });
    bindFlashcard(s);

    var hc = $("#hard-clear");
    if (hc) hc.addEventListener("click", function () {
      store.set(hardKey(s.id), {});
      renderSet(setId);
    });

    view.addEventListener("click", function (e) {
      var star = e.target.closest("[data-star]");
      if (star) {
        toggleStar(s.id, +star.dataset.star);
        star.classList.toggle("starred");
        return;
      }
      var sp = e.target.closest("[data-speak]");
      if (sp) speak(s.terms[+sp.dataset.speak].term);
    });
  }

  /* ---------- Set sayfasındaki flash kart ---------- */
  function flashcardHtml(s) {
    return '<div class="fc-stage"><div class="flashcard" id="fc">' +
      '<div class="fc-face front">' +
      '<span class="fc-side-label">' + esc(s.langs[0]) + "</span>" +
      '<div class="fc-tools">' +
      '<button class="icon-btn small" id="fc-speak" title="Sesli oku">' + I.audio + "</button>" +
      '<button class="icon-btn small star-btn" id="fc-star" title="Yıldızla">' + I.star + "</button>" +
      "</div>" +
      '<div class="fc-word" id="fc-front"></div>' +
      '<div class="fc-hint">Çevirmek için tıkla veya boşluk tuşuna bas</div>' +
      "</div>" +
      '<div class="fc-face back">' +
      '<span class="fc-side-label">' + esc(s.langs[1]) + "</span>" +
      '<div class="fc-word" id="fc-back"></div>' +
      '<p class="fc-example" id="fc-example"></p>' +
      "</div></div></div>" +
      '<div class="fc-controls">' +
      '<div class="side"><button class="icon-btn" id="fc-shuffle" title="Karıştır">' + I.shuffle + "</button></div>" +
      '<div class="center">' +
      '<button class="icon-btn arrow" id="fc-prev" title="Önceki">' + I.left + "</button>" +
      '<span class="fc-counter" id="fc-counter"></span>' +
      '<button class="icon-btn arrow" id="fc-next" title="Sonraki">' + I.right + "</button>" +
      "</div>" +
      '<div class="side right"></div>' +
      "</div>";
  }

  function bindFlashcard(s) {
    var card = $("#fc");
    if (!card) return;

    function cur() { return s.terms[fcState.order[fcState.idx]]; }

    function paint() {
      var t = cur();
      card.classList.remove("flipped");
      fcState.flipped = false;
      // Çevirme animasyonu içerik değişimini göstermesin diye küçük gecikme
      setTimeout(function () {
        $("#fc-front").textContent = t.term;
        $("#fc-back").textContent = t.def;
        $("#fc-example").textContent = t.example || "";
      }, fcState.painted ? 150 : 0);
      fcState.painted = true;
      $("#fc-counter").textContent = (fcState.idx + 1) + " / " + s.terms.length;
      $("#fc-prev").disabled = fcState.idx === 0;
      $("#fc-next").disabled = fcState.idx === s.terms.length - 1;
      var starred = isStarred(s.id, fcState.order[fcState.idx]);
      $("#fc-star").classList.toggle("starred", starred);
    }

    function flip() {
      fcState.flipped = !fcState.flipped;
      card.classList.toggle("flipped", fcState.flipped);
    }
    function next() { if (fcState.idx < s.terms.length - 1) { fcState.idx++; paint(); } }
    function prev() { if (fcState.idx > 0) { fcState.idx--; paint(); } }

    card.addEventListener("click", function (e) {
      if (e.target.closest(".icon-btn")) return;
      flip();
    });
    $("#fc-next").addEventListener("click", next);
    $("#fc-prev").addEventListener("click", prev);
    $("#fc-shuffle").addEventListener("click", function () {
      fcState.shuffled = !fcState.shuffled;
      fcState.order = fcState.shuffled
        ? shuffle(fcState.order)
        : s.terms.map(function (_, i) { return i; });
      fcState.idx = 0;
      this.classList.toggle("on", fcState.shuffled);
      paint();
    });
    $("#fc-speak").addEventListener("click", function () { speak(cur().term); });
    $("#fc-star").addEventListener("click", function () {
      toggleStar(s.id, fcState.order[fcState.idx]);
      this.classList.toggle("starred");
      // listedeki yıldızı da güncelle
      var listStar = $('[data-star="' + fcState.order[fcState.idx] + '"]');
      if (listStar) listStar.classList.toggle("starred");
    });

    keyHandler = function (e) {
      if (e.key === " ") { e.preventDefault(); flip(); }
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };

    paint();
  }

  /* ================= MOD ORTAK PARÇALAR ================= */
  function modeTopbar(s, modeName, icon, progress) {
    return '<div class="mode-topbar">' +
      '<div class="mode-name">' + icon + esc(modeName) + "</div>" +
      '<div class="set-name">' + esc(s.title) + "</div>" +
      '<div class="close-wrap"><a class="icon-btn" href="#/set/' + s.id + '" title="Kapat">' + I.close + "</a></div>" +
      "</div>" +
      '<div class="progress-track"><div class="progress-fill" id="mode-progress" style="width:' + (progress || 0) + '%"></div></div>';
  }
  function setProgress(pct) {
    var el = $("#mode-progress");
    if (el) el.style.width = pct + "%";
  }

  /* ================= KARTLAR MODU ================= */
  function renderCardsMode(setId) {
    var s = getSet(setId);
    if (!s) { location.hash = "#/"; return; }
    startCards(s, s.terms.map(function (_, i) { return i; }));
  }

  function startCards(s, indices) {
    var order = indices.slice();
    var pos = 0, flipped = false, painted = false, shuffled = false;
    var sortOn = false;
    var know = [], learning = [], history = [];

    var html = '<div class="mode-screen">' + modeTopbar(s, "Kartlar", I.cards) +
      '<div class="mode-body"><div class="mode-inner">' +
      '<div class="sort-counts" id="sort-counts">' +
      '<span class="count-pill learning">Hâlâ öğreniyorum · <b id="cnt-learning">0</b></span>' +
      '<span class="count-pill know">Biliyorum · <b id="cnt-know">0</b></span>' +
      "</div>" +
      '<div class="fc-stage" id="fc-stage"><div class="flashcard" id="fc">' +
      '<div class="fc-face front">' +
      '<span class="fc-side-label">' + esc(s.langs[0]) + "</span>" +
      '<div class="fc-tools">' +
      '<button class="icon-btn small" id="fc-speak" title="Sesli oku">' + I.audio + "</button>" +
      '<button class="icon-btn small star-btn" id="fc-star" title="Yıldızla">' + I.star + "</button>" +
      "</div>" +
      '<div class="fc-word" id="fc-front"></div>' +
      '<div class="fc-hint">Çevirmek için tıkla veya boşluk tuşuna bas</div>' +
      "</div>" +
      '<div class="fc-face back">' +
      '<span class="fc-side-label">' + esc(s.langs[1]) + "</span>" +
      '<div class="fc-word" id="fc-back"></div>' +
      '<p class="fc-example" id="fc-example"></p>' +
      "</div></div></div>" +
      '<div class="fc-controls">' +
      '<div class="side">' +
      '<button class="icon-btn" id="fc-shuffle" title="Karıştır">' + I.shuffle + "</button>" +
      '<button class="icon-btn" id="fc-undo" title="Geri al" style="display:none">' + I.undo + "</button>" +
      "</div>" +
      '<div class="center">' +
      '<button class="icon-btn arrow" id="fc-prev" title="Önceki">' + I.left + "</button>" +
      '<span class="fc-counter" id="fc-counter"></span>' +
      '<button class="icon-btn arrow" id="fc-next" title="Sonraki">' + I.right + "</button>" +
      "</div>" +
      '<div class="side right"><label class="sort-toggle" title="Kartları bildiklerin ve öğrendiklerin olarak ayır">Kartları sırala' +
      '<span class="switch"><input type="checkbox" id="fc-sort" /><span class="track"></span></span></label></div>' +
      "</div></div></div></div>";
    setPage(html, { mode: true });

    var card = $("#fc"), stageEl = $("#fc-stage");
    var prevBtn = $("#fc-prev"), nextBtn = $("#fc-next"), undoBtn = $("#fc-undo");

    function cur() { return s.terms[order[pos]]; }

    function paint(anim) {
      var t = cur();
      card.classList.remove("flipped");
      flipped = false;
      if (anim) {
        stageEl.classList.remove("swap-left", "swap-right");
        void stageEl.offsetWidth; // animasyonu yeniden tetikle
        stageEl.classList.add(anim);
      }
      setTimeout(function () {
        $("#fc-front").textContent = t.term;
        $("#fc-back").textContent = t.def;
        $("#fc-example").textContent = t.example || "";
      }, painted ? 150 : 0);
      painted = true;
      $("#fc-counter").textContent = (pos + 1) + " / " + order.length;
      $("#fc-star").classList.toggle("starred", isStarred(s.id, order[pos]));
      prevBtn.disabled = sortOn ? false : pos === 0;
      undoBtn.disabled = !history.length;
      setProgress(((pos + 1) / order.length) * 100);
    }

    function refreshUi() {
      $("#sort-counts").style.visibility = sortOn ? "visible" : "hidden";
      undoBtn.style.display = sortOn ? "" : "none";
      $("#cnt-learning").textContent = learning.length;
      $("#cnt-know").textContent = know.length;
      if (sortOn) {
        prevBtn.innerHTML = I.close; prevBtn.className = "icon-btn arrow mark-learning"; prevBtn.title = "Hâlâ öğreniyorum";
        nextBtn.innerHTML = I.check; nextBtn.className = "icon-btn arrow mark-know"; nextBtn.title = "Biliyorum";
      } else {
        prevBtn.innerHTML = I.left; prevBtn.className = "icon-btn arrow"; prevBtn.title = "Önceki";
        nextBtn.innerHTML = I.right; nextBtn.className = "icon-btn arrow"; nextBtn.title = "Sonraki";
      }
    }

    function finishCards() {
      keyHandler = null;
      setProgress(100);
      var inner = $(".mode-inner");
      if (sortOn) {
        inner.innerHTML = '<div class="finish-screen">' +
          '<div class="big-emoji">' + (learning.length ? "👏" : "🏆") + "</div>" +
          "<h1>Tüm kartları sıraladın!</h1>" +
          "<p>" + (learning.length
            ? learning.length + " kartı hâlâ öğreniyorsun. Onları tekrar etmek öğrenmenin en hızlı yolu."
            : "Bu setteki her şeyi biliyorsun. Muhteşem!") + "</p>" +
          '<div class="finish-stats">' +
          '<div class="stat-pill ok"><div class="num">' + know.length + '</div><div class="lbl">Biliyorum</div></div>' +
          '<div class="stat-pill mid"><div class="num">' + learning.length + '</div><div class="lbl">Hâlâ öğreniyorum</div></div>' +
          "</div>" +
          '<div class="btn-row">' +
          (learning.length ? '<button class="btn primary big" id="cards-review">Zorlandığın ' + learning.length + " kartı tekrar et</button>" : "") +
          '<button class="btn ' + (learning.length ? "ghost" : "primary") + ' big" id="cards-restart">Baştan başla</button>' +
          '<a class="btn ghost big" href="#/set/' + s.id + '">Sete dön</a>' +
          "</div></div>";
        var rev = $("#cards-review");
        if (rev) rev.addEventListener("click", function () { startCards(s, learning); });
      } else {
        inner.innerHTML = '<div class="finish-screen">' +
          '<div class="big-emoji">🎉</div>' +
          "<h1>Tüm kartları inceledin!</h1>" +
          "<p>" + order.length + " kartın hepsini gözden geçirdin.</p>" +
          '<div class="btn-row">' +
          '<button class="btn primary big" id="cards-restart">Baştan başla</button>' +
          '<a class="btn ghost big" href="#/set/' + s.id + '">Sete dön</a>' +
          "</div></div>";
      }
      $("#cards-restart").addEventListener("click", function () { startCards(s, indices); });
    }

    function advance(kind) {
      if (kind) {
        (kind === "know" ? know : learning).push(order[pos]);
        if (kind === "know") {
          addHit(s.id, order[pos]);
          history.push({ kind: kind, changed: decMiss(s.id, order[pos]) });
        } else {
          addMiss(s.id, order[pos]);
          history.push({ kind: kind, prevGood: resetHit(s.id, order[pos]) });
        }
        $("#cnt-know").textContent = know.length;
        $("#cnt-learning").textContent = learning.length;
      }
      if (pos === order.length - 1) { finishCards(); return; }
      pos++;
      paint(kind === "learning" ? "swap-left" : "swap-right");
    }

    function restartMarks() {
      pos = 0; know = []; learning = []; history = [];
      refreshUi();
      paint();
    }

    card.addEventListener("click", function (e) {
      if (e.target.closest(".icon-btn")) return;
      flipped = !flipped;
      card.classList.toggle("flipped", flipped);
    });
    nextBtn.addEventListener("click", function () { advance(sortOn ? "know" : null); });
    prevBtn.addEventListener("click", function () {
      if (sortOn) { advance("learning"); return; }
      if (pos > 0) { pos--; paint("swap-left"); }
    });
    undoBtn.addEventListener("click", function () {
      if (!history.length) return;
      var h = history.pop();
      (h.kind === "know" ? know : learning).pop();
      pos--;
      // yanlış hafızası ve doğru serisindeki etkiyi geri al
      if (h.kind === "know") {
        decHit(s.id, order[pos]);
        if (h.changed) addMiss(s.id, order[pos]);
      } else {
        decMiss(s.id, order[pos]);
        setHit(s.id, order[pos], h.prevGood);
      }
      refreshUi();
      paint("swap-left");
    });
    $("#fc-shuffle").addEventListener("click", function () {
      shuffled = !shuffled;
      order = shuffled ? shuffle(indices) : indices.slice();
      this.classList.toggle("on", shuffled);
      restartMarks();
    });
    $("#fc-sort").addEventListener("change", function () {
      sortOn = this.checked;
      restartMarks();
    });
    $("#fc-speak").addEventListener("click", function () { speak(cur().term); });
    $("#fc-star").addEventListener("click", function () {
      toggleStar(s.id, order[pos]);
      this.classList.toggle("starred");
    });

    keyHandler = function (e) {
      if (e.key === " ") { e.preventDefault(); flipped = !flipped; card.classList.toggle("flipped", flipped); }
      else if (e.key === "ArrowRight") nextBtn.click();
      else if (e.key === "ArrowLeft") prevBtn.click();
    };

    refreshUi();
    paint();
  }

  /* ================= ÖĞREN MODU ================= */
  /* Quizlet Öğren: turlar halinde ilerler. Bir terim önce çoktan seçmeli,
     sonraki turda yazılı sorulur; ikisi de doğruysa "öğrenildi" sayılır. */
  var LEARN_ROUND = 7;

  function renderLearnMode(setId) {
    var s = getSet(setId);
    if (!s) { location.hash = "#/"; return; }
    startLearn(s, s.terms.map(function (_, i) { return i; }));
  }

  function startLearn(s, indices) {
    if (s.terms.length < 2 || !indices.length) {
      setPage('<div class="mode-screen">' + modeTopbar(s, "Öğren", I.learn) +
        '<p class="empty-note">Bu mod için en az 2 terim gerekli.</p></div>', { mode: true });
      return;
    }

    var order = shuffle(indices.slice());
    var total = order.length;
    var stage = {}; // 0: yeni, 1: çoktan seçmeli bilindi, 2: yazılı da bilindi (öğrenildi)
    order.forEach(function (i) { stage[i] = 0; });
    var wrongCount = 0, roundNum = 0;
    var queue = [];

    setPage('<div class="mode-screen">' + modeTopbar(s, "Öğren", I.learn) +
      '<div class="mode-body"><div class="mode-inner" id="learn-inner"></div></div></div>', { mode: true });

    function counts() {
      var c = [0, 0, 0];
      order.forEach(function (i) { c[stage[i]]++; });
      return c;
    }
    function updateProgress() {
      var sum = 0;
      order.forEach(function (i) { sum += stage[i]; });
      setProgress((sum / (total * 2)) * 100);
    }

    function startRound() {
      queue = order.filter(function (i) { return stage[i] < 2; }).slice(0, LEARN_ROUND);
      roundNum++;
      ask();
    }

    function ask() {
      updateProgress();
      if (!queue.length) {
        if (counts()[2] === total) finish(); else checkpoint();
        return;
      }
      var ti = queue[0];
      if (stage[ti] === 0) askMC(ti); else askWritten(ti);
    }

    function askMC(ti) {
      var t = s.terms[ti];
      var others = shuffle(s.terms.map(function (_, i) { return i; }).filter(function (i) { return i !== ti; }))
        .slice(0, Math.min(4, s.terms.length) - 1);
      var opts = shuffle([ti].concat(others));

      var inner = $("#learn-inner");
      inner.innerHTML = '<div class="learn-card">' +
        '<div class="q-label">Terim</div>' +
        '<div class="q-word">' + esc(t.term) + "</div>" +
        '<div id="learn-feedback"></div>' +
        '<div class="q-prompt">Doğru tanımı seç</div>' +
        '<div class="opt-grid">' + opts.map(function (oi, n) {
          return '<button class="opt-btn" data-opt="' + oi + '"><span class="opt-num">' + (n + 1) + "</span>" + esc(s.terms[oi].def) + "</button>";
        }).join("") + "</div></div>";

      var answered = false;
      function choose(btn) {
        if (answered) return;
        answered = true;
        var oi = +btn.dataset.opt;
        $$(".opt-btn", inner).forEach(function (b) { b.disabled = true; });
        if (oi === ti) {
          btn.classList.add("correct");
          $("#learn-feedback").innerHTML = '<div class="feedback-msg ok">Doğru! Sonraki turda bunu yazman istenecek.</div>';
          stage[ti] = 1;
          decMiss(s.id, ti);
          addHit(s.id, ti);
          queue.shift();
          setTimeout(ask, 900);
        } else {
          btn.classList.add("wrong");
          wrongCount++;
          addMiss(s.id, ti);
          resetHit(s.id, ti);
          $$('.opt-btn[data-opt="' + ti + '"]', inner)[0].classList.add("correct");
          $("#learn-feedback").innerHTML = '<div class="feedback-msg no">Öğrenmek hata yapmaktır — doğrusu işaretlendi.</div>';
          queue.push(queue.shift()); // turun sonunda tekrar sorulsun
          setTimeout(ask, 2200);
        }
        updateProgress();
      }
      $$(".opt-btn", inner).forEach(function (b) {
        b.addEventListener("click", function () { choose(b); });
      });
      keyHandler = function (e) {
        var n = parseInt(e.key, 10);
        if (n >= 1 && n <= opts.length) {
          var btn = $$(".opt-btn", inner)[n - 1];
          if (btn) choose(btn);
        }
      };
    }

    function askWritten(ti) {
      var t = s.terms[ti];
      var inner = $("#learn-inner");
      inner.innerHTML = '<div class="learn-card">' +
        '<div class="q-label">Tanım</div>' +
        '<div class="q-word">' + esc(t.def) + "</div>" +
        '<div id="learn-feedback"></div>' +
        '<div class="q-prompt">Cevabını yaz (' + esc(s.langs[0]) + ")</div>" +
        '<form class="learn-form" id="learn-form" autocomplete="off">' +
        '<input type="text" id="learn-input" placeholder="Cevabını yaz" autocomplete="off" />' +
        '<button type="button" class="btn ghost" id="learn-skip">Bilmiyorum</button>' +
        '<button type="submit" class="btn primary">Cevapla</button>' +
        "</form></div>";
      var input = $("#learn-input");
      input.focus();
      keyHandler = null;

      var answered = false;
      function grade(given, skipped) {
        if (answered) return;
        answered = true;
        input.disabled = true;
        if (!skipped && isCorrectAnswer(given, t.term)) {
          stage[ti] = 2;
          decMiss(s.id, ti);
          addHit(s.id, ti);
          queue.shift();
          $("#learn-form").style.display = "none";
          $("#learn-feedback").innerHTML = '<div class="feedback-msg ok">Harikasın!</div>';
          updateProgress();
          setTimeout(ask, 800);
        } else {
          wrongCount++;
          addMiss(s.id, ti);
          resetHit(s.id, ti);
          queue.push(queue.shift());
          $("#learn-form").style.display = "none";
          $("#learn-feedback").innerHTML =
            (skipped || !given.trim() ? "" :
              '<div class="ans-label">Senin cevabın</div><div class="ans-box no">' + esc(given) + "</div>") +
            '<div class="ans-label">Doğru cevap</div><div class="ans-box ok">' + esc(t.term) + "</div>" +
            '<div class="btn-row" style="justify-content:flex-start;margin-top:1.25rem">' +
            '<button class="btn primary" id="learn-cont">Devam et</button></div>';
          var went = false;
          function cont() { if (went) return; went = true; ask(); }
          $("#learn-cont").addEventListener("click", cont);
          keyHandler = function (e) { if (e.key === "Enter") cont(); };
        }
      }
      $("#learn-form").addEventListener("submit", function (e) { e.preventDefault(); grade(input.value, false); });
      $("#learn-skip").addEventListener("click", function () { grade("", true); });
    }

    function checkpoint() {
      keyHandler = null;
      var c = counts();
      $("#learn-inner").innerHTML = '<div class="finish-screen">' +
        '<div class="big-emoji">💪</div>' +
        "<h1>" + roundNum + ". tur bitti — harika gidiyorsun!</h1>" +
        "<p>Bir terimi tam öğrenmek için önce doğru şıkkı seçmen, sonra terimi yazman gerekiyor.</p>" +
        '<div class="finish-stats">' +
        '<div class="stat-pill ok"><div class="num">' + c[2] + '</div><div class="lbl">Öğrenildi</div></div>' +
        '<div class="stat-pill mid"><div class="num">' + c[1] + '</div><div class="lbl">Devam ediyor</div></div>' +
        '<div class="stat-pill"><div class="num">' + c[0] + '</div><div class="lbl">Kalan</div></div>' +
        "</div>" +
        '<div class="btn-row"><button class="btn primary big" id="learn-next-round">Devam et</button></div></div>';
      var went = false;
      function go() { if (went) return; went = true; startRound(); }
      $("#learn-next-round").addEventListener("click", go);
      keyHandler = function (e) { if (e.key === "Enter") go(); };
    }

    function finish() {
      keyHandler = null;
      setProgress(100);
      $("#learn-inner").innerHTML = '<div class="finish-screen">' +
        '<div class="big-emoji">🎉</div>' +
        "<h1>Tebrikler! Hepsini öğrendin.</h1>" +
        "<p>" + total + " terimin tamamını hem seçerek hem yazarak doğru bildin." +
        (wrongCount ? " Toplam " + wrongCount + " yanlış deneme yaptın." : " Hem de hiç hata yapmadan!") + "</p>" +
        '<div class="finish-stats">' +
        '<div class="stat-pill ok"><div class="num">' + total + '</div><div class="lbl">Öğrenilen</div></div>' +
        '<div class="stat-pill no"><div class="num">' + wrongCount + '</div><div class="lbl">Yanlış deneme</div></div>' +
        "</div>" +
        '<div class="btn-row">' +
        '<button class="btn primary big" id="learn-again">Baştan başla</button>' +
        '<a class="btn ghost big" href="#/set/' + s.id + '">Sete dön</a>' +
        "</div></div>";
      $("#learn-again").addEventListener("click", function () { startLearn(s, indices); });
    }

    startRound();
  }

  /* ================= TEST MODU ================= */
  function renderTestMode(setId) {
    var s = getSet(setId);
    if (!s) { location.hash = "#/"; return; }
    if (s.terms.length < 2) {
      setPage('<div class="mode-screen">' + modeTopbar(s, "Test", I.test) +
        '<p class="empty-note">Bu mod için en az 2 terim gerekli.</p></div>', { mode: true });
      return;
    }

    var maxQ = s.terms.length;
    var choices = [5, 10, 20, 30].filter(function (n) { return n < maxQ; }).concat([maxQ]);

    var html = '<div class="mode-screen">' + modeTopbar(s, "Test", I.test) +
      '<div class="mode-body"><div class="mode-inner" id="test-inner">' +
      '<div class="test-setup"><h2>Testi ayarla</h2>' +
      '<div class="row"><span>Soru sayısı</span><select id="ts-count">' +
      choices.map(function (n) { return '<option value="' + n + '"' + (n === Math.min(10, maxQ) ? " selected" : "") + ">" + n + "</option>"; }).join("") +
      "</select></div>" +
      '<div class="row"><span>Yazılı sorular</span><label class="switch"><input type="checkbox" id="ts-written" checked /><span class="track"></span></label></div>' +
      '<div class="row"><span>Çoktan seçmeli sorular</span><label class="switch"><input type="checkbox" id="ts-mc" checked /><span class="track"></span></label></div>' +
      '<div class="row"><span>Doğru/Yanlış soruları</span><label class="switch"><input type="checkbox" id="ts-tf" checked /><span class="track"></span></label></div>' +
      '<div class="btn-row"><button class="btn primary big" id="ts-start">Testi başlat</button></div>' +
      "</div></div></div></div>";
    setPage(html, { mode: true });

    $("#ts-start").addEventListener("click", function () {
      var count = +$("#ts-count").value;
      var types = [];
      if ($("#ts-written").checked) types.push("written");
      if ($("#ts-mc").checked) types.push("mc");
      if ($("#ts-tf").checked) types.push("tf");
      if (!types.length) types = ["mc"];
      startTest(s, count, types);
    });
  }

  function buildTestQuestions(s, count, types) {
    var picked = shuffle(s.terms.map(function (_, i) { return i; })).slice(0, count);
    return picked.map(function (ti, n) {
      var type = types[n % types.length];
      var t = s.terms[ti];
      if (type === "mc" && s.terms.length >= 2) {
        var others = shuffle(s.terms.map(function (_, i) { return i; }).filter(function (i) { return i !== ti; }))
          .slice(0, Math.min(3, s.terms.length - 1));
        return { type: "mc", ti: ti, opts: shuffle([ti].concat(others)) };
      }
      if (type === "tf" && s.terms.length >= 2) {
        var truth = Math.random() < 0.5;
        var shown = ti;
        if (!truth) {
          var pool = s.terms.map(function (_, i) { return i; }).filter(function (i) { return i !== ti; });
          shown = pool[Math.floor(Math.random() * pool.length)];
        }
        return { type: "tf", ti: ti, shown: shown, truth: truth };
      }
      return { type: "written", ti: ti };
    });
  }

  function startTest(s, count, types) {
    var qs = buildTestQuestions(s, count, types);
    var typeNames = { written: "Yazılı", mc: "Çoktan seçmeli", tf: "Doğru/Yanlış" };

    var html = '<div class="mode-screen">' + modeTopbar(s, "Test", I.test) +
      '<div class="mode-body"><div class="mode-inner" id="test-inner">';
    html += qs.map(function (q, n) {
      var t = s.terms[q.ti];
      var body = "";
      if (q.type === "written") {
        body = '<div class="tq-word">' + esc(t.def) + "</div>" +
          '<input type="text" data-q="' + n + '" placeholder="Cevabını yaz (' + esc(s.langs[0]) + ')" autocomplete="off" />';
      } else if (q.type === "mc") {
        body = '<div class="tq-word">' + esc(t.term) + "</div>" +
          '<div class="opt-grid">' + q.opts.map(function (oi, k) {
            return '<button class="opt-btn" data-q="' + n + '" data-opt="' + oi + '"><span class="opt-num">' + (k + 1) + "</span>" + esc(s.terms[oi].def) + "</button>";
          }).join("") + "</div>";
      } else {
        body = '<div class="tq-word">' + esc(t.term) + " — " + esc(s.terms[q.shown].def) + "</div>" +
          '<div class="opt-grid">' +
          '<button class="opt-btn" data-q="' + n + '" data-opt="true"><span class="opt-num">D</span>Doğru</button>' +
          '<button class="opt-btn" data-q="' + n + '" data-opt="false"><span class="opt-num">Y</span>Yanlış</button>' +
          "</div>";
      }
      return '<div class="test-q" id="tq-' + n + '">' +
        '<div class="tq-meta"><span>' + (typeNames[q.type]) + "</span><span>" + (n + 1) + " / " + qs.length + "</span></div>" +
        body + '<div class="tq-result"></div></div>';
    }).join("");
    html += '<div class="btn-row" style="margin-bottom:3rem"><button class="btn primary big" id="test-submit">Testi gönder</button></div>';
    html += "</div></div></div>";
    setPage(html, { mode: true });

    var answers = {}; // n -> seçim
    view.addEventListener("click", function (e) {
      var btn = e.target.closest(".opt-btn[data-q]");
      if (!btn || btn.disabled) return;
      var n = +btn.dataset.q;
      answers[n] = btn.dataset.opt;
      $$('#tq-' + n + " .opt-btn").forEach(function (b) { b.style.borderColor = ""; b.style.background = ""; });
      btn.style.borderColor = "var(--indigo)";
      btn.style.background = "var(--indigo-bg)";
      updateTestProgress();
    });
    $$('input[data-q]').forEach(function (inp) {
      inp.addEventListener("input", updateTestProgress);
    });
    function answeredCount() {
      var c = Object.keys(answers).length;
      $$('input[data-q]').forEach(function (inp) { if (inp.value.trim()) c++; });
      return c;
    }
    function updateTestProgress() {
      setProgress((answeredCount() / qs.length) * 100);
    }

    $("#test-submit").addEventListener("click", function () {
      var correct = 0;
      qs.forEach(function (q, n) {
        var t = s.terms[q.ti];
        var box = $("#tq-" + n);
        var res = $(".tq-result", box);
        var ok = false;
        if (q.type === "written") {
          var inp = $('input[data-q="' + n + '"]', box);
          ok = isCorrectAnswer(inp.value, t.term);
          inp.disabled = true;
          res.innerHTML = ok
            ? '<div class="tq-answer ok">✓ Doğru</div>'
            : '<div class="tq-answer no">✗ Doğru cevap: ' + esc(t.term) + "</div>";
        } else if (q.type === "mc") {
          ok = answers[n] != null && +answers[n] === q.ti;
          $$(".opt-btn", box).forEach(function (b) {
            b.disabled = true;
            if (+b.dataset.opt === q.ti) b.classList.add("correct");
            else if (answers[n] != null && +b.dataset.opt === +answers[n] && !ok) b.classList.add("wrong");
          });
          res.innerHTML = ok
            ? '<div class="tq-answer ok">✓ Doğru</div>'
            : '<div class="tq-answer no">✗ Doğru cevap: ' + esc(t.def) + "</div>";
        } else {
          ok = answers[n] != null && (answers[n] === "true") === q.truth;
          $$(".opt-btn", box).forEach(function (b) {
            b.disabled = true;
            if ((b.dataset.opt === "true") === q.truth) b.classList.add("correct");
            else if (answers[n] != null && b.dataset.opt === answers[n] && !ok) b.classList.add("wrong");
          });
          res.innerHTML = ok
            ? '<div class="tq-answer ok">✓ Doğru</div>'
            : '<div class="tq-answer no">✗ ' + (q.truth ? "Bu eşleşme doğruydu." : "Doğrusu: " + esc(t.term) + " = " + esc(t.def)) + "</div>";
        }
        if (ok) { correct++; decMiss(s.id, q.ti); addHit(s.id, q.ti); }
        else { addMiss(s.id, q.ti); resetHit(s.id, q.ti); }
        box.classList.add(ok ? "graded-ok" : "graded-no");
      });

      var pct = Math.round((correct / qs.length) * 100);
      var color = pct >= 80 ? "var(--green)" : pct >= 50 ? "var(--yellow)" : "var(--red)";
      var banner = document.createElement("div");
      banner.className = "score-banner";
      banner.innerHTML = '<div class="score-ring" style="background:' +
        "conic-gradient(" + color + " " + pct + "%, var(--border-light) 0)" +
        '"><span style="background:var(--white);width:4.4rem;height:4.4rem;border-radius:50%;display:flex;align-items:center;justify-content:center">' + pct + "%</span></div>" +
        "<div><h2>" + (pct >= 80 ? "Harika iş!" : pct >= 50 ? "İyi gidiyorsun!" : "Biraz daha çalışmalısın") + "</h2>" +
        "<p>" + qs.length + " sorudan " + correct + " tanesini doğru cevapladın.</p></div>";
      var inner = $("#test-inner");
      inner.insertBefore(banner, inner.firstChild);
      this.textContent = "Yeni test oluştur";
      this.id = "";
      this.addEventListener("click", function () { renderTestMode(s.id); });
      setProgress(100);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ================= EŞLEŞTİR MODU ================= */
  function renderMatchMode(setId) {
    var s = getSet(setId);
    if (!s) { location.hash = "#/"; return; }
    if (s.terms.length < 3) {
      setPage('<div class="mode-screen">' + modeTopbar(s, "Eşleştir", I.match) +
        '<p class="empty-note">Bu mod için en az 3 terim gerekli.</p></div>', { mode: true });
      return;
    }

    var best = store.get("match_best_" + s.id, null);
    var html = '<div class="mode-screen">' + modeTopbar(s, "Eşleştir", I.match) +
      '<div class="mode-body"><div class="mode-inner">' +
      '<div class="start-screen">' +
      "<h1>Hazır mısın?</h1>" +
      "<p>Tüm terimleri tanımlarıyla mümkün olduğunca hızlı eşleştir. Her yanlış eşleştirme süreye 1 saniye ekler!</p>" +
      (best != null ? '<p>En iyi süren: <b>' + best.toFixed(1) + " sn</b></p>" : "") +
      '<button class="btn primary big" id="match-start">Oyunu başlat</button>' +
      "</div></div></div></div>";
    setPage(html, { mode: true });
    $("#match-start").addEventListener("click", function () { startMatch(s); });
  }

  function startMatch(s) {
    var pairCount = Math.min(6, s.terms.length);
    var picked = shuffle(s.terms.map(function (_, i) { return i; })).slice(0, pairCount);
    var tiles = [];
    picked.forEach(function (ti) {
      tiles.push({ pair: ti, text: s.terms[ti].term });
      tiles.push({ pair: ti, text: s.terms[ti].def });
    });
    tiles = shuffle(tiles);

    var html = '<div class="mode-screen">' + modeTopbar(s, "Eşleştir", I.match) +
      '<div class="mode-body"><div class="mode-inner">' +
      '<div class="match-timer" id="match-timer">0.0 sn</div>' +
      '<div class="match-grid">' + tiles.map(function (t, i) {
        return '<button class="match-tile" data-i="' + i + '" data-pair="' + t.pair + '">' + esc(t.text) + "</button>";
      }).join("") + "</div></div></div></div>";
    setPage(html, { mode: true });

    var t0 = performance.now();
    var timerEl = $("#match-timer");
    matchTimerId = setInterval(function () {
      timerEl.textContent = ((performance.now() - t0) / 1000).toFixed(1) + " sn";
    }, 100);

    var selected = null;
    var matched = 0;
    var busy = false;

    $$(".match-tile").forEach(function (tile) {
      tile.addEventListener("click", function () {
        if (busy || tile.classList.contains("matched")) return;
        if (selected === tile) { tile.classList.remove("selected"); selected = null; return; }
        if (!selected) { selected = tile; tile.classList.add("selected"); return; }

        var a = selected, b = tile;
        selected = null;
        if (a.dataset.pair === b.dataset.pair) {
          a.classList.remove("selected");
          a.classList.add("matched");
          b.classList.add("matched");
          matched++;
          setProgress((matched / pairCount) * 100);
          if (matched === pairCount) finishMatch();
        } else {
          busy = true;
          t0 -= 1000; // Quizlet gibi: yanlış eşleştirme +1 saniye ceza
          var pop = document.createElement("span");
          pop.className = "penalty-pop";
          pop.textContent = "+1 sn";
          timerEl.appendChild(pop);
          setTimeout(function () { pop.remove(); }, 700);
          a.classList.remove("selected");
          a.classList.add("error");
          b.classList.add("error");
          setTimeout(function () {
            a.classList.remove("error");
            b.classList.remove("error");
            busy = false;
          }, 450);
        }
      });
    });

    function finishMatch() {
      clearInterval(matchTimerId);
      matchTimerId = null;
      var secs = (performance.now() - t0) / 1000;
      var best = store.get("match_best_" + s.id, null);
      var record = best == null || secs < best;
      if (record) store.set("match_best_" + s.id, secs);

      $(".mode-inner").innerHTML = '<div class="finish-screen">' +
        '<div class="big-emoji">' + (record ? "🏆" : "⚡") + "</div>" +
        "<h1>" + secs.toFixed(1) + " saniyede bitirdin!</h1>" +
        "<p>" + (record ? "Yeni rekor! Tebrikler." : "En iyi süren: " + (best != null ? best.toFixed(1) : secs.toFixed(1)) + " sn") + "</p>" +
        '<div class="btn-row">' +
        '<button class="btn primary big" id="match-again">Tekrar oyna</button>' +
        '<a class="btn ghost big" href="#/set/' + s.id + '">Sete dön</a>' +
        "</div></div>";
      $("#match-again").addEventListener("click", function () { startMatch(s); });
    }
  }

  /* ================= GRAMER ================= */
  function renderGrammar() {
    var g = D.grammar || [];
    var html = '<div class="container"><h1 class="page-title">Gramer notları</h1>';
    html += g.length ? g.map(function (item) {
      return '<details class="grammar-item"><summary>' + esc(item.title) + "</summary>" +
        '<div class="g-body">' + item.body + "</div></details>";
    }).join("") : '<p class="empty-note">Henüz gramer notu yok.</p>';
    html += "</div>";
    setPage(html, { side: "grammar" });
  }

  /* ================= QUIZ (özel sorular) ================= */
  function renderQuiz() {
    var qs = D.quiz || [];
    if (!qs.length) {
      setPage('<div class="container"><h1 class="page-title">Quiz</h1><p class="empty-note">Henüz quiz sorusu yok.</p></div>', { side: "quiz" });
      return;
    }
    var html = '<div class="container"><h1 class="page-title">Quiz</h1><div id="quiz-list">';
    html += qs.map(function (q, n) {
      return '<div class="test-q" id="qq-' + n + '">' +
        '<div class="tq-meta"><span>Çoktan seçmeli</span><span>' + (n + 1) + " / " + qs.length + "</span></div>" +
        '<div class="tq-word">' + esc(q.q) + "</div>" +
        '<div class="opt-grid">' + q.options.map(function (o, k) {
          return '<button class="opt-btn" data-q="' + n + '" data-opt="' + k + '"><span class="opt-num">' + (k + 1) + "</span>" + esc(o) + "</button>";
        }).join("") + "</div><div class='tq-result'></div></div>";
    }).join("");
    html += '</div><div class="btn-row" style="margin-bottom:3rem"><button class="btn primary big" id="quiz-submit">Quizi gönder</button></div></div>';
    setPage(html, { side: "quiz" });

    var answers = {};
    view.addEventListener("click", function (e) {
      var btn = e.target.closest(".opt-btn[data-q]");
      if (!btn || btn.disabled) return;
      var n = +btn.dataset.q;
      answers[n] = +btn.dataset.opt;
      $$('#qq-' + n + " .opt-btn").forEach(function (b) { b.style.borderColor = ""; b.style.background = ""; });
      btn.style.borderColor = "var(--indigo)";
      btn.style.background = "var(--indigo-bg)";
    });

    $("#quiz-submit").addEventListener("click", function () {
      var correct = 0;
      qs.forEach(function (q, n) {
        var box = $("#qq-" + n);
        var ok = answers[n] === q.answer;
        if (ok) correct++;
        $$(".opt-btn", box).forEach(function (b) {
          b.disabled = true;
          if (+b.dataset.opt === q.answer) b.classList.add("correct");
          else if (answers[n] != null && +b.dataset.opt === answers[n] && !ok) b.classList.add("wrong");
        });
        $(".tq-result", box).innerHTML = (ok
          ? '<div class="tq-answer ok">✓ Doğru</div>'
          : '<div class="tq-answer no">✗ Doğru cevap: ' + esc(q.options[q.answer]) + "</div>") +
          (q.explain ? '<div class="tq-answer" style="color:var(--gray)">' + esc(q.explain) + "</div>" : "");
        box.classList.add(ok ? "graded-ok" : "graded-no");
      });
      var pct = Math.round((correct / qs.length) * 100);
      var color = pct >= 80 ? "var(--green)" : pct >= 50 ? "var(--yellow)" : "var(--red)";
      var banner = document.createElement("div");
      banner.className = "score-banner";
      banner.innerHTML = '<div class="score-ring" style="background:conic-gradient(' + color + " " + pct + '%, var(--border-light) 0)">' +
        '<span style="background:var(--white);width:4.4rem;height:4.4rem;border-radius:50%;display:flex;align-items:center;justify-content:center">' + pct + "%</span></div>" +
        "<div><h2>" + (pct >= 80 ? "Harika iş!" : pct >= 50 ? "İyi gidiyorsun!" : "Biraz daha çalışmalısın") + "</h2>" +
        "<p>" + qs.length + " sorudan " + correct + " tanesini doğru cevapladın.</p></div>";
      var list = $("#quiz-list");
      list.parentNode.insertBefore(banner, list);
      this.textContent = "Tekrar dene";
      this.addEventListener("click", function () { renderQuiz(); });
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ================= ARAMA ================= */
  $("#global-search").addEventListener("input", function () {
    var q = this.value.trim();
    if (location.hash !== "#/" && location.hash !== "") location.hash = "#/";
    renderHome(q);
  });

  /* ================= İLERLEME ================= */
  function renderProgress() {
    var goodTotal = 0, badTotal = 0;
    var goodHtml = "", badHtml = "";

    SETS.forEach(function (s) {
      var good = getGood(s.id), hard = getHard(s.id);
      var all = s.terms.map(function (_, i) { return i; });
      var g = all.filter(function (i) { return (good[i] || 0) >= MASTERED_AT; });
      var b = all.filter(function (i) { return (hard[i] || 0) >= TROUBLE_AT; });
      goodTotal += g.length;
      badTotal += b.length;

      if (g.length) {
        goodHtml += '<div class="prog-set"><a href="#/set/' + s.id + '">' + esc(s.title) + "</a>" +
          "<span>" + g.length + " kelime</span></div>";
        goodHtml += g.map(function (i) {
          var t = s.terms[i];
          return '<div class="term-row mastered">' +
            '<div class="t-term">' + esc(t.term) + "</div>" +
            '<div class="t-def">' + esc(t.def) + "</div>" +
            '<div class="t-actions"><span class="hit-badge">' + good[i] + " kez üst üste doğru</span></div></div>";
        }).join("");
      }
      if (b.length) {
        badHtml += '<div class="prog-set"><a href="#/set/' + s.id + '">' + esc(s.title) + "</a>" +
          '<a class="btn primary" href="#/set/' + s.id + '/ogren-yanlis">Bunları çalış</a></div>';
        badHtml += b.map(function (i) {
          var t = s.terms[i];
          return '<div class="term-row hard">' +
            '<div class="t-term">' + esc(t.term) + "</div>" +
            '<div class="t-def">' + esc(t.def) + "</div>" +
            '<div class="t-actions"><span class="miss-badge">' + hard[i] + " kez yanlış</span></div></div>";
        }).join("");
      }
    });

    var html = '<div class="container"><h1 class="page-title">İlerlemen</h1>';
    html += '<h2 class="prog-h ok">Kesin öğrendiklerin (' + goodTotal + ")</h2>" +
      '<p class="prog-desc">En az ' + MASTERED_AT + " kez üst üste doğru cevapladığın kelimeler. Bir yanlış, seriyi sıfırlar.</p>";
    html += goodTotal ? goodHtml
      : '<p class="empty-note">Henüz yok — bir kelimeyi ' + MASTERED_AT + " kez üst üste doğru bilince burada görünür.</p>";
    html += '<h2 class="prog-h no">Sürekli hata yaptıkların (' + badTotal + ")</h2>" +
      '<p class="prog-desc">En az ' + TROUBLE_AT + " kez yanlış cevapladığın kelimeler.</p>";
    html += badTotal ? badHtml
      : '<p class="empty-note">Burası temiz — sürekli hata yaptığın kelime yok. 👏</p>';
    html += "</div>";
    setPage(html, { side: "progress" });
  }

  /* ================= KURS İLERLEMESİ ================= */
  /* Eğitimler ve ders işaretleri tamamen localStorage'da tutulur;
     veri dosyası gerekmez, her şey sayfadan eklenir. */
  var COURSE_LESSONS = 50;
  /* Sınav Kampı'ndaki eğitimler — ilk açılışta otomatik eklenir,
     sonrasında sayfadan eklenip çıkarılabilir */
  var DEFAULT_TRAININGS = [
    "MELİH HOCA YDS YÖKDİL YKSDİL TEMEL HAZIRLIK VİDEOLARI",
    "GÖZDE HOCA İLE 200 METİN ÇEVİRİ",
    "ECE HOCA METİN ÇEVİRİ VİDEOLARI",
    "BAŞTAN SONA YDS-YÖKDİL-YKSDİL ÖN HAZIRLIK DERSLERİ - ECE HOCA",
    "2025 GÜZ YÖKDİL KELİME DERSLERİ",
    "2025 GÜZ YÖKDİL PARAGRAF DERSLERİ",
    "CANLI DERSLERDEN ÖNCE NASIL ÇALIŞMALIYIM? - ECE HOCA İLE YÖKDİL EĞİTİMİ",
    "BAŞTAN SONA YDS-YÖKDİL-YKSDİL ÖN HAZIRLIK DERSLERİ - HAKKI HOCA",
    "ECE HOCA İLE 70 PUAN GARANTİLİ 2026 GÜZ YÖKDİL",
    "ECE HOCA İLE EN ÖNEMLİ VERB ÇALIŞMASI",
    "BAŞTAN SONA VOCABULARY",
    "BAŞTAN SONA GRAMMAR",
    "BAŞTAN SONA READING",
    "2026 GÜZ YÖKDİL PARAGRAF SORU ÇÖZÜM DERSLERİ - GÖZDE HOCA",
    "2026 GÜZ YÖKDİL KELİME SORU ÇÖZÜM DERSLERİ - ECE HOCA"
  ];
  function getCourse() {
    var list = store.get("course", []);
    // Varsayılan eğitimleri bir kereye mahsus ekle (kullanıcının ekledikleri korunur,
    // sildiği varsayılanlar bir daha geri gelmez)
    if (!store.get("course_seeded", false)) {
      DEFAULT_TRAININGS.forEach(function (name) {
        var exists = list.some(function (t) { return t.name === name; });
        if (!exists) list.push({ name: name, done: {} });
      });
      store.set("course", list);
      store.set("course_seeded", true);
    }
    return list;
  }
  function saveCourse(list) { store.set("course", list); }

  function renderCourse() {
    var list = getCourse();

    function itemHtml(t, idx) {
      var doneCount = Object.keys(t.done || {}).length;
      var pct = Math.round((doneCount / COURSE_LESSONS) * 100);
      var chips = "";
      for (var n = 1; n <= COURSE_LESSONS; n++) {
        chips += '<button class="lesson-chip' + (t.done && t.done[n] ? " done" : "") +
          '" data-t="' + idx + '" data-l="' + n + '" title="Ders ' + n + '">' + n + "</button>";
      }
      return '<details class="course-item">' +
        "<summary>" +
        '<div class="ci-head"><div class="ci-name">' + esc(t.name) + "</div>" +
        '<div class="ci-meta"><span data-count="' + idx + '">' + doneCount + "/" + COURSE_LESSONS + " ders · %" + pct + "</span></div></div>" +
        '<div class="ci-bar"><div data-bar="' + idx + '" style="width:' + pct + '%"></div></div>' +
        '<button class="icon-btn small" data-ren="' + idx + '" title="Adını değiştir">' + I.pencil + "</button>" +
        '<button class="icon-btn small" data-del="' + idx + '" title="Eğitimi sil">' + I.trash + "</button>" +
        '<span class="ci-caret">⌄</span>' +
        "</summary>" +
        '<div class="lesson-grid">' + chips + "</div></details>";
    }

    var html = '<div class="container"><h1 class="page-title">Kurs ilerlemesi</h1>' +
      '<p class="prog-desc">Arkadaşınla ilerlediğin kursun eğitimleri. Bir derse tıklayınca yapıldı olarak işaretlenir, tekrar tıklayınca geri alınır — her şey otomatik kaydedilir.</p>';
    html += list.length ? list.map(itemHtml).join("")
      : '<p class="empty-note">Henüz eğitim eklemedin. Aşağıdaki butonla ilk eğitimini ekle; altına otomatik ' + COURSE_LESSONS + " ders açılır.</p>";
    html += '<div class="btn-row" style="justify-content:flex-start;margin-top:1.25rem">' +
      '<button class="btn primary" id="course-add">+ Eğitim ekle</button></div></div>';
    setPage(html, { side: "course" });

    $("#course-add").addEventListener("click", function () {
      var name = prompt("Eğitimin adı ne olsun?");
      if (!name || !name.trim()) return;
      list.push({ name: name.trim(), done: {} });
      saveCourse(list);
      renderCourse();
    });

    view.addEventListener("click", function (e) {
      var chip = e.target.closest(".lesson-chip");
      if (chip) {
        var t = list[+chip.dataset.t];
        var n = chip.dataset.l;
        t.done = t.done || {};
        if (t.done[n]) delete t.done[n]; else t.done[n] = true;
        saveCourse(list);
        chip.classList.toggle("done", !!t.done[n]);
        var doneCount = Object.keys(t.done).length;
        var pct = Math.round((doneCount / COURSE_LESSONS) * 100);
        $('[data-count="' + chip.dataset.t + '"]').textContent = doneCount + "/" + COURSE_LESSONS + " ders · %" + pct;
        $('[data-bar="' + chip.dataset.t + '"]').style.width = pct + "%";
        return;
      }
      var ren = e.target.closest("[data-ren]");
      if (ren) {
        e.preventDefault(); // summary açılıp kapanmasın
        var tr = list[+ren.dataset.ren];
        var newName = prompt("Yeni ad:", tr.name);
        if (newName && newName.trim()) {
          tr.name = newName.trim();
          saveCourse(list);
          renderCourse();
        }
        return;
      }
      var del = e.target.closest("[data-del]");
      if (del) {
        e.preventDefault();
        var i = +del.dataset.del;
        if (confirm('"' + list[i].name + '" eğitimini silmek istediğine emin misin? Ders işaretleri de silinir.')) {
          list.splice(i, 1);
          saveCourse(list);
          renderCourse();
        }
      }
    });
  }

  /* Sadece yanlış yapılan terimlerle bir modu başlat */
  function renderHardMode(setId, starter) {
    var s = getSet(setId);
    if (!s) { location.hash = "#/"; return; }
    var idx = hardIndices(s);
    if (!idx.length) { location.hash = "#/set/" + s.id; return; }
    starter(s, idx);
  }

  /* ================= YÖNLENDİRİCİ ================= */
  function route() {
    var hash = location.hash.replace(/^#\/?/, "");
    var parts = hash.split("/").filter(Boolean);

    if (!parts.length) { renderHome(); return; }
    if (parts[0] === "kitaplik") { renderLibrary(); return; }
    if (parts[0] === "ilerleme") { renderProgress(); return; }
    if (parts[0] === "kurs") { renderCourse(); return; }
    if (parts[0] === "gramer") { renderGrammar(); return; }
    if (parts[0] === "quiz") { renderQuiz(); return; }
    if (parts[0] === "set" && parts[1]) {
      var mode = parts[2];
      if (mode === "kartlar") { renderCardsMode(parts[1]); return; }
      if (mode === "ogren") { renderLearnMode(parts[1]); return; }
      if (mode === "test") { renderTestMode(parts[1]); return; }
      if (mode === "eslestir") { renderMatchMode(parts[1]); return; }
      if (mode === "kartlar-yanlis") { renderHardMode(parts[1], startCards); return; }
      if (mode === "ogren-yanlis") { renderHardMode(parts[1], startLearn); return; }
      renderSet(parts[1]);
      return;
    }
    renderHome();
  }

  window.addEventListener("hashchange", route);
  route();
})();
