'use client';

import Mark from '@/components/ui/Mark';
import Wordmark from '@/components/ui/Wordmark';

interface Props { onNext: () => void; }

export default function OnbSplash({ onNext }: Props) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', position: 'relative', overflow: 'hidden', padding: '0 40px',
      minHeight: '100dvh',
    }}>
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244,131,27,0.10), transparent 65%)',
        animation: 'pulse-ring 3.6s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ marginBottom: 26 }} className="animate-float-up">
          <Mark size={64} />
        </div>
        <div className="animate-float-up-1">
          <Wordmark size={40} muted="var(--fg-2)" />
        </div>
        <div className="kr serif animate-float-up-2" style={{ marginTop: 18, fontSize: 15, color: 'var(--fg-3)', fontStyle: 'italic' }}>
          明 — 나를 비추는 클론
        </div>
      </div>
      <div className="animate-float-up-3" style={{
        position: 'absolute', bottom: 64, left: 0, right: 0, display: 'flex', justifyContent: 'center',
      }}>
        <button
          onClick={onNext}
          className="btn btn-primary"
          style={{ width: 200 }}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
