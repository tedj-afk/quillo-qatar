import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';

const code = ts.transpileModule(readFileSync('lib/analytics-client.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const storage = new Map();
const calls = [];
let imports = 0;
const posthog = { init: (...args) => calls.push(['init', ...args]), capture: (...args) => calls.push(['capture', ...args]) };
function module(enabled = true) {
  const exports = {};
  const context = vm.createContext({ exports, window: {}, location: { hostname: 'quillo.example', href: 'https://quillo.example/' }, process: { env: { NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: 'test-only-token' } }, Date,
    sessionStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key,value) },
    require: name => { if (name === './analytics-config') return { analyticsEnabled: () => enabled }; if (name === 'posthog-js') { imports++; return { default: posthog }; } throw Error(name); },
  });
  vm.runInContext(code, context);
  return exports;
}
const first = module();
first.captureAnalytics('section viewed', { section: 'hero' }, false);
assert.equal(imports, 0, 'Non-critical analytics must not enter the initial bundle/load path');
// Model a page navigation before the deferred SDK has initialized.
const second = module();
await Promise.all([second.startAnalytics(), second.startAnalytics()]);
assert.equal(imports, 1);
assert.equal(calls.filter(c=>c[0]==='init').length, 1);
const queued = calls.find(c=>c[1]==='section viewed');
assert.equal(queued[2].section, 'hero');
assert.equal(queued[2].$current_url, 'https://quillo.example/');
assert.ok(queued[3].timestamp instanceof Date);
assert.equal(storage.get('quillo:pending-analytics'), '[]');
second.captureAnalytics('case study clicked', { project: 'quillo' }, true);
assert.equal(calls.at(-1)[3].transport, 'sendBeacon');
assert.equal(calls.at(-1)[3].send_instantly, true);
console.log('Passed: deferred SDK, one initialization, early-navigation persistence, timestamps, beacon transport.');

const before = { imports, calls: calls.length, storage: JSON.stringify([...storage]) };
const disabled = module(false);
disabled.captureAnalytics('booking clicked', { currency: 'QAR', price: 25000 }, true);
await disabled.startAnalytics();
assert.equal(imports, before.imports);
assert.equal(calls.length, before.calls);
assert.equal(JSON.stringify([...storage]), before.storage);
console.log('Passed: disabled previews neither load SDK nor queue/send analytics.');
