'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

const MOCK_FRIENDS = [
  { name: '김민지', relation: '친구', compat: 88, note: '목-화 상생. 에너지가 잘 맞아요.', color: '#5BA672' },
  { name: '이준혁', relation: '동료', compat: 62, note: '토-금 중립. 업무엔 좋지만 개인적으론 다소 거리감.', color: '#D9A441' },
  { name: '박소연', relation: '연인', compat: 74, note: '수-목 상생. 감정적 교류가 깊어요.', color: '#5686C4' },
];

function CompatBar({ v, color }: { v: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: 'var(--bg-muted)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${v}%`, height: '100%', background: color, borderRadius: 3 }} />
      </div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', width: 26, textAlign: 'right', flexShrink: 0 }}>{v}</div>
    </div>
  );
}

export default function FriendsView() {
  const [showAdd, setShowAdd] = useState(false);
  const [addName, setAddName] = useState('');
  const [addBirth, setAddBirth] = useState('');

  return (
    <div className="pad-x" style={{ paddingTop: 18, paddingBottom: 24 }}>
      <div className="ed-head">
        <div className="kicker">관계 궁합 · FRIENDS</div>
        <div className="line" />
      </div>
      <div className="kr serif" style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--fg-3)', margin: '-6px 0 16px' }}>사주 기반 궁합 분석</div>

      <div className="stack" style={{ gap: 10, marginBottom: 14 }}>
        {MOCK_FRIENDS.map((f) => (
          <div key={f.name} className="card ed" style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: f.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="user" size={16} color={f.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg-1)' }}>{f.name}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-4)', marginTop: 1 }}>{f.relation}</div>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: f.color, lineHeight: 1 }}>{f.compat}</div>
                <div className="kicker" style={{ fontSize: 8, marginTop: 2 }}>궁합</div>
              </div>
            </div>
            <CompatBar v={f.compat} color={f.color} />
            <div className="kr" style={{ fontSize: 11.5, color: 'var(--fg-3)', marginTop: 8, lineHeight: 1.5 }}>{f.note}</div>
          </div>
        ))}
      </div>

      {showAdd ? (
        <div className="card ed" style={{ padding: '14px 16px', marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>새 사람 추가</div>
          <div className="stack" style={{ gap: 10 }}>
            <div className="field">
              <label className="field-label">이름</label>
              <input className="input" value={addName} onChange={(e) => setAddName(e.target.value)} placeholder="이름을 입력하세요" />
            </div>
            <div className="field">
              <label className="field-label">생년월일</label>
              <input className="input" type="date" value={addBirth} onChange={(e) => setAddBirth(e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => { setShowAdd(false); setAddName(''); setAddBirth(''); }}>취소</button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { setShowAdd(false); setAddName(''); setAddBirth(''); }}>궁합 분석</button>
          </div>
        </div>
      ) : (
        <button
          className="btn btn-ghost btn-full"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          onClick={() => setShowAdd(true)}
        >
          <Icon name="plus" size={15} color="var(--fg-3)" />
          <span>사람 추가하기</span>
        </button>
      )}
    </div>
  );
}
