'use client';

import { useRouter } from 'next/navigation';
import { EL } from '@/constants/saju';
import Icon from '@/components/ui/Icon';

const MONTHS = [
  { m: 1, el: 'water', v: '정리와 휴식, 다음을 준비하는 달' },
  { m: 2, el: 'wood', v: '새 계획의 싹이 트기 시작' },
  { m: 3, el: 'wood', v: '관계와 일에서 확장의 기운' },
  { m: 4, el: 'fire', v: '추진력이 붙는 활동기' },
  { m: 5, el: 'fire', v: '관계의 온도를 확인하는 시기', now: true },
  { m: 6, el: 'earth', v: '속도를 늦추고 안정을 도모' },
  { m: 7, el: 'earth', v: '기반을 다지는 정착기' },
  { m: 8, el: 'metal', v: '결단과 정리, 군더더기 제거' },
  { m: 9, el: 'metal', v: '성과를 거두는 수확기' },
  { m: 10, el: 'metal', v: '관계 재정비 · 핵심만 남기기' },
  { m: 11, el: 'water', v: '흐름이 트이는 전환점' },
  { m: 12, el: 'water', v: '한 해를 매듭짓는 회복기' },
];

function DaewoonRow({ stem, years, active }: { stem: string; years: string; active?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px', borderTop: '1px solid var(--divider)', background: active ? 'var(--brand-soft)' : 'transparent' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: active ? 'var(--brand)' : 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="glyph" style={{ fontSize: 17, color: active ? '#fff' : 'var(--fg-3)', lineHeight: 1 }}>{stem}</span>
      </div>
      <div style={{ flex: 1 }}>
        <div className="mono" style={{ fontSize: 12, color: active ? 'var(--brand)' : 'var(--fg-3)' }}>{years}</div>
      </div>
      {active && <span className="kicker" style={{ fontSize: 8, color: 'var(--brand)' }}>현재</span>}
    </div>
  );
}

export default function YearLuckPage() {
  const router = useRouter();
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="app-header">
        <div className="left"><button className="icon-btn" onClick={() => router.back()}><Icon name="chevron-left" size={22} /></button></div>
        <div className="title">2026 · 연운</div>
        <div className="right" />
      </div>
      <div className="scroll pad-x" style={{ flex: 1, paddingTop: 16, paddingBottom: 28 }}>
        <div className="card clone-card" style={{ marginBottom: 18 }}>
          <div className="kicker" style={{ marginBottom: 8, color: 'var(--brand)' }}>2026 · 丙午年 한 줄</div>
          <p className="kr" style={{ margin: 0, fontSize: 15, fontWeight: 600, lineHeight: 1.55 }}>
            쌓아온 것을 정리하고 구조를 다시 짜는 해예요. 확장보다 점검이 길하고, 가을 이후 흐름이 트입니다.
          </p>
        </div>

        <div className="ed-head"><div className="kicker">대운 흐름</div><div className="line" /></div>
        <div className="card flush" style={{ overflow: 'hidden', marginBottom: 18 }}>
          <DaewoonRow stem="甲" years="1999 – 2008" />
          <DaewoonRow stem="庚" years="2009 – 2018" active />
          <DaewoonRow stem="辛" years="2019 – 2028" />
          <DaewoonRow stem="壬" years="2029 – 2038" />
        </div>

        <div className="ed-head"><div className="kicker">2026 달별 흐름</div><div className="line" /></div>
        <div className="card flush" style={{ overflow: 'hidden' }}>
          {MONTHS.map((r, i) => {
            const el = EL[r.el];
            return (
              <div key={r.m} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '12px 16px', borderTop: i ? '1px solid var(--divider)' : 'none', background: r.now ? 'var(--brand-soft)' : 'transparent' }}>
                <div style={{ width: 34, textAlign: 'center', flexShrink: 0 }}>
                  <div className="ed-num" style={{ fontSize: 19, color: r.now ? 'var(--brand)' : 'var(--fg-1)', lineHeight: 1 }}>{r.m}</div>
                  <div className="kicker" style={{ fontSize: 7.5, marginTop: 2 }}>월</div>
                </div>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: el.soft, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="glyph" style={{ fontSize: 15, color: el.color, lineHeight: 1 }}>{el.hanja}</span>
                </div>
                <div className="kr" style={{ flex: 1, fontSize: 13, color: r.now ? 'var(--fg-1)' : 'var(--fg-2)', fontWeight: r.now ? 600 : 400, lineHeight: 1.4 }}>{r.v}</div>
                {r.now && <span className="kicker" style={{ fontSize: 8, color: 'var(--brand)' }}>NOW</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
