'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import OnbStep from './OnbStep';

interface Props { onNext: () => void; }

export default function OnbName({ onNext }: Props) {
  const { setName } = useUserStore();
  const [value, setValue] = useState('');

  const handleNext = () => {
    if (value.trim()) {
      setName(value.trim());
      onNext();
    }
  };

  return (
    <OnbStep
      step={1} total={4}
      title={<>안녕하세요.<br />뭐라고 불러드리면<br />될까요?</>}
      sub="닉네임도 괜찮아요"
      ctaDisabled={!value.trim()}
      onNext={handleNext}
    >
      <div className="field">
        <label className="field-label">이름 · 닉네임 <span style={{ color: 'var(--fg-4)', fontWeight: 400 }}>· 최대 10자</span></label>
        <input
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, 10))}
          placeholder="불릴 이름"
          style={{ fontSize: 18, fontWeight: 600 }}
          autoFocus
        />
      </div>
    </OnbStep>
  );
}
