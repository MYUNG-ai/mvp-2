'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import OnbStep from './OnbStep';
import Icon from '@/components/ui/Icon';

const REGIONS = ['서울', '부산', '대구', '인천', '광주', '대전', '해외'];

interface Props { onNext: () => void; onBack: () => void; }

export default function OnbRegion({ onNext, onBack }: Props) {
  const { setRegion } = useUserStore();
  const [selected, setSelected] = useState('');

  const handleNext = () => {
    if (selected) {
      setRegion(selected);
      onNext();
    }
  };

  return (
    <OnbStep
      step={4} total={4}
      title={<>어디에서<br />태어나셨나요?</>}
      sub="출생 지역의 경도로 진태양시를 보정해 더 정확하게 계산해요."
      ctaLabel="사주 받아오기"
      ctaDisabled={!selected}
      onBack={onBack}
      onNext={handleNext}
    >
      <div className="field" style={{ marginBottom: 18 }}>
        <label className="field-label">출생 지역</label>
        <div className="input select" style={{ height: 56 }}>
          <span className="value" style={{ fontSize: 17, fontWeight: 600, color: selected ? 'var(--fg-1)' : 'var(--fg-4)' }}>
            {selected || '지역을 선택하세요'}
          </span>
          <Icon name="map-pin" size={20} />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {REGIONS.map((r) => (
          <button
            key={r}
            onClick={() => setSelected(r)}
            className={`chip${selected === r ? ' active' : ''}`}
            style={{ height: 38, padding: '0 16px', fontSize: 14 }}
          >
            {r}
          </button>
        ))}
      </div>
    </OnbStep>
  );
}
