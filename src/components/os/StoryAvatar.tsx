'use client';

import { useEffect, useId, useState } from 'react';

interface Props { size?: number; onClick?: () => void; initial?: string; }

export default function StoryAvatar({ size = 92, onClick, initial = '아' }: Props) {
  const gid = useId().replace(/[:]/g, '');
  const sw = 4;                       // ring stroke (1px thicker than before)
  const gap = 3;                      // gap between ring and avatar
  const box = size + (sw + gap) * 2;  // outer SVG box
  const r = (box - sw) / 2;
  const circ = 2 * Math.PI * r;

  // Play the progress-ring fill once per session on first entry.
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    let timer: number | undefined;
    try {
      if (!sessionStorage.getItem('storyRingAnimated')) {
        timer = window.setTimeout(() => setAnimate(true), 0);
        sessionStorage.setItem('storyRingAnimated', '1');
      }
    } catch { /* ignore */ }
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return (
    <button onClick={onClick} style={{ position: 'relative', width: box, height: box, flexShrink: 0, cursor: 'pointer', display: 'block' }} aria-label="오늘의 스토리">
      <svg width={box} height={box} viewBox={`0 0 ${box} ${box}`} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id={`ring-${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand)" />
            <stop offset="55%" stopColor="var(--clone-coral-300)" />
            <stop offset="100%" stopColor="var(--clone-coral-200)" />
          </linearGradient>
        </defs>
        <circle
          cx={box / 2}
          cy={box / 2}
          r={r}
          fill="none"
          stroke={`url(#ring-${gid})`}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={animate ? circ : undefined}
          style={animate ? ({ ['--ring-circ' as string]: `${circ}px`, animation: 'ring-fill 1.2s var(--ease-out-soft) forwards' } as React.CSSProperties) : undefined}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: sw + gap,
          left: sw + gap,
          width: size,
          height: size,
          borderRadius: '50%',
          background: '#000',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--fg-1)',
          fontSize: size * 0.38,
          fontWeight: 700,
        }}
      >
        {initial}
      </div>
    </button>
  );
}
