'use client';

import { useState } from 'react';
import { useMapStore } from '@/store/useMapStore';
import { EL, KIND } from '@/constants/saju';
import Icon from '@/components/ui/Icon';
import ReportHeader from './ReportHeader';

interface Props { onBack: () => void; onSim: (kind: string) => void; onSave: () => void; onClose?: () => void; saved?: boolean; }

export default function CompatReport({ onBack, onSim, onSave, onClose, saved }: Props) {
  const { worry } = useMapStore();
  const [sim, setSim] = useState('연애');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <ReportHeader title="궁합 리포트" saved={saved} onBack={onBack} onClose={onClose} />
      <div className="scroll pad-x" style={{ flex: 1, paddingTop: 14, paddingBottom: 24 }}>
        <div className="card" style={{ padding: 14, marginBottom: 12 }}>
          <div className="kicker" style={{ marginBottom: 6, fontSize: 9.5, color: KIND.관계.color }}>고민 카드 · 관계</div>
          <p className="kr" style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{worry || '지금 썸 타는 사람이랑 만나도 괜찮을까?'}</p>
        </div>
        <div className="card" style={{ padding: 20, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            {[{ n: '지원', el: 'fire', g: '丙', label: '썸' }, { n: '아라', el: 'fire', g: '丁', label: '나' }].map((p, i) => (
              <div key={p.n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: EL[p.el].soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="glyph" style={{ fontSize: 26, color: EL[p.el].color }}>{p.g}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{p.label} · {p.n}</div>
                {i === 0 && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 30, fontWeight: 700, color: 'var(--brand)', lineHeight: 1 }}>64</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>궁합</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="card clone-card" style={{ marginBottom: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>궁합에 따른 코멘트</div>
          <p className="kr" style={{ margin: 0, fontSize: 13.5, color: 'var(--fg-2)', lineHeight: 1.65 }}>
            같은 <span className="glyph" style={{ color: EL.fire.color }}>火</span>끼리예요. 둘 다 따뜻하지만 <b style={{ color: 'var(--fg-1)' }}>표현하는 불의 모양이 달라요.</b> 당신(丁火)은 말로 데우는 촛불 — 대화로 마음을 확인하고 싶어해요. 상대(丙火)는 행동으로 비추는 태양 — 먼저 연락하고 챙겨요.
          </p>
        </div>
        <div className="eyebrow" style={{ marginBottom: 8 }}>더 깊이 시뮬레이션</div>
        <div className="kr serif" style={{ fontSize: 12.5, fontStyle: 'italic', color: 'var(--fg-3)', margin: '-2px 0 10px' }}>
          상대의 클론과 채팅하며 흐름을 시뮬레이션해요
        </div>
        <div className="stack" style={{ gap: 8 }}>
          {['대화', '연애', '결혼'].map((s) => {
            const on = sim === s;
            return (
              <button key={s} onClick={() => { setSim(s); onSim(s); }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 14, textAlign: 'left', background: on ? 'var(--brand-soft)' : 'var(--surface)', border: `1px solid ${on ? 'var(--brand)' : 'var(--border)'}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: on ? 'var(--brand)' : 'var(--bg-muted)', color: on ? '#fff' : 'var(--fg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={s === '대화' ? 'message' : s === '연애' ? 'heart' : 'sparkles'} size={18} />
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: on ? 'var(--brand)' : 'var(--fg-1)' }}>{s} 시뮬레이션</span>
                <Icon name="chevron-right" size={18} color="var(--fg-4)" />
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ position: 'sticky', bottom: 0, padding: '12px 20px calc(24px + env(safe-area-inset-bottom, 0px))', background: 'linear-gradient(to bottom, transparent, var(--bg) 30%)', display: 'flex', gap: 10 }}>
        {saved ? (
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={onClose || onBack}>맵으로 돌아가기</button>
        ) : (
          <>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onBack}>다른 상대</button>
            <button className="btn btn-primary" style={{ flex: 1, gap: 6 }} onClick={onSave}><Icon name="bookmark" size={18} /> 선택 확정</button>
          </>
        )}
      </div>
    </div>
  );
}
