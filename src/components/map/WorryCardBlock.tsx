'use client';

import { KIND } from '@/constants/saju';

interface Props { worry: string; kind?: '진로' | '관계' | '상담'; }

export default function WorryCardBlock({ worry, kind = '진로' }: Props) {
  const k = KIND[kind];
  return (
    <div className="card ed" style={{ padding: 16, marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: 4, background: k.color }} />
        <div className="kicker" style={{ fontSize: 9.5, color: k.color }}>고민 카드 · {kind}</div>
      </div>
      <p className="kr" style={{ margin: 0, fontSize: 15, color: 'var(--fg-1)', fontWeight: 600, lineHeight: 1.5 }}>{worry}</p>
    </div>
  );
}
