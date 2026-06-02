'use client';

import { EL } from '@/constants/saju';

interface OhaengData { wood: number; fire: number; earth: number; metal: number; water: number; }
const ORDER: (keyof OhaengData)[] = ['wood', 'fire', 'earth', 'metal', 'water'];

export default function OhaengMini({ data }: { data?: OhaengData }) {
  const d = data || { wood: 18, fire: 14, earth: 34, metal: 20, water: 14 };
  const total = ORDER.reduce((a, k) => a + d[k], 0);
  const top = ORDER.reduce((a, b) => d[b] > d[a] ? b : a, 'wood' as keyof OhaengData);
  return (
    <div>
      <div style={{ display: 'flex', height: 30, borderRadius: 7, overflow: 'hidden', border: '1px solid var(--border)' }}>
        {ORDER.map((k) => {
          const pct = (d[k] / total) * 100;
          return (
            <div key={k} style={{ width: `${pct}%`, background: EL[k].color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, opacity: k === top ? 1 : 0.78 }}>
              {pct > 12 && <span className="glyph">{EL[k].hanja}</span>}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7 }}>
        {ORDER.map((k) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--fg-3)' }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: EL[k].color }} />
            <span className="glyph" style={{ color: EL[k].color, fontSize: 11 }}>{EL[k].hanja}</span>
            <span className="mono">{Math.round((d[k] / total) * 100)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
