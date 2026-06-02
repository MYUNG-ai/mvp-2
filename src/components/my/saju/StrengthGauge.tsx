'use client';

export default function StrengthGauge({
  score,
  label,
  desc,
}: {
  score: number;
  label: '신강' | '중화' | '신약';
  desc: string;
}) {
  const clamped = Math.max(0, Math.min(100, score));
  return (
    <div className="card ed" style={{ padding: 18, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--brand)' }}>{label}</span>
        <span className="ed-num" style={{ fontSize: 26, color: 'var(--fg-1)', lineHeight: 1 }}>
          {clamped}
          <span style={{ fontSize: 12, color: 'var(--fg-4)' }}> / 100</span>
        </span>
      </div>
      <div style={{ position: 'relative', height: 8, background: 'var(--bg-muted)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${clamped}%`, height: '100%', background: 'var(--brand)', borderRadius: 4 }} />
      </div>
      {/* zone markers */}
      <div style={{ position: 'relative', height: 12, marginTop: 4 }}>
        <span style={{ position: 'absolute', left: '40%', fontSize: 8, color: 'var(--fg-4)', transform: 'translateX(-50%)' }}>40</span>
        <span style={{ position: 'absolute', left: '60%', fontSize: 8, color: 'var(--fg-4)', transform: 'translateX(-50%)' }}>60</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--fg-4)', marginTop: 2 }}>
        <span>신약</span><span>중화</span><span>신강</span>
      </div>
      <hr className="hr" style={{ margin: '14px 0' }} />
      <p className="kr" style={{ margin: 0, fontSize: 12, color: 'var(--fg-2)', lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}
