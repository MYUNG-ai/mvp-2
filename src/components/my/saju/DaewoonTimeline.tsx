'use client';

import { EL } from '@/constants/saju';
import type { DaewoonStep } from '@/types';

export default function DaewoonTimeline({
  steps,
  currentAge,
}: {
  steps: DaewoonStep[];
  currentAge: number | null;
}) {
  // active decade: the one whose [age, age+10) range contains currentAge
  const activeIdx =
    currentAge == null
      ? -1
      : steps.findIndex((s) => currentAge >= s.age && currentAge < s.age + 10);

  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 4,
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {steps.map((s, i) => {
          const el = EL[s.element] || EL.earth;
          const active = i === activeIdx;
          return (
            <div
              key={i}
              style={{
                flex: '0 0 auto',
                width: 62,
                padding: '10px 4px',
                borderRadius: 12,
                textAlign: 'center',
                background: active ? 'var(--brand-soft)' : 'var(--surface)',
                border: active ? '1px solid var(--brand)' : '1px solid var(--border)',
              }}
            >
              <div className="mono" style={{ fontSize: 10, color: active ? 'var(--brand)' : 'var(--fg-3)', marginBottom: 4 }}>
                {s.age}세
              </div>
              <div className="glyph" style={{ fontSize: 22, color: el.color, lineHeight: 1.1 }}>{s.stem}</div>
              <div
                style={{
                  width: 28,
                  height: 28,
                  margin: '4px auto 0',
                  borderRadius: 8,
                  background: el.soft,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="glyph" style={{ fontSize: 15, color: el.color }}>{s.branch}</span>
              </div>
              <div style={{ fontSize: 9.5, color: 'var(--fg-3)', marginTop: 5 }}>{s.tenGod}</div>
            </div>
          );
        })}
      </div>
      <div className="kr" style={{ fontSize: 10.5, color: 'var(--fg-4)', marginTop: 8, lineHeight: 1.5 }}>
        {currentAge != null && activeIdx >= 0
          ? `현재 ${currentAge}세 — ${steps[activeIdx].stemKo}${steps[activeIdx].branchKo} 대운(${steps[activeIdx].tenGod})을 지나는 중이에요.`
          : '10년 단위로 흐르는 대운의 간지와 십성이에요.'}
      </div>
    </div>
  );
}
