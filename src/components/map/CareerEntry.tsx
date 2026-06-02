'use client';

import { useState } from 'react';
import { useMapStore } from '@/store/useMapStore';
import Icon from '@/components/ui/Icon';
import ReportHeader from './ReportHeader';
import WorryCardBlock from './WorryCardBlock';

interface Props { onNext: () => void; onBack: () => void; }

const SCENARIOS = [
  { t: '지금 프리랜서로 전향한다', d: '빠른 독립 · 火의 추진력 흐름' },
  { t: '6개월 더 준비하며 병행한다', d: '뿌리를 다지는 안정형 흐름', rec: true },
  { t: '기획 직군으로 전환한다', d: '개발 경험을 무기로 쓰는 변화형' },
];

export default function CareerEntry({ onNext, onBack }: Props) {
  const { worry } = useMapStore();
  const [pick, setPick] = useState(1);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <ReportHeader title="시나리오 시뮬레이션" onBack={onBack} />
      <div className="scroll pad-x" style={{ flex: 1, paddingTop: 14, paddingBottom: 24 }}>
        <WorryCardBlock worry={worry || '개발자로 취업을 준비 중인데, 시장이 빡빡해서 프리랜서 전향이나 직군 전환을 고민 중이에요.'} kind="진로" />

        <div className="ed-head"><div className="kicker">예상 시나리오</div><div className="line" /></div>
        <div className="kr" style={{ fontSize: 12.5, color: 'var(--fg-3)', margin: '-4px 0 14px', lineHeight: 1.5 }}>
          가능한 길을 추렸어요. 하나를 골라 시뮬레이션해 보세요.
        </div>
        <div className="stack" style={{ gap: 8 }}>
          {SCENARIOS.map((s, i) => {
            const on = pick === i;
            return (
              <button key={i} onClick={() => setPick(i)} style={{ textAlign: 'left', padding: '14px 16px', borderRadius: 14, background: on ? 'var(--brand-soft)' : 'var(--surface)', border: `1.5px solid ${on ? 'var(--brand)' : 'var(--border)'}`, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div className="ed-num" style={{ fontSize: 20, color: on ? 'var(--brand)' : 'var(--fg-4)', lineHeight: 1, marginTop: 1, width: 22, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14.5, fontWeight: 700, color: on ? 'var(--brand)' : 'var(--fg-1)' }}>{s.t}</span>
                    {s.rec && <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--brand)', border: '1px solid var(--brand)', padding: '1px 5px', borderRadius: 4, letterSpacing: '0.04em' }}>추천</span>}
                  </div>
                  <div className="kr" style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 3, lineHeight: 1.45 }}>{s.d}</div>
                </div>
                {on && <Icon name="check" size={18} color="var(--brand)" />}
              </button>
            );
          })}
          <button style={{ textAlign: 'left', padding: '13px 16px', borderRadius: 14, background: 'var(--bg-muted)', border: '1.5px dashed var(--border-strong)', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--fg-3)', fontSize: 13.5 }}>
            <Icon name="plus" size={16} /> 직접 시나리오 입력
          </button>
        </div>

        <div className="ed-head" style={{ marginTop: 22 }}><div className="kicker">AI 사주 분석</div><div className="line" /></div>
        <div className="card" style={{ padding: 16 }}>
          <p className="kr" style={{ margin: 0, fontSize: 13.5, color: 'var(--fg-2)', lineHeight: 1.65 }}>
            당신은 <b style={{ color: 'var(--fg-1)' }}><span className="glyph">甲</span> 갑목</b> 일간 — 곧게 뻗는 큰 나무예요. 큰 나무는 <b style={{ color: 'var(--fg-1)' }}>뿌리를 깊게 내려야</b> 비로소 가지를 뻗어요. 지금은 <b style={{ color: 'var(--fg-1)' }}><span className="glyph">庚</span> 경금 대운</b> — 칼의 기운이 木을 압박해, &quot;내가 부족한가&quot; 하는 자기검열이 평소의 2배로 느껴지는 시기예요.
          </p>
          <p className="kr" style={{ margin: '12px 0 0', fontSize: 13.5, color: 'var(--fg-1)', fontWeight: 600, lineHeight: 1.6 }}>
            다만 이 압력은 올해 가을(申·酉月)까지. 지금은 방향을 바꿀 때가 아니라, 뿌리를 내릴 때예요.
          </p>
        </div>
      </div>
      <div style={{ position: 'sticky', bottom: 0, padding: '12px 20px calc(24px + env(safe-area-inset-bottom, 0px))', background: 'linear-gradient(to bottom, transparent, var(--bg) 30%)', display: 'flex', gap: 10 }}>
        <button className="btn btn-secondary" style={{ flex: '0 0 auto', paddingInline: 22 } as React.CSSProperties} onClick={onBack}>exit</button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={onNext}>시뮬레이션 시작</button>
      </div>
    </div>
  );
}
