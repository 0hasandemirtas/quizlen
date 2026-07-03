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
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>'
  };

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

    html += '<div class="author-row"><span class="avatar">H</span><div class="who">Oluşturan<b>hasan</b></div></div>';
    html += '<div class="terms-head"><h2>Bu setteki terimler (' + s.terms.length + ")</h2></div>";
    html += s.terms.map(function (t, i) {
      return '<div class="term-row">' +
        '<div class="t-term">' + esc(t.term) + "</div>" +
        '<div class="t-def">' + esc(t.def) + (t.example ? "<small>" + esc(t.example) + "</small>" : "") + "</div>" +
        '<div class="t-actions">' +
        '<button class="icon-btn small star-btn' + (isStarred(s.id, i) ? " starred" : "") + '" data-star="' + i + '" title="Yıldızla">' + I.star + "</button>" +
        '<button class="icon-btn small" data-speak="' + i + '" title="Sesli oku">' + I.audio + "</button>" +
        "</div></div>";
    }).join("");
    html += "</div>";

    setPage(html, { side: "set:" + s.id });
    bindFlashcard(s);

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
    var html = '<div class="mode-screen">' + modeTopbar(s, "Kartlar", I.cards) +
      '<div class="mode-body"><div class="mode-inner">' + flashcardHtml(s) + "</div></div></div>";
    fcState = { idx: 0, order: s.terms.map(function (_, i) { return i; }), shuffled: false, flipped: false };
    setPage(html, { mode: true });
    bindFlashcard(s);
    // ilerleme çubuğunu kart konumuna bağla
    var counter = $("#fc-counter");
    var obs = new MutationObserver(function () {
      setProgress(((fcState.idx + 1) / s.terms.length) * 100);
    });
    if (counter) obs.observe(counter, { childList: true });
    setProgress((1 / s.terms.length) * 100);
  }

  /* ================= ÖĞREN MODU ================= */
  function renderLearnMode(setId) {
    var s = getSet(setId);
    if (!s) { location.hash = "#/"; return; }
    if (s.terms.length < 2) {
      setPage('<div class="mode-screen">' + modeTopbar(s, "Öğren", I.learn) +
        '<p class="empty-note">Bu mod için en az 2 terim gerekli.</p></div>', { mode: true });
      return;
    }

    var queue = shuffle(s.terms.map(function (_, i) { return i; }));
    var total = queue.length;
    var learned = 0, wrongCount = 0;

    var html = '<div class="mode-screen">' + modeTopbar(s, "Öğren", I.learn) +
      '<div class="mode-body"><div class="mode-inner" id="learn-inner"></div></div></div>';
    setPage(html, { mode: true });

    function optionCount() { return Math.min(4, s.terms.length); }

    function question() {
      if (!queue.length) { finish(); return; }
      var ti = queue[0];
      var t = s.terms[ti];
      // yanlış şıklar
      var others = shuffle(s.terms.map(function (_, i) { return i; }).filter(function (i) { return i !== ti; }))
        .slice(0, optionCount() - 1);
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
          $("#learn-feedback").innerHTML = '<div class="feedback-msg ok">Harikasın!</div>';
          learned++;
          queue.shift();
          setProgress((learned / total) * 100);
          setTimeout(question, 800);
        } else {
          btn.classList.add("wrong");
          wrongCount++;
          $$('.opt-btn[data-opt="' + ti + '"]', inner)[0].classList.add("correct");
          $("#learn-feedback").innerHTML = '<div class="feedback-msg no">Öğrenmek hata yapmaktır — doğrusu işaretlendi.</div>';
          // yanlış bilineni kuyruğun sonuna at
          queue.push(queue.shift());
          setTimeout(question, 2200);
        }
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

    function finish() {
      keyHandler = null;
      setProgress(100);
      $("#learn-inner").innerHTML = '<div class="finish-screen">' +
        '<div class="big-emoji">🎉</div>' +
        "<h1>Tebrikler! Bu turu tamamladın.</h1>" +
        "<p>" + total + " terimin hepsini doğru bildin." + (wrongCount ? " Toplam " + wrongCount + " yanlış deneme yaptın." : " Hem de hiç hata yapmadan!") + "</p>" +
        '<div class="finish-stats">' +
        '<div class="stat-pill ok"><div class="num">' + total + '</div><div class="lbl">Öğrenilen</div></div>' +
        '<div class="stat-pill no"><div class="num">' + wrongCount + '</div><div class="lbl">Yanlış deneme</div></div>' +
        "</div>" +
        '<div class="btn-row">' +
        '<button class="btn primary big" id="learn-again">Baştan başla</button>' +
        '<a class="btn ghost big" href="#/set/' + s.id + '">Sete dön</a>' +
        "</div></div>";
      $("#learn-again").addEventListener("click", function () { renderLearnMode(setId); });
    }

    question();
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
          var given = (inp.value || "").trim().toLocaleLowerCase("en");
          var want = t.term.trim().toLocaleLowerCase("en");
          ok = given === want || (want.indexOf("to ") === 0 && given === want.slice(3));
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
        if (ok) correct++;
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
      "<p>Tüm terimleri tanımlarıyla mümkün olduğunca hızlı eşleştir. Yanlış eşleştirme yapmamaya dikkat et!</p>" +
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

  /* ================= YÖNLENDİRİCİ ================= */
  function route() {
    var hash = location.hash.replace(/^#\/?/, "");
    var parts = hash.split("/").filter(Boolean);

    if (!parts.length) { renderHome(); return; }
    if (parts[0] === "kitaplik") { renderLibrary(); return; }
    if (parts[0] === "gramer") { renderGrammar(); return; }
    if (parts[0] === "quiz") { renderQuiz(); return; }
    if (parts[0] === "set" && parts[1]) {
      var mode = parts[2];
      if (mode === "kartlar") { renderCardsMode(parts[1]); return; }
      if (mode === "ogren") { renderLearnMode(parts[1]); return; }
      if (mode === "test") { renderTestMode(parts[1]); return; }
      if (mode === "eslestir") { renderMatchMode(parts[1]); return; }
      renderSet(parts[1]);
      return;
    }
    renderHome();
  }

  window.addEventListener("hashchange", route);
  route();
})();
