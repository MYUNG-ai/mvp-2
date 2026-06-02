'use client';

const AXES = ['사회적 민감성', '자극 추구', '자기 성찰', '관계 길이', '방향성'];
const DATA = [0.82, 0.75, 0.6, 0.45, 0.7];
const W = 220, H = 220;
const cx = W / 2, cy = H / 2;
const R = 80;
const ang = (i: number) => -Math.PI / 2 + (i / AXES.length) * Math.PI * 2;
const pt = (i: number, r: number): [number, number] => [cx + r * Math.cos(ang(i)), cy + r * Math.sin(ang(i))];
const dataPts = DATA.map((v, i) => pt(i, v * R));
const dataPath = 'M' + dataPts.map(p => p.join(',')).join('L') + 'Z';

export default function TendencyRadar() {
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {[0.33, 0.66, 1].map((s, gi) => (
        <polygon key={gi} points={AXES.map((_, i) => pt(i, s * R).join(',')).join(' ')} fill="none" stroke="var(--divider)" strokeWidth="1" />
      ))}
      {AXES.map((_, i) => {
        const [x, y] = pt(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--divider)" strokeWidth="1" />;
      })}
      <path d={dataPath} fill="rgba(110,86,207,0.18)" stroke="var(--clone-twin-500)" strokeWidth="1.75" strokeLinejoin="round" />
      {dataPts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill="var(--clone-twin-500)" />)}
      {AXES.map((label, i) => {
        const [x, y] = pt(i, R + 18);
        return (
          <text key={label} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-sans)" fontSize="9.5" fontWeight="500" fill="var(--fg-3)">{label}</text>
        );
      })}
    </svg>
  );
}
