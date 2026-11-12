/* Preserve word progress when lists are reordered or poster packs change. */
(function () {
  'use strict';
  // Learn records v2 have four stages (0-3) and 4 = done.
  // Unversioned records used 2 for done, so 2 becomes 4.
  var LEARN_VERSION = 2;
  function learnStage(learn, index) {
    var value = learn && learn.stage ? Number(learn.stage[index]) : 0;
    if (!learn || learn.v !== LEARN_VERSION) return value === 2 ? 4 : (value === 1 ? 1 : 0);
    return value >= 0 && value <= 4 && value % 1 === 0 ? value : 0;
  }
  window.quizlenMigrateProgress = function (storage, sets) {
    var values = storage.snapshot();
    var catalog = Object.create(null);
    sets.forEach(function (s) {
      catalog[s.id] = { scope: s.group === 'poster' ? 'poster:' + s.posterCategory : s.id,
        terms: s.terms.map(function (t) { return JSON.stringify([String(t.term).trim().toLowerCase(), String(t.def).trim().toLowerCase()]); }) };
    });
    var serialized = JSON.stringify(catalog);
    if (values.qz_catalog === serialized) return;
    var old = values.qz_catalog ? JSON.parse(values.qz_catalog) : null;
    if (old) {
      ['', 'zehra_'].forEach(function (profile) {
        var pool = Object.create(null);
        function read(key, fallback) { return values['qz_' + profile + key] ? JSON.parse(values['qz_' + profile + key]) : fallback; }
        Object.keys(old).forEach(function (id) {
          var previous = old[id];
          var hard = read('hard_' + id, {}), good = read('good_' + id, {}), stars = read('stars_' + id, []), learn = read('learn_' + id, null);
          previous.terms.forEach(function (identity, index) {
            var key = JSON.stringify([previous.scope, identity]);
            var record = pool[key] || (pool[key] = { hard: 0, good: 0, star: false, stage: 0 });
            record.hard = Math.max(record.hard, hard[index] || 0);
            record.good = Math.max(record.good, good[index] || 0);
            record.star = record.star || stars.indexOf(index) !== -1;
            record.stage = Math.max(record.stage, learnStage(learn, index));
          });
        });
        Object.keys(catalog).forEach(function (id) {
          if (old[id] && JSON.stringify(old[id]) === JSON.stringify(catalog[id])) return;
          var set = catalog[id], hard = {}, good = {}, stars = [], stage = {}, order = [];
          var hasStage = false;
          set.terms.forEach(function (identity, index) {
            var record = pool[JSON.stringify([set.scope, identity])];
            if (record) {
              if (record.hard) hard[index] = record.hard;
              if (record.good) good[index] = record.good;
              if (record.star) stars.push(index);
              stage[index] = record.stage;
              hasStage = hasStage || record.stage > 0;
            } else stage[index] = 0;
            order.push(index);
          });
          var priorLearn = read('learn_' + id, null);
          values['qz_' + profile + 'hard_' + id] = JSON.stringify(hard);
          values['qz_' + profile + 'good_' + id] = JSON.stringify(good);
          values['qz_' + profile + 'stars_' + id] = JSON.stringify(stars);
          var learn = null;
          if (hasStage) {
            learn = { v: LEARN_VERSION, order: order, stage: stage, wrong: priorLearn && priorLearn.wrong || 0, round: priorLearn && priorLearn.round || 0 };
            ['hinted', 'unaided', 'revealed'].forEach(function (key) { learn[key] = priorLearn && priorLearn[key] || 0; });
          }
          values['qz_' + profile + 'learn_' + id] = JSON.stringify(learn);
        });
      });
    }
    values.qz_catalog = serialized;
    storage.replaceAll(values);
  };
})();
