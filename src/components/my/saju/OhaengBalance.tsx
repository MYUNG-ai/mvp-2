'use client';

import { EL } from '@/constants/saju';
import type { OhaengKey } from '@/types';

const ORDER: OhaengKey[] = ['wood', 'fire', 'earth', 'metal', 'water'];

export default function OhaengBalance({
  counts,
}: {
  counts: Record<OhaengKey, number>;
}) {
  const max = Math.max(...ORDER.map((k) => counts[k]), 1);
  const total = ORDER.reduce((a, k) => a + counts[k], 0);

  // dominant / missing read
  const dominant = ORDER.reduce((a, b) => (counts[b] > counts[a] ? b : a));
  const missing = ORDER.filter((k) => counts[k] === 0);

  return (
    <div className="card ed" style={{ padding: 18, marginBottom: 12 }}>
      <div className="stack" style={{ gap: 10 }}>
        {ORDER.map((k) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="glyph" style={{ width: 18, fontSize: 15, color: EL[k].color, textAlign: 'center' }}>
              {EL[k].hanja}
            </span>
            <div style={{ flex: 1, height: 8, background: 'var(--bg-muted)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${(counts[k] / max) * 100}%`, height: '100%', background: EL[k].color, borderRadius: 4 }} />
            </div>
            <span className="mono" style={{ width: 18, textAlign: 'right', fontSize: 11, color: 'var(--fg-3)' }}>{counts[k]}</span>
          </div>
        ))}
      </div>
      <hr className="hr" style={{ margin: '14px 0' }} />
      <p className="kr" style={{ margin: 0, fontSize: 12, color: 'var(--fg-2)', lineHeight: 1.6 }}>
        <b style={{ color: EL[dominant].color }}>{EL[dominant].hanja}({EL[dominant].ko})</b> 기운이 가장 강해요
        {missing.length > 0 ? (
          <>
            {' '}— <b style={{ color: 'var(--fg-1)' }}>{missing.map((m) => EL[m].hanja).join('·')}</b> 기운은 비어 있어요.
          </>
        ) : (
          <> — 다섯 기운이 비교적 고르게 분포해요.</>
        )}
        <span style={{ color: 'var(--fg-4)' }}> (총 {total}자)</span>
      </p>
    </div>
  );
}
