'use client';

import { useState } from 'react';
import { useMapStore } from '@/store/useMapStore';
import { EL } from '@/constants/saju';
import Icon from '@/components/ui/Icon';
import ReportHeader from './ReportHeader';
import WorryCardBlock from './WorryCardBlock';

interface Props { onNext: () => void; onBack: () => void; }

const PEOPLE = [
  { n: '김지원', g: '丙', el: 'fire', rel: '썸' },
  { n: '이서연', g: '壬', el: 'water', rel: '친구' },
];

export default function RelationEntry({ onNext, onBack }: Props) {
  const { worry } = useMapStore();
  const [sel, setSel] = useState(0);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <ReportHeader title="궁합 보기" onBack={onBack} />
      <div className="scroll pad-x" style={{ flex: 1, paddingTop: 14, paddingBottom: 24 }}>
        <WorryCardBlock worry={worry || '지금 썸 타는 사람이랑 만나도 괜찮을까? 대화 코드는 잘 맞는데, 표현이 너무 소극적이고 공감을 잘 해주는 편도 아니야.'} kind="관계" />
        <div className="kr" style={{ textAlign: 'center', fontSize: 15, fontWeight: 600, margin: '4px 0 18px' }}>
          <span className="serif" style={{ fontStyle: 'italic', color: 'var(--brand)' }}>&quot;</span> 어떤 분과의 관계를 고민하고 계신가요? <span className="serif" style={{ fontStyle: 'italic', color: 'var(--brand)' }}>&quot;</span>
        </div>
        <div className="stack" style={{ gap: 8, marginBottom: 14 }}>
          {PEOPLE.map((p, i) => {
            const on = sel === i;
            const el = EL[p.el];
            return (
              <button key={i} onClick={() => setSel(i)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, borderRadius: 14, textAlign: 'left', background: on ? 'var(--brand-soft)' : 'var(--surface)', border: `1.5px solid ${on ? 'var(--brand)' : 'var(--border)'}` }}>
                <div style={{ width: 46, height: 46, borderRadius: '50%', background: el.soft, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="glyph" style={{ fontSize: 22, color: el.color }}>{p.g}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {p.n}<span style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg-3)', background: 'var(--bg-muted)', padding: '2px 6px', borderRadius: 4 }}>{p.rel}</span>
                  </div>
                  <div className="kr" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>저장된 상대 클론</div>
                </div>
                {on && <Icon name="check" size={18} color="var(--brand)" />}
              </button>
            );
          })}
        </div>
        <div className="card ed" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--bg-muted)', color: 'var(--fg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="plus" size={16} /></div>
            <div className="kicker" style={{ fontSize: 9.5 }}>새 상대 · 생년월일시 입력</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="field"><label className="field-label">생년월일</label><div className="input select"><span className="value placeholder">YYYY.MM.DD</span><Icon name="calendar" size={18} /></div></div>
            <div className="field"><label className="field-label">출생시간</label><div className="input select"><span className="value placeholder">HH:MM</span><Icon name="clock" size={18} /></div></div>
          </div>
        </div>
      </div>
      <div style={{ position: 'sticky', bottom: 0, padding: '12px 20px calc(24px + env(safe-area-inset-bottom, 0px))', background: 'linear-gradient(to bottom, transparent, var(--bg) 30%)', display: 'flex', gap: 10 }}>
        <button className="btn btn-secondary" style={{ flex: '0 0 auto', paddingInline: 22 } as React.CSSProperties} onClick={onNext}>skip</button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={onNext}>궁합 보기</button>
      </div>
    </div>
  );
}
