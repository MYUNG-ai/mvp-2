'use client';

import { useState } from 'react';
import { useMapStore } from '@/store/useMapStore';
import { EL } from '@/constants/saju';
import Icon from '@/components/ui/Icon';
import TwinSpark from '@/components/ui/TwinSpark';
import ReportHeader from './ReportHeader';

interface Props { onBack: () => void; onSave: () => void; onClose?: () => void; saved?: boolean; }

export default function CounselReport({ onBack, onSave, onClose, saved }: Props) {
  const { worry } = useMapStore();
  const [verdict, setVerdict] = useState<string | null>(null);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <ReportHeader title="상담 리포트" saved={saved} onBack={onBack} onClose={onClose} />
      <div className="scroll pad-x" style={{ flex: 1, paddingTop: 14, paddingBottom: 24 }}>
        <div className="kicker" style={{ marginBottom: 8 }}>입력한 고민</div>
        <div className="card ed" style={{ padding: 14, marginBottom: 16 }}>
          <p className="kr" style={{ margin: 0, fontSize: 14, color: 'var(--fg-1)', fontWeight: 600, lineHeight: 1.5 }}>{worry || '나이가 들수록 새로운 사람을 만나기보다 알던 사람을 챙기기에도 벅차요.'}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span className="glyph" style={{ fontSize: 18, color: EL.fire.color }}>命</span>
              <div className="eyebrow">사주의 말</div>
            </div>
            <p className="kr" style={{ margin: 0, fontSize: 12.5, color: 'var(--fg-2)', lineHeight: 1.55 }}>
              辛金 대운은 불필요한 걸 깎아내는 시기예요. 더 많은 사람이 아니라, 더 깊은 한 사람이 필요한 때. 숫자를 줄이는 게 먼저예요.
            </p>
          </div>
          <div className="card" style={{ padding: 16, borderColor: 'rgba(110,86,207,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <TwinSpark size={15} />
              <div className="eyebrow" style={{ color: 'var(--clone-twin-500)' }}>클론의 말</div>
            </div>
            <p className="kr" style={{ margin: 0, fontSize: 12.5, color: 'var(--fg-2)', lineHeight: 1.55 }}>
              다 챙기려니까 벅찬 거야. 고립감은 사람 수가 아니라 &apos;진짜 연결&apos;의 부재에서 와. 언제 그 느낌이 가장 크게 와?
            </p>
          </div>
        </div>

        <div className="eyebrow" style={{ marginBottom: 8 }}>예상 시나리오 & 풀이</div>
        <div className="card clone-card" style={{ marginBottom: 16 }}>
          <p className="kr" style={{ margin: '0 0 14px', fontSize: 13.5, color: 'var(--fg-1)', lineHeight: 1.65 }}>
            <b>&apos;관계 유지&apos;와 &apos;연결감&apos;은 다른 거예요.</b> 지금 벅찬 이유는 유지에만 에너지를 쓰고 있어서예요. 편한 한 명에게 먼저 솔직하게 털어놓는 것 한 번이, 열 명과 안부 주고받는 것보다 훨씬 깊게 충전돼요. <b>줄이는 게 멀어지는 게 아니라, 깊어지는 거예요.</b>
          </p>
          <div className="stack" style={{ gap: 8 }}>
            {[{ k: '기회', v: 78 }, { k: '리스크', v: 35 }, { k: '타이밍', v: 61 }].map((r) => (
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

        <div className="card" style={{ padding: 16, marginBottom: 18 }}>
          <div className="kr" style={{ fontSize: 13, color: 'var(--fg-3)', textAlign: 'center', marginBottom: 12 }}>이 풀이가 도움이 되었나요?</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[{ k: 'good', ic: 'thumbs-up', tone: 'var(--success-500)' }, { k: 'bad', ic: 'thumbs-down', tone: 'var(--danger-500)' }].map((b) => {
              const on = verdict === b.k;
              return (
                <button key={b.k} onClick={() => setVerdict(b.k)} style={{ flex: 1, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 700, fontSize: 14, background: on ? b.tone + '22' : 'var(--bg-muted)', color: on ? b.tone : 'var(--fg-3)', border: `1.5px solid ${on ? b.tone : 'transparent'}` }}>
                  <Icon name={b.ic} size={18} /> {b.k}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ position: 'sticky', bottom: 0, padding: '12px 20px calc(24px + env(safe-area-inset-bottom, 0px))', background: 'linear-gradient(to bottom, transparent, var(--bg) 30%)', display: 'flex', gap: 10 }}>
        {saved ? (
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={onClose || onBack}>맵으로 돌아가기</button>
        ) : (
          <>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onBack}>다른 선택지</button>
            <button className="btn btn-primary" style={{ flex: 1, gap: 6 }} onClick={onSave}><Icon name="bookmark" size={18} /> 선택 확정 · 저장</button>
          </>
        )}
      </div>
    </div>
  );
}
