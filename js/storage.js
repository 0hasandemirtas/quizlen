/* Shared storage for browser and Android. All profiles travel in one backup. */
(function () {
  'use strict';
  var native = window.QuizlenAndroid;
  var memory = native ? JSON.parse(native.getAll()) : null;
  var MAX = 5 * 1024 * 1024;
  function browserSnapshot() {
    var result = Object.create(null);
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key.indexOf('qz_') === 0) result[key] = localStorage.getItem(key);
    }
    return result;
  }
  function snapshot() { return native ? JSON.parse(JSON.stringify(memory)) : browserSnapshot(); }
  function replaceAll(values) {
    if (native) {
      if (!native.replaceAll(JSON.stringify(values))) throw new Error('Veriler kaydedilemedi.');
      memory = JSON.parse(JSON.stringify(values));
      return;
    }
    var before = browserSnapshot();
    try {
      Object.keys(before).forEach(function (key) { localStorage.removeItem(key); });
      Object.keys(values).forEach(function (key) { localStorage.setItem(key, values[key]); });
    } catch (error) {
      Object.keys(browserSnapshot()).forEach(function (key) { localStorage.removeItem(key); });
      Object.keys(before).forEach(function (key) { localStorage.setItem(key, before[key]); });
      throw error;
    }
  }
  function validate(text) {
    if (typeof text !== 'string' || new Blob([text]).size > MAX) throw new Error('Yedek en fazla 5 MB olabilir.');
    var backup = JSON.parse(text);
    if (!backup || backup.format !== 'quizlen-backup' || backup.version !== 1 || !backup.data || Array.isArray(backup.data) || typeof backup.data !== 'object') throw new Error('Geçerli bir Quizlen yedeği seçin.');
    var keys = Object.keys(backup.data);
    if (!keys.length || keys.length > 10000) throw new Error('Yedek boş veya çok büyük.');
    keys.forEach(function (key) {
      var value = backup.data[key];
      if (!/^qz_[A-Za-z0-9_.-]+$/.test(key) || typeof value !== 'string') throw new Error('Yedekte geçersiz kayıt var.');
      if (key === 'qz_profile') {
        if (value !== 'hasan' && value !== 'zehra') throw new Error('Profil kaydı geçersiz.');
      } else {
        var parsed = JSON.parse(value);
        var name = key.replace(/^qz_(?:zehra_)?/, '');
        if (/^(hard_|good_)/.test(name) && (!parsed || Array.isArray(parsed) || typeof parsed !== 'object' || Object.keys(parsed).some(function (i) { return !/^\d+$/.test(i) || !Number.isFinite(parsed[i]) || parsed[i] < 0; }))) throw new Error('İlerleme kaydı geçersiz.');
        if (/^stars_/.test(name) && (!Array.isArray(parsed) || parsed.some(function (i) { return !Number.isInteger(i) || i < 0; }))) throw new Error('Yıldız kaydı geçersiz.');
        if (name === 'course' && (!Array.isArray(parsed) || parsed.some(function (c) { return !c || typeof c.name !== 'string' || !c.done || Array.isArray(c.done) || typeof c.done !== 'object'; }))) throw new Error('Kurs kaydı geçersiz.');
        if (name === 'catalog' && (!parsed || Array.isArray(parsed) || typeof parsed !== 'object' || Object.keys(parsed).some(function (id) { var c = parsed[id]; return !c || typeof c.scope !== 'string' || !Array.isArray(c.terms) || c.terms.some(function (t) { return typeof t !== 'string'; }); }))) throw new Error('Kelime eşleştirme kaydı geçersiz.');
        if (/^learn_/.test(name) && parsed !== null && (!parsed || !Array.isArray(parsed.order) || !parsed.stage || typeof parsed.stage !== 'object' || parsed.order.some(function (i) { return !Number.isInteger(i) || i < 0; }))) throw new Error('Öğrenme kaydı geçersiz.');
      }
    });
    return backup.data;
  }
  // Migrate existing WebView localStorage without overwriting native progress.
  if (native && !Object.keys(memory).length) {
    var old = browserSnapshot();
    if (Object.keys(old).length) replaceAll(old);
  }
  window.QuizlenStorage = {
    native: !!native,
    getItem: function (key) { return native ? (Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null) : localStorage.getItem(key); },
    setItem: function (key, value) {
      value = String(value);
      if (native) {
        if (!native.setItem(key, value)) throw new Error('İlerleme kaydedilemedi.');
        memory[key] = value;
      } else localStorage.setItem(key, value);
    },
    snapshot: snapshot,
    replaceAll: replaceAll,
    validate: validate,
    exportText: function () { return JSON.stringify({ format: 'quizlen-backup', version: 1, createdAt: new Date().toISOString(), data: snapshot() }, null, 2); },
    importText: function (text) { replaceAll(validate(text)); },
    exportFile: function () {
      if (native) { native.exportBackup(); return; }
      var url = URL.createObjectURL(new Blob([this.exportText()], { type: 'application/json' }));
      var link = document.createElement('a');
      link.href = url; link.download = 'Quizlen-yedek-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }
  };
})();
