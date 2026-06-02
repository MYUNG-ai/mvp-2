'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import OnbStep from './OnbStep';
import Icon from '@/components/ui/Icon';

interface Props { onNext: () => void; onBack: () => void; }

export default function OnbBirth({ onNext, onBack }: Props) {
  const { user, setBirthDate, setBirthTime } = useUserStore();
  const [dateVal, setDateVal] = useState('');
  const [timeVal, setTimeVal] = useState('');
  const [unknownTime, setUnknownTime] = useState(false);

  const handleNext = () => {
    if (dateVal) {
      setBirthDate(dateVal);
      setBirthTime(unknownTime ? null : timeVal || null);
      onNext();
    }
  };

  return (
    <OnbStep
      step={2} total={4}
      title={<><span style={{ color: 'var(--brand)' }}>{user.name || '아라'}</span>님의 사주를<br />받아올게요</>}
      sub="정확한 명(命)을 위해 생년월일시가 필요해요. 시는 몰라도 괜찮아요."
      ctaDisabled={!dateVal}
      onBack={onBack}
      onNext={handleNext}
    >
      <div className="stack" style={{ gap: 16 }}>
        <div className="field">
          <label className="field-label">생년월일</label>
          <input
            type="date"
            className="input"
            value={dateVal}
            onChange={(e) => setDateVal(e.target.value)}
            style={{ height: 56, fontSize: 16, fontWeight: 600 }}
          />
        </div>
        <div className="field">
          <label className="field-label">출생시간</label>
          <input
            type="time"
            className="input"
            value={timeVal}
            onChange={(e) => setTimeVal(e.target.value)}
            disabled={unknownTime}
            style={{ height: 56, fontSize: 16, fontWeight: 600, opacity: unknownTime ? 0.4 : 1 }}
          />
          <button
            onClick={() => setUnknownTime(!unknownTime)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 6, alignSelf: 'flex-start', color: unknownTime ? 'var(--brand)' : 'var(--fg-3)', fontSize: 13, fontWeight: 500 }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: 5,
              border: `1.5px solid ${unknownTime ? 'var(--brand)' : 'var(--border-strong)'}`,
              background: unknownTime ? 'var(--brand)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            }}>
              {unknownTime && <Icon name="check" size={12} strokeWidth={3} />}
            </div>
            시간을 잘 모르겠어요
          </button>
        </div>
      </div>
    </OnbStep>
  );
}
