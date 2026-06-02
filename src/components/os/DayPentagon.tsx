'use client';

import { EL } from '@/constants/saju';

interface OhaengData { wood: number; fire: number; earth: number; metal: number; water: number; }

interface Props {
  values?: OhaengData;
  label?: string;
  unit?: string;
  weekday?: string;
  w?: number;
  h?: number;
}

const ORDER: (keyof OhaengData)[] = ['wood', 'fire', 'earth', 'metal', 'water'];

export default function DayPentagon({ values, label = '16', unit = '일', weekday = '금요일 · 金', w = 240, h = 150 }: Props) {
  const data = values || { wood: 18, fire: 14, earth: 34, metal: 20, water: 14 };
  const cx = w / 2, cy = h / 2;
  const Rx = w / 2 - 30, Ry = h / 2 - 22;
  const max = Math.max(...ORDER.map(k => data[k]));
  const ang = (i: number) => -Math.PI / 2 + (i / 5) * Math.PI * 2;
  const pt = (i: number, fx: number, fy: number): [number, number] => [
    cx + Rx * fx * Math.cos(ang(i)),
    cy + Ry * fy * Math.sin(ang(i)),
  ];
  const dataPts = ORDER.map((k, i) => pt(i, data[k] / max, data[k] / max));
  const dataPath = 'M' + dataPts.map(p => p.join(',')).join('L') + 'Z';

  return (
    <div style={{ position: 'relative', width: w, height: h }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: 'absolute', inset: 0, display: 'block' }}>
        {[0.45, 0.72, 1].map((s, gi) => (
          <polygon key={gi} points={ORDER.map((_, i) => pt(i, s, s).join(',')).join(' ')} fill="none" stroke="var(--divider)" strokeWidth="1" />
        ))}
        {ORDER.map((_, i) => {
          const [x, y] = pt(i, 1, 1);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--divider)" strokeWidth="1" />;
        })}
        <path d={dataPath} fill="rgba(244,131,27,0.16)" stroke="var(--brand)" strokeWidth="1.75" strokeLinejoin="round" />
        {dataPts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="var(--brand)" />)}
        {ORDER.map((k, i) => {
          const [x, y] = [cx + (Rx + 16) * Math.cos(ang(i)), cy + (Ry + 13) * Math.sin(ang(i))];
          return (
            <text key={k} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-serif)" fontSize="13" fontWeight="600" fill={EL[k].color}>
              {EL[k].hanja}
            </text>
          );
        })}
      </svg>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="ed-num" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 30, lineHeight: 0.9, color: 'var(--fg-1)', whiteSpace: 'nowrap' }}>
          {label}<span style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-3)' }}>{unit}</span>
        </div>
        <div className="kicker" style={{ position: 'absolute', left: 0, right: 0, top: 'calc(50% + 20px)', textAlign: 'center', fontSize: 7.5, color: 'var(--fg-3)' }}>{weekday}</div>
      </div>
    </div>
  );
}
