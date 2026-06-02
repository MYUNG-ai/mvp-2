'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import Icon from '@/components/ui/Icon';

interface Props { onDone: () => void; }

const STEPS = [
  { label: '사주 원국 계산', threshold: 0 },
  { label: '오행·십성 매핑', threshold: 30 },
  { label: '대운·세운 정렬', threshold: 55 },
  { label: '클론 성향 합성', threshold: 80 },
];

export default function OnbMapLoading({ onDone }: Props) {
  const { user } = useUserStore();
  const name = user.name || '아라';
  const [progress, setProgress] = useState(0);
  const circumference = 2 * Math.PI * 92;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 400); return 100; }
        return p + 2.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center', background: 'var(--bg)' }}>
      <div style={{ position: 'relative', width: 220, height: 220, marginBottom: 36 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,131,27,0.18), transparent 60%)', animation: 'coral-breath 2.6s ease-in-out infinite' }} />
        <svg width="220" height="220" viewBox="0 0 220 220" style={{ position: 'absolute', inset: 0 }}>
          <circle cx="110" cy="110" r="92" fill="none" stroke="var(--bg-muted)" strokeWidth="4" />
          <circle cx="110" cy="110" r="92" fill="none" stroke="var(--brand)" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${(progress / 100) * circumference} ${circumference}`} transform="rotate(-90 110 110)" style={{ transition: 'stroke-dasharray 0.4s var(--ease-out-soft)' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 44, fontWeight: 700, color: 'var(--fg-1)', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {Math.round(progress)}<span style={{ fontSize: 22, color: 'var(--fg-3)' }}>%</span>
          </div>
          <div className="mono" style={{ color: 'var(--brand)', marginTop: 8, letterSpacing: '0.12em', fontSize: 11, fontWeight: 700 }}>CLONING</div>
        </div>
      </div>
      <h1 className="kr" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 8px' }}>
        <span style={{ color: 'var(--brand)' }}>{name}</span>님의 클론을<br />만들고 있어요
      </h1>
      <p className="kr" style={{ fontSize: 14, color: 'var(--fg-3)', margin: '0 0 32px', lineHeight: 1.5 }}>거의 다 됐어요. 곧 첫 대화를<br />시작할 수 있어요.</p>
      <div style={{ width: '100%', background: 'var(--bg-muted)', borderRadius: 'var(--r-lg)', padding: '14px 18px', textAlign: 'left' }}>
        {STEPS.map((s, i) => {
          const done = progress > s.threshold + 25;
          const active = progress > s.threshold && !done;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', color: done ? 'var(--fg-1)' : active ? 'var(--brand)' : 'var(--fg-4)', fontSize: 13, fontWeight: 500 }}>
              <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {done ? <Icon name="check" size={14} color="var(--success-500)" strokeWidth={2.5} /> : active ? <div style={{ width: 10, height: 10, borderRadius: 5, border: '1.5px solid var(--brand)', borderTopColor: 'transparent', animation: 'spin 0.9s linear infinite' }} /> : <div style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--neutral-300)' }} />}
              </div>
              <span>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
