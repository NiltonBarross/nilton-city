import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { towersFromDays, stepCar, initialCar } from '../dist/domain.mjs';
const data = JSON.parse(readFileSync(new URL('../dist/data.json', import.meta.url)));
test('one tower per positive date; no fabricated activity', () => {
  const towers = towersFromDays(data.days);
  assert.equal(towers.length, data.days.filter(d => d.contributionCount > 0).length);
  assert.equal(towers.reduce((s,t) => s + t.count, 0), data.totalContributions);
  assert.equal(new Set(towers.map(t => t.date)).size, towers.length);
  for (const t of towers) assert.equal(t.count, data.days.find(d => d.date === t.date).contributionCount);
  assert.deepEqual(towersFromDays([{date:'2026-01-01',contributionCount:0}]), []);
  assert.throws(() => towersFromDays([{date:'bad',contributionCount:-1}]));
});
test('height grows with count and mapping is deterministic', () => {
  const days = [{date:'2026-01-01',contributionCount:1},{date:'2026-01-02',contributionCount:8}];
  assert(towersFromDays(days)[1].height > towersFromDays(days)[0].height);
  assert.deepEqual(towersFromDays(days), towersFromDays(days));
});
test('car moves, stops, caps frame time and stays on island', () => {
  const car = initialCar();
  let next = stepCar(car, {forward:true}, .016, []);
  assert(next.z < car.z);
  for (let i=0;i<2000;i++) next=stepCar(next,{forward:true},.016,[]);
  assert(next.z >= -47 && next.z <= 47);
  const capped=stepCar(car,{forward:true},100,[]);
  assert(Math.abs(capped.z-car.z)<2);
  assert.equal(stepCar(car,{},.016,[]).z,car.z);
});
test('building collisions prevent entry', () => {
  const car={x:0,z:3,heading:0};
  const next=stepCar(car,{forward:true},.05,[{x:0,z:0,w:6,d:6}]);
  assert.equal(next.z,car.z);
});
test('catalog only links public selected owner repositories', () => {
  assert.equal(data.projects.length,6);
  assert.equal(new Set(data.projects.map(p=>p.id)).size,6);
  for(const p of data.projects) {
    const url=new URL(p.url);
    assert.equal(url.protocol,'https:');
    assert.equal(url.hostname,'github.com');
    assert(url.pathname.startsWith('/NiltonBarross/'));
    assert(!url.pathname.endsWith('/scripts'));
  }
});
