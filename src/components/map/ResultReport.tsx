'use client';

import { useMapStore } from '@/store/useMapStore';
import { EL } from '@/constants/saju';
import Icon from '@/components/ui/Icon';
import ReportHeader from './ReportHeader';

interface Props { onBack: () => void; onSave: (decision?: string) => void; onClose?: () => void; saved?: boolean; }

export default function ResultReport({ onBack, onSave, onClose, saved }: Props) {
  const { worry } = useMapStore();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <ReportHeader title="결과 리포트" saved={saved} onBack={onBack} onClose={onClose} />
      <div className="scroll pad-x" style={{ flex: 1, paddingTop: 14, paddingBottom: 24 }}>
        <div className="kicker" style={{ marginBottom: 8 }}>입력한 고민</div>
        <div className="card ed" style={{ padding: 14, marginBottom: 16 }}>
          <p className="kr" style={{ margin: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{worry || '개발자로 취업을 준비 중인데, 시장이 빡빡해서 프리랜서 전향이나 직군 전환을 고민 중이에요.'}</p>
          <div className="kr" style={{ marginTop: 8, fontSize: 12.5, color: 'var(--fg-3)' }}>선택 → <b style={{ color: 'var(--brand)' }}>6개월 준비 · 프리랜서 병행</b></div>
        </div>

        <div className="eyebrow" style={{ marginBottom: 8 }}>사주 해설</div>
        <div className="card" style={{ padding: 16, marginBottom: 16 }}>
          <p className="kr" style={{ margin: 0, fontSize: 13.5, color: 'var(--fg-2)', lineHeight: 1.65 }}>
            <span className="glyph">庚</span> 경금의 압박은 약점이 아니라 <b style={{ color: 'var(--fg-1)' }}>담금질</b>이었어요. 그 시기를 버틴 木은 <span className="glyph">壬</span> 임수 운(올 겨울)을 만나 빠르게 가지를 뻗습니다. 지금 방향을 틀었다면 뿌리까지 흔들렸을 거예요. <b style={{ color: 'var(--fg-1)' }}>버틴 게 아니라, 자란 거예요.</b>
          </p>
        </div>

        <div className="eyebrow" style={{ marginBottom: 8 }}>예상 시나리오</div>
        <div className="card flush" style={{ overflow: 'hidden', marginBottom: 18 }}>
          {[
            { t: '1개월', v: '지인 외주 1건 계약 · 첫 매출로 자존감 회복', el: 'earth' },
            { t: '3개월', v: '월 100–150만원 달성 · 정규직 면접 제안 유입', el: 'wood' },
            { t: '6개월', v: '취업·프리랜서 선택권 확보 · 협상 우위', el: 'fire' },
          ].map((r, i) => (
            <div key={r.t} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px', borderTop: i ? '1px solid var(--divider)' : 'none' }}>
              <div className="mono" style={{ width: 44, fontSize: 12, color: EL[r.el].color, fontWeight: 700 }}>{r.t}</div>
              <div style={{ width: 3, alignSelf: 'stretch', background: EL[r.el].color, opacity: 0.6, borderRadius: 2 }} />
              <div className="kr" style={{ flex: 1, fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.4 }}>{r.v}</div>
            </div>
          ))}
        </div>

        <div className="eyebrow" style={{ marginBottom: 8 }}>지표</div>
        <div className="card" style={{ padding: 16, marginBottom: 16 }}>
          <div className="stack" style={{ gap: 10 }}>
            {[{ k: '기회', v: 72 }, { k: '리스크', v: 41 }, { k: '타이밍', v: 68 }].map((r) => (
              <div key={r.k} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 44, fontSize: 12, color: 'var(--fg-2)', fontWeight: 500 }}>{r.k}</div>
                <div style={{ flex: 1, height: 6, background: 'var(--bg-muted)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${r.v}%`, height: '100%', background: 'var(--brand)', borderRadius: 3 }} />
                </div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', width: 24, textAlign: 'right' }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div className="kr" style={{ fontSize: 13, color: 'var(--fg-3)', textAlign: 'center', marginBottom: 12 }}>이 결과가 도움이 되었나요?</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-secondary" style={{ flex: 1, gap: 8 }}><Icon name="thumbs-up" size={18} color="var(--success-500)" /> good</button>
            <button className="btn btn-secondary" style={{ flex: 1, gap: 8 }}><Icon name="thumbs-down" size={18} color="var(--danger-500)" /> bad</button>
          </div>
        </div>
      </div>
      <div style={{ position: 'sticky', bottom: 0, padding: '12px 20px calc(24px + env(safe-area-inset-bottom, 0px))', background: 'linear-gradient(to bottom, transparent, var(--bg) 30%)', display: 'flex', gap: 10 }}>
        {saved ? (
          <button className="btn btn-primary" style={{ flex: 1, gap: 6 }} onClick={onClose || onBack}>맵으로 돌아가기</button>
        ) : (
          <>
            <button className="btn btn-secondary" style={{ flex: '0 0 auto', paddingInline: 22, gap: 6 } as React.CSSProperties} onClick={onBack}><Icon name="refresh" size={16} /> 재선택</button>
            <button className="btn btn-primary" style={{ flex: 1, gap: 6 }} onClick={() => onSave('6개월 준비 · 프리랜서 병행')}><Icon name="bookmark" size={18} /> 노드로 저장</button>
          </>
        )}
      </div>
    </div>
  );
}
