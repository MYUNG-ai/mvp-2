'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import OnbStep from './OnbStep';
import Icon from '@/components/ui/Icon';

interface Props { onNext: () => void; onBack: () => void; }

export default function OnbGender({ onNext, onBack }: Props) {
  const { setGender } = useUserStore();
  const [selected, setSelected] = useState<'male' | 'female' | null>(null);

  const handleNext = () => {
    setGender(selected);
    onNext();
  };

  return (
    <OnbStep
      step={3} total={4}
      title="성별을 알려주세요"
      sub="사주 해석의 대운 방향을 정하는 데 쓰여요."
      ctaDisabled={!selected}
      onBack={onBack}
      onNext={handleNext}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { k: 'male' as const, label: '남성' },
          { k: 'female' as const, label: '여성' },
        ].map((g) => (
          <button
            key={g.k}
            onClick={() => setSelected(g.k)}
            style={{
              height: 96, borderRadius: 'var(--r-lg)',
              background: selected === g.k ? 'var(--brand-soft)' : 'var(--bg-muted)',
              color: selected === g.k ? 'var(--brand)' : 'var(--fg-2)',
              border: `1.5px solid ${selected === g.k ? 'var(--brand)' : 'transparent'}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontWeight: 700, fontSize: 17, transition: 'all .14s var(--ease-out-soft)',
            }}
          >
            <Icon name="user" size={26} />
            {g.label}
          </button>
        ))}
      </div>
      <button
        onClick={() => { setGender(null); onNext(); }}
        style={{ marginTop: 12, width: '100%', textAlign: 'center', color: 'var(--fg-4)', fontSize: 13, padding: '8px 0' }}
      >
        선택하지 않을래요
      </button>
    </OnbStep>
  );
}
