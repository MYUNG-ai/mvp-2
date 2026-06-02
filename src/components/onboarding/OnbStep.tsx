'use client';

import { ReactNode } from 'react';
import Icon from '@/components/ui/Icon';
import TwinSpark from '@/components/ui/TwinSpark';

interface OnbStepProps {
  step: number;
  total: number;
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  children: ReactNode;
  ctaLabel?: string;
  ctaDisabled?: boolean;
  onBack?: () => void;
  onNext: () => void;
  footer?: ReactNode;
}

export default function OnbStep({
  step, total, eyebrow = 'ONBOARDING', title, sub, children,
  ctaLabel = '다음', ctaDisabled, onBack, onNext, footer,
}: OnbStepProps) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100dvh', background: 'var(--bg)' }}>
      <div style={{ height: 3, background: 'var(--bg-muted)', flexShrink: 0 }}>
        <div style={{
          height: '100%', width: `${step / total * 100}%`,
          background: 'var(--brand)', borderRadius: 2,
          transition: 'width .4s var(--ease-out-soft)',
        }} />
      </div>
      <div style={{ height: 52, padding: '0 12px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        {onBack
          ? <button className="icon-btn" onClick={onBack}><Icon name="chevron-left" size={22} /></button>
          : <div style={{ width: 36 }} />}
        <div className="mono" style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--fg-4)' }}>{step} / {total}</div>
      </div>
      <div className="scroll pad-x" style={{ paddingTop: 20, paddingBottom: 24, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 9,
            background: 'linear-gradient(135deg, var(--clone-coral-300), var(--brand))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <TwinSpark color="#fff" size={13} />
          </div>
          <div className="eyebrow" style={{ color: 'var(--brand)' }}>{eyebrow}</div>
        </div>
        <h1 className="kr" style={{ font: 'var(--fw-bold) 26px/34px var(--font-sans)', letterSpacing: '-0.02em', margin: 0, marginBottom: sub ? 10 : 24 }}>
          {title}
        </h1>
        {sub && <p className="kr" style={{ font: 'var(--fw-regular) 14px/21px var(--font-sans)', color: 'var(--fg-3)', margin: '0 0 28px' }}>{sub}</p>}
        {children}
      </div>
      <div style={{
        position: 'sticky', bottom: 0, padding: '12px 20px 32px',
        background: 'linear-gradient(to bottom, transparent, var(--bg) 30%)', flexShrink: 0,
      }}>
        {footer}
        <button
          className={`btn btn-primary btn-full${ctaDisabled ? ' disabled' : ''}`}
          onClick={!ctaDisabled ? onNext : undefined}
          disabled={ctaDisabled}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
