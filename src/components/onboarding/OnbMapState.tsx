'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';

const CAREER = ['학생', '취준생', '직장인', '프리랜서', 'CEO'];
const RELATION = ['솔로', '썸', '연애', '결혼', '이혼'];

interface Props { onNext: () => void; }

export default function OnbMapState({ onNext }: Props) {
  const { user, setMbti, setCareerStatus, setRelationStatus } = useUserStore();
  const [mbti, setMbtiLocal] = useState(user.mbti || '');
  const [career, setCareer] = useState(user.careerStatus || '');
  const [relation, setRelation] = useState(user.relationStatus || '');

  const handleSave = () => {
    setMbti(mbti);
    setCareerStatus(career);
    setRelationStatus(relation);
    onNext();
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div className="app-header">
        <div className="title">{user.name || ''}님의 클론을 만들기 위한 정보</div>
        <div className="right">
          <button onClick={onNext} style={{ padding: '6px 12px', borderRadius: 999, background: 'var(--bg-muted)', color: 'var(--fg-3)', fontSize: 13, fontWeight: 600 }}>skip</button>
        </div>
      </div>
      <div className="scroll pad-x" style={{ flex: 1, paddingTop: 8, paddingBottom: 24 }}>
        <p className="kr" style={{ font: 'var(--fw-regular) 14px/21px var(--font-sans)', color: 'var(--fg-3)', margin: '0 0 18px' }}>
          지금의 상태를 알려주면 클론이 더 잘 이해해요. 마이에서 언제든 바꿀 수 있어요.
        </p>
        <div className="card" style={{ padding: 20 }}>
          <div className="stack" style={{ gap: 18 }}>
            <div className="field">
              <label className="field-label">MBTI</label>
              <input className="input" value={mbti} onChange={(e) => setMbtiLocal(e.target.value.toUpperCase().slice(0, 4))} placeholder="ENFP" />
            </div>
            <div className="field">
              <label className="field-label">진로</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {CAREER.map((c) => (
                  <button key={c} onClick={() => setCareer(c)} className={`chip${career === c ? ' active' : ''}`} style={{ height: 36, padding: '0 14px', fontSize: 13 }}>{c}</button>
                ))}
              </div>
            </div>
            <div className="field">
              <label className="field-label">관계 상태</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {RELATION.map((c) => (
                  <button key={c} onClick={() => setRelation(c)} className={`chip${relation === c ? ' active' : ''}`} style={{ height: 36, padding: '0 14px', fontSize: 13 }}>{c}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'sticky', bottom: 0, padding: '12px 20px 32px', background: 'linear-gradient(to bottom, transparent, var(--bg) 30%)' }}>
        <button className="btn btn-primary btn-full" onClick={handleSave}>클론 만들기</button>
      </div>
    </div>
  );
}
