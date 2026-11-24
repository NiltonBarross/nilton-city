export function towersFromDays(days) {
  const seen = new Set();
  for (const day of days) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isInteger(day.contributionCount) || day.contributionCount < 0 || seen.has(day.date)) throw new Error('Calendário inválido.');
    seen.add(day.date);
  }
  return days.filter(d => d.contributionCount > 0).map((d,i) => ({
    date:d.date, count:d.contributionCount,
    x:(i%2 ? 1 : -1)*8, z:-26+Math.floor(i/2)*16,
    height:5+Math.sqrt(d.contributionCount)*8, w:6,d:6
  }));
}
export const initialCar = () => ({x:0,z:43,heading:0});
export function stepCar(car, input, delta, obstacles) {
  const dt=Math.min(.05,Math.max(0,delta));
  const direction=Number(!!input.forward)-Number(!!input.back);
  const turn=Number(!!input.left)-Number(!!input.right);
  const heading=car.heading+turn*dt*1.8;
  const speed=direction*(input.fast?24:15);
  const x=Math.max(-68,Math.min(68,car.x-Math.sin(heading)*speed*dt));
  const z=Math.max(-47,Math.min(47,car.z-Math.cos(heading)*speed*dt));
  const blocked=obstacles.some(o=>Math.abs(x-o.x)<o.w/2+1.5 && Math.abs(z-o.z)<o.d/2+1.5);
  return {x:blocked?car.x:x,z:blocked?car.z:z,heading};
}
