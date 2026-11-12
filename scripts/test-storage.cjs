const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'js/storage.js'), 'utf8');
const migration = fs.readFileSync(path.join(root, 'js/progress-migration.js'), 'utf8');
function fixture(initial = {}, android = false) {
  const values = new Map(Object.entries(initial));
  let fail = false, nativeValues = {};
  const localStorage = { get length() { return values.size; }, key(i) { return [...values.keys()][i]; },
    getItem(k) { return values.has(k) ? values.get(k) : null; }, removeItem(k) { values.delete(k); },
    setItem(k, v) { if (fail) { fail = false; throw Error('QuotaExceededError'); } values.set(k, String(v)); } };
  const bridge = { getAll: () => JSON.stringify(nativeValues), setItem: (k,v) => { nativeValues[k] = v; return true; }, replaceAll: t => { nativeValues = JSON.parse(t); return true; } };
  const ctx = vm.createContext({ window: android ? { QuizlenAndroid: bridge } : {}, localStorage, Blob, setTimeout, clearTimeout });
  vm.runInContext(source, ctx); vm.runInContext(migration, ctx);
  return { store: ctx.window.QuizlenStorage, migrate: ctx.window.quizlenMigrateProgress, values, failNextWrite: () => { fail = true; }, native: () => nativeValues };
}
const progress = { qz_profile: 'zehra', qz_theme: '"dark"', qz_hard_set: '{"0":3}', qz_zehra_good_set: '{"1":4}', qz_stars_set: '[0]', qz_course: '[{"name":"Ders","done":{"1":true}}]', qz_learn_set: '{"order":[0,1],"stage":{"0":1,"1":2},"wrong":3,"round":2}' };
for (const android of [false, true]) {
  const a = fixture(progress, android), b = fixture({}, android);
  b.store.importText(a.store.exportText());
  assert.deepEqual(JSON.parse(JSON.stringify(b.store.snapshot())), progress);
  b.store.setItem('qz_theme', '"light"');
  assert.equal(b.store.getItem('qz_theme'), '"light"');
}
const a = fixture({...progress, other_app: 'keep'});
const before = a.store.exportText();
for (const data of [{...progress, foreign: 'x'}, {...progress, qz_profile: 'invalid'}, {...progress, qz_hard_set: '[]'}, {...progress, qz_stars_set: '[-1]'}, {...progress, qz_catalog: '{"x":null}'}, {...progress, qz_course: '[{"name":"Oops","done":[]}]'}]) {
  assert.throws(() => a.store.importText(JSON.stringify({format:'quizlen-backup',version:1,data})));
  assert.deepEqual(JSON.parse(JSON.stringify(a.store.snapshot())), JSON.parse(before).data);
}
assert.throws(() => a.store.importText('{broken'));
assert.throws(() => a.store.importText(JSON.stringify({format:'quizlen-backup',version:2,data:progress})));
assert.throws(() => a.store.importText('x'.repeat(5*1024*1024+1)));
a.failNextWrite();
assert.throws(() => a.store.importText(JSON.stringify({format:'quizlen-backup',version:1,data:{qz_theme:'"light"'}})));
assert.deepEqual(JSON.parse(JSON.stringify(a.store.snapshot())), JSON.parse(before).data);
assert.equal(a.values.get('other_app'), 'keep');
function term(s) { return {term:s, def:'TR '+s}; }
const m = fixture({ qz_hard_a: '{"0":3}', qz_good_a:'{"1":2}', qz_stars_a:'[0]', qz_zehra_good_a:'{"0":5}', qz_learn_a:'{"order":[0,1],"stage":{"0":1,"1":2},"wrong":3,"round":2}' });
const set = (id, words) => ({ id, group:'poster', posterCategory:'words', terms:words.map(term) });
m.migrate(m.store, [set('a',['apple','book']),set('b',['cat'])]);
m.migrate(m.store, [set('a',['new','book']),set('b',['apple','cat'])]);
assert.equal(JSON.parse(m.store.getItem('qz_hard_b'))[0],3);
assert.equal(JSON.parse(m.store.getItem('qz_good_a'))[1],2);
assert.equal(JSON.parse(m.store.getItem('qz_stars_b'))[0],0);
assert.equal(JSON.parse(m.store.getItem('qz_zehra_good_b'))[0],5);
assert.equal(JSON.parse(m.store.getItem('qz_learn_b')).stage[0],1);
assert.equal(JSON.parse(m.store.getItem('qz_learn_a')).stage[1],4);
assert.equal(JSON.parse(m.store.getItem('qz_learn_a')).v,2);
const v = fixture({ qz_learn_a: '{"v":2,"order":[0,1],"stage":{"0":2,"1":3},"wrong":1,"round":4,"hinted":2}', qz_learn_b: '{"order":[0],"stage":{"0":2}}' });
v.migrate(v.store, [set('a',['apple','book']),set('b',['cat'])]);
v.migrate(v.store, [set('a',['book','apple']),set('b',['cat','dog'])]);
assert.deepEqual(JSON.parse(v.store.getItem('qz_learn_a')).stage, {0:3,1:2});
assert.equal(JSON.parse(v.store.getItem('qz_learn_a')).hinted, 2);
assert.deepEqual(JSON.parse(v.store.getItem('qz_learn_b')).stage, {0:4,1:0});
assert.equal(JSON.parse(m.store.getItem('qz_hard_a'))[0],undefined);
const unchanged = JSON.stringify(m.store.snapshot());
m.migrate(m.store,[set('a',['new','book']),set('b',['apple','cat'])]);
assert.equal(JSON.stringify(m.store.snapshot()),unchanged);
console.log('PASS: browser + native backup round-trip; both profiles; invalid/oversize backups; rollback; unrelated storage; word reorder/repack; learn v1→v2 stages; idempotent migration.');
