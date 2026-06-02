'use client';

import { useState } from 'react';
import { EL } from '@/constants/saju';
import Icon from '@/components/ui/Icon';

export const STORY_PAGES = [
  { key: '요약', title: '머무름의 날', el: 'wood', body: '木의 기운이 강해진 하루예요. 새로운 걸 시작하기보다, 이미 가진 것을 다시 들여다보면 길이 보여요.', score: 72, scoreLabel: '오늘의 기운' },
  { key: '성공운', title: '속도보다 구조', el: 'metal', body: '결정의 속도를 한 박자 늦추세요. 오전엔 정리, 오후엔 점검. 큰 보고나 제안은 다음 주가 더 유리해요.', score: 64, scoreLabel: '성공운' },
  { key: '연애운', title: '온도를 확인할 때', el: 'fire', body: '먼저 연락하기보다 상대의 결을 살피는 날. 썸이라면 가벼운 안부가, 연애라면 솔직한 한마디가 통해요.', score: 58, scoreLabel: '연애운' },
  { key: '재물운', title: '지키는 흐름', el: 'water', body: '즉흥 지출은 피하세요. 오늘 아낀 작은 돈이 이번 달의 균형을 잡아줘요. 투자 결정은 잠시 보류.', score: 49, scoreLabel: '재물운' },
];

interface Props { index?: number; onClose?: () => void; name?: string; }

export default function TodayStory({ index = 0, onClose, name = '아라' }: Props) {
  const [i, setI] = useState(index);
  const p = STORY_PAGES[i];
  const el = EL[p.el];
  const go = (d: number) => setI(v => Math.max(0, Math.min(STORY_PAGES.length - 1, v + d)));
  const circumference = 2 * Math.PI * 24;

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: `radial-gradient(circle at 50% 22%, ${el.soft}, transparent 55%), var(--bg)` }}>
      <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', gap: 5, zIndex: 3 }}>
        {STORY_PAGES.map((_, k) => (
          <div key={k} style={{ flex: 1, height: 2.5, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: k < i ? '100%' : k === i ? '62%' : '0%', background: 'var(--fg-1)', borderRadius: 2 }} />
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 28, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 10, zIndex: 3 }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(150deg, var(--clone-coral-200), var(--brand))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>{name[0]}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>{name}의 오늘</div>
          <div className="kicker" style={{ fontSize: 9 }}>05.{new Date().getDate()} · {p.key}</div>
        </div>
        <button onClick={onClose} className="icon-btn"><Icon name="x" size={22} /></button>
      </div>
      <button onClick={() => go(-1)} style={{ position: 'absolute', left: 0, top: 64, bottom: 0, width: '33%', zIndex: 2, background: 'transparent' }} />
      <button onClick={() => go(1)} style={{ position: 'absolute', right: 0, top: 64, bottom: 0, width: '33%', zIndex: 2, background: 'transparent' }} />
      <div key={i} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', animation: 'float-up .35s var(--ease-out-soft) both' }}>
        <div className="kicker" style={{ marginBottom: 16, color: el.color }}>{p.scoreLabel}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span className="glyph" style={{ fontSize: 30, color: el.color, lineHeight: 1 }}>{el.hanja}</span>
          <div style={{ width: 1, height: 28, background: 'var(--border)' }} />
          <span className="kicker" style={{ fontSize: 11 }}>{p.key}</span>
        </div>
        <h1 className="kr ed-display" style={{ fontSize: 40, margin: '0 0 22px', fontWeight: 400, color: 'var(--fg-2)' }}>{p.title}</h1>
        <p className="kr" style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg-2)', margin: '0 0 32px' }}>{p.body}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="var(--border)" strokeWidth="3" />
            <circle cx="28" cy="28" r="24" fill="none" stroke={el.color} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${(p.score / 100) * circumference} ${circumference}`} transform="rotate(-90 28 28)" />
          </svg>
          <div>
            <div className="ed-num" style={{ fontSize: 30, color: el.color, lineHeight: 1, fontWeight: 500 }}>{p.score}<span style={{ fontSize: 14, color: 'var(--fg-3)' }}> / 100</span></div>
            <div className="kicker" style={{ fontSize: 9.5, marginTop: 4 }}>{p.scoreLabel}</div>
          </div>
        </div>
      </div>
      <div className="kicker" style={{ position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center', fontSize: 9.5, color: 'var(--fg-4)', zIndex: 1 }}>
        좌 · 우를 탭해 넘겨보세요
      </div>
    </div>
  );
}
