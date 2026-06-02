'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { useMapStore } from '@/store/useMapStore';
import { getTodayInfo } from '@/lib/utils';
import { EL } from '@/constants/saju';
import Icon from '@/components/ui/Icon';
import Wordmark from '@/components/ui/Wordmark';
import DayPentagon from './DayPentagon';
import StoryAvatar from './StoryAvatar';
import TodayStory from './TodayStory';
import { STORY_PAGES } from './TodayStory';

const TODAY_OHAENG = { wood: 18, fire: 14, earth: 34, metal: 20, water: 14 };

const AB_OPTIONS = [
  { k: '짜장면', el: 'earth', note: '土 · 안정', result: '土가 강한 오늘엔 익숙하고 든든한 선택이 잘 맞아요. 짜장면처럼 마음을 가라앉히는 쪽으로.' },
  { k: '스시', el: 'water', note: '水 · 흐름', result: '변화를 원한다면 水의 흐름을 빌려보세요. 가벼운 새로움이 정체된 기분을 풀어줘요.' },
] as const;

function EdHead({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="ed-head">
      <div className="kicker">{children}</div>
      <div className="line" />
      {action}
    </div>
  );
}

export default function OSScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  const today = getTodayInfo();
  const name = user.name || '아라';
  const [showStory, setShowStory] = useState(false);
  const [abPick, setAbPick] = useState<string | null>(null);
  const { nodes, openReport } = useMapStore();

  const openRecent = () => {
    const last = nodes[nodes.length - 1];
    if (last) openReport(last.kind, last.worry, last.id);
    router.push('/map');
  };

  if (showStory) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TodayStory onClose={() => setShowStory(false)} name={name} />
      </div>
    );
  }

  const luckRows = [
    { k: today.year, label: '연운', v: '쌓아온 것을 정리하고 구조를 다시 짜는 해', href: '/os/year-luck' },
    { k: today.month, label: '월운', v: '관계의 온도를 확인하는 시기', href: '/os/month-luck' },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="app-header">
        <div className="left" style={{ left: 18 }}><Wordmark size={20} /></div>
        <div className="title" style={{ opacity: 0 }}>OS</div>
        <div className="right"><button className="icon-btn"><Icon name="bell" size={22} /></button></div>
      </div>
      <div className="scroll pad-x" style={{ paddingTop: 18, paddingBottom: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 26 }}>
          <StoryAvatar size={44} initial={name[0]} onClick={() => setShowStory(true)} />
          <div className="kicker" style={{ margin: '14px 0 10px' }}>오늘의 한 줄</div>
          <h1 className="kr" style={{ font: 'var(--fw-medium) 18px/27px var(--font-sans)', letterSpacing: '-0.01em', margin: 0, textAlign: 'center', color: 'var(--fg-2)', maxWidth: 300 }}>
            {name}가 지금까지 쌓아온 가능성을 깨우고, <span style={{ color: 'var(--brand)', fontWeight: 600 }}>너만의 잠재력</span>을 온전히 발휘할 수 있는 날이야
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 22 }}>
          {[
            { ic: 'thumbs-up', t: 'GOOD', v: '이미 내린 결정 점검' },
            { ic: 'thumbs-down', t: 'BAD', v: '새 약속 · 즉흥 지출' },
          ].map((x) => (
            <div key={x.t} className="card ed" style={{ padding: '11px 13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6, color: 'var(--fg-3)' }}>
                <Icon name={x.ic} size={13} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>{x.t}</span>
              </div>
              <div className="kr" style={{ fontSize: 13, color: 'var(--fg-1)', fontWeight: 600, lineHeight: 1.35 }}>{x.v}</div>
            </div>
          ))}
        </div>

        <div className="card ed" style={{ padding: 0, overflow: 'hidden', marginBottom: 22 }}>
          {luckRows.map((r, i) => (
            <button key={r.k} onClick={() => router.push(r.href)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', textAlign: 'left', borderBottom: '1px solid var(--divider)', background: i === 0 ? 'var(--bg-muted)' : 'transparent', cursor: 'pointer' }}>
              <div style={{ width: 42, flexShrink: 0 }}>
                <div className="ed-num" style={{ fontSize: 17, color: 'var(--fg-1)', lineHeight: 1 }}>{r.k}</div>
                <div className="kicker" style={{ fontSize: 8, marginTop: 3 }}>{r.label}</div>
              </div>
              <div className="kr" style={{ flex: 1, fontSize: 12.5, color: 'var(--fg-2)', lineHeight: 1.4 }}>{r.v}</div>
              <Icon name="chevron-right" size={16} color="var(--fg-4)" />
            </button>
          ))}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0 4px' }}>
            <DayPentagon values={TODAY_OHAENG} label={today.day} unit="일" weekday={today.weekday} />
          </div>
          <div style={{ padding: '0 16px 14px' }}>
            <div className="kr" style={{ fontSize: 12.5, color: 'var(--fg-2)', lineHeight: 1.5, textAlign: 'center' }}>
              서두르지 말고, 머무르는 하루 — <span style={{ color: 'var(--fg-3)' }}>土 기운이 가장 강해요</span>
            </div>
          </div>
        </div>

        {/* Daily insight (3–5 lines) under the 일력 */}
        <div className="card ed" style={{ padding: 16, marginBottom: 22 }}>
          <div className="kicker" style={{ marginBottom: 8 }}>오늘의 인사이트</div>
          <p className="kr" style={{ margin: 0, fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.7 }}>
            오늘은 <b style={{ color: 'var(--fg-1)' }}>土 기운</b>이 사주 전반을 누르는 날이에요. 새로 벌이기보다 <b style={{ color: 'var(--fg-1)' }}>이미 시작한 일을 다지는 데</b> 힘이 실려요.
            머릿속이 복잡할수록 결정을 미루고, 한 가지씩 마무리하면 흐름이 트여요.
            대인 관계에선 먼저 연락하기보다 <b style={{ color: 'var(--fg-1)' }}>들어주는 자리</b>가 어울리고, 지출은 충동보다 계획을 따르세요.
            저녁 무렵 <span style={{ color: EL.water.color }}>水 기운</span>이 더해지며 마음이 한결 풀립니다.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: 'var(--fg-4)', margin: '0 0 18px' }}>
          <span className="kicker" style={{ fontSize: 8.5 }}>오늘의 상세 운세</span>
          <Icon name="chevron-down" size={16} />
        </div>

        <EdHead>오늘 · {today.day}일 상세</EdHead>
        <div className="stack" style={{ gap: 8, marginBottom: 24 }}>
          {STORY_PAGES.map((p) => {
            const el = EL[p.el];
            return (
              <button key={p.key} onClick={() => setShowStory(true)} className="card ed" style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 13, padding: 14, cursor: 'pointer' }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: el.soft, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="glyph" style={{ fontSize: 20, color: el.color, lineHeight: 1 }}>{el.hanja}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span className="kicker" style={{ fontSize: 8.5, color: el.color }}>{p.scoreLabel}</span>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--fg-4)' }}>{p.score}</span>
                  </div>
                  <div className="kr" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--fg-1)', margin: '2px 0 3px' }}>{p.title}</div>
                  <div className="kr" style={{ fontSize: 11.5, color: 'var(--fg-3)', lineHeight: 1.45 }}>{p.body}</div>
                </div>
              </button>
            );
          })}
        </div>

        <EdHead action={<button onClick={() => router.push('/map')} style={{ fontSize: 11, color: 'var(--brand)', fontWeight: 700, letterSpacing: '0.04em' }}>MAP →</button>}>최근 고민 노드</EdHead>
        <button onClick={openRecent} className="card ed" style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 14, padding: 16, marginBottom: 24, cursor: 'pointer' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(110,86,207,0.14)', color: 'var(--clone-twin-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="branch" size={22} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="kicker" style={{ fontSize: 9.5, color: 'var(--clone-twin-500)' }}>진로 · 3일 전</div>
            <div className="kr" style={{ fontSize: 14, fontWeight: 600, marginTop: 3 }}>지금 이직을 해야 할까?</div>
            <div className="kr" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>시나리오 2개 · 아직 선택 안 함</div>
          </div>
          <Icon name="chevron-right" size={18} color="var(--fg-4)" />
        </button>

        <EdHead>오늘의 A or B</EdHead>
        <div className="card ed" style={{ padding: 18 }}>
          <div className="kr" style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, textAlign: 'center' }}>오늘 점심, 무엇이 더 어울릴까?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center' }}>
            {AB_OPTIONS.reduce((acc: React.ReactNode[], c, i) => {
              const el = EL[c.el];
              const on = abPick === c.k;
              acc.push(
                <button key={c.k} onClick={() => setAbPick(c.k)} style={{ padding: '18px 12px', borderRadius: 14, background: on ? el.color : el.soft, border: `1.5px solid ${on ? el.color : el.color + '44'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, transition: 'all .15s' }}>
                  <span className="glyph" style={{ fontSize: 24, color: on ? '#fff' : el.color, lineHeight: 1 }}>{el.hanja}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: on ? '#fff' : 'var(--fg-1)' }}>{c.k}</span>
                  <span className="kicker" style={{ fontSize: 8.5, color: on ? 'rgba(255,255,255,0.85)' : el.color }}>{c.note}</span>
                </button>
              );
              if (i === 0) acc.push(<div key="vs" className="serif" style={{ fontSize: 15, fontStyle: 'italic', color: 'var(--fg-4)' }}>vs</div>);
              return acc;
            }, [])}
          </div>
          {abPick && (
            <div className="kr animate-float-up" style={{ marginTop: 14, padding: '11px 14px', borderRadius: 12, background: 'var(--bg-muted)', fontSize: 12.5, color: 'var(--fg-2)', lineHeight: 1.55, textAlign: 'center' }}>
              {AB_OPTIONS.find((o) => o.k === abPick)!.result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
