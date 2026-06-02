'use client';

import { EL } from '@/constants/saju';
import type { OhaengKey } from '@/types';

export default function YongshinPanel({
  element,
  reason,
}: {
  element: OhaengKey;
  reason: string;
}) {
  const el = EL[element];
  return (
    <div className="card ed" style={{ padding: 18, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: el.soft,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: `1px solid ${el.color}33`,
        }}
      >
        <span className="glyph" style={{ fontSize: 26, color: el.color, lineHeight: 1 }}>{el.hanja}</span>
        <span style={{ fontSize: 10, color: el.color, marginTop: 2 }}>{el.ko}</span>
      </div>
      <p className="kr" style={{ margin: 0, fontSize: 12.5, color: 'var(--fg-2)', lineHeight: 1.6 }}>{reason}</p>
    </div>
  );
}
