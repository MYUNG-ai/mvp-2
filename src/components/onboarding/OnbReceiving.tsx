'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { sendNotification } from '@/lib/email';

interface Props { onDone: () => void; }

export default function OnbReceiving({ onDone }: Props) {
  const { user } = useUserStore();
  const name = user.name || '아라';

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        await sendNotification({
          name: user.name,
          birthDate: user.birthDate,
          birthTime: user.birthTime || '모름',
          gender: user.gender === 'male' ? '남성' : user.gender === 'female' ? '여성' : '미선택',
          region: user.region,
        });
      } catch {
      }
      onDone();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onDone, user]);

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', textAlign: 'center', padding: '0 40px', position: 'relative', overflow: 'hidden',
      minHeight: '100dvh',
    }}>
      <div style={{ position: 'relative', width: 160, height: 160, marginBottom: 40 }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,131,27,0.14), transparent 62%)',
          animation: 'coral-breath 2.6s ease-in-out infinite',
        }} />
        <div className="glyph" style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 92, color: 'var(--brand)', lineHeight: 1,
        }}>命</div>
      </div>
      <div className="kicker" style={{ marginBottom: 12 }}>RECEIVING</div>
      <div className="kr" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.4, color: 'var(--fg-1)' }}>
        <span style={{ color: 'var(--brand)' }}>{name}</span>님의 명(命)을<br />받아오고 있어요
      </div>
      <div style={{ display: 'flex', gap: 5, marginTop: 24 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: 4, background: 'var(--brand)',
            animation: `dot-bounce 1.2s ${i * 0.18}s infinite ease-in-out`,
          }} />
        ))}
      </div>
    </div>
  );
}
