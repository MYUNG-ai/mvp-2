'use client';

import { KIND } from '@/constants/saju';
import Icon from '@/components/ui/Icon';
import ManseryeokPanel from './ManseryeokPanel';
import TendencyRadar from './TendencyRadar';
import OhaengBalance from './saju/OhaengBalance';
import StrengthGauge from './saju/StrengthGauge';
import YongshinPanel from './saju/YongshinPanel';
import DaewoonTimeline from './saju/DaewoonTimeline';
import { useSaju } from '@/hooks/useSaju';
import { useUserStore } from '@/store/useUserStore';

function getAge(birthDate: string): number | null {
  if (!birthDate) return null;
  const [y, m, d] = birthDate.split('-').map(Number);
  if (!y || !m || !d) return null;
  const today = new Date();
  let age = today.getFullYear() - y;
  const beforeBirthday =
    today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d);
  if (beforeBirthday) age -= 1;
  return age;
}

function SajuInsights() {
  const { user } = useUserStore();
  const { data: saju } = useSaju();
  if (!user.birthDate || !saju) return null;
  const currentAge = getAge(user.birthDate);

  return (
    <>
      <div className="ed-head"><div className="kicker">오행 분포 · ELEMENTS</div><div className="line" /></div>
      <OhaengBalance counts={saju.counts} />

      <div className="ed-head" style={{ marginTop: 22 }}><div className="kicker">신강·신약 · STRENGTH</div><div className="line" /></div>
      <StrengthGauge score={saju.strength.score} label={saju.strength.label} desc={saju.strength.desc} />

      <div className="ed-head" style={{ marginTop: 22 }}><div className="kicker">용신 · USEFUL GOD</div><div className="line" /></div>
      <YongshinPanel element={saju.yongshin.element} reason={saju.yongshin.reason} />

      <div className="ed-head" style={{ marginTop: 22 }}><div className="kicker">대운 · LUCK CYCLES</div><div className="line" /></div>
      <DaewoonTimeline steps={saju.daewoon} currentAge={currentAge} />
    </>
  );
}

function MiniBars({ rows }: { rows: { k: string; v: number; color?: string }[] }) {
  const max = Math.max(...rows.map(r => r.v));
  return (
    <div className="stack" style={{ gap: 9 }}>
      {rows.map(r => (
        <div key={r.k} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 60, fontSize: 12, color: 'var(--fg-2)', fontWeight: 500 }}>{r.k}</div>
          <div style={{ flex: 1, height: 7, background: 'var(--bg-muted)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${(r.v / max) * 100}%`, height: '100%', background: r.color || 'var(--brand)', borderRadius: 4 }} />
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', width: 26, textAlign: 'right' }}>{r.v}</div>
        </div>
      ))}
    </div>
  );
}

function Gauge({ label, v, tone, note }: { label: string; v: number; tone: string; note: string }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontSize: 12.5, color: 'var(--fg-2)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: tone }}>{note}</span>
      </div>
      <div style={{ height: 6, background: 'var(--bg-muted)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${v}%`, height: '100%', background: tone, borderRadius: 3 }} />
      </div>
    </div>
  );
}

function PatternCard({ icon, iconTone, title, sub, children }: { icon: string; iconTone: string; title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="card ed" style={{ padding: 18, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: iconTone + '1f', color: iconTone, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name={icon} size={17} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{title}</div>
          <div className="kr" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 1 }}>{sub}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function MyDataView() {
  return (
    <div className="pad-x" style={{ paddingTop: 18, paddingBottom: 24 }}>
      <div className="ed-head">
        <div className="kicker">만세력 · 命</div>
        <div className="line" />
      </div>
      <div className="card ed" style={{ padding: 20, marginBottom: 26 }}>
        <ManseryeokPanel />
      </div>

      <SajuInsights />

      <div className="ed-head" style={{ marginTop: 26 }}><div className="kicker">성향맵 · TENDENCY</div><div className="line" /></div>
      <div className="kr serif" style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--fg-3)', margin: '-6px 0 12px' }}>대화로 클론이 파악한 성향</div>
      <div className="card ed" style={{ padding: '18px 16px 16px', marginBottom: 26 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><TendencyRadar /></div>
        <hr className="hr" style={{ margin: '14px 0' }} />
        <p className="kr" style={{ margin: 0, fontSize: 12.5, color: 'var(--fg-2)', lineHeight: 1.6 }}>
          <b style={{ color: 'var(--fg-1)' }}>사회적 민감성</b>이 높고 <b style={{ color: 'var(--fg-1)' }}>자극 추구</b>가 강한 확장형이에요. 관계에선 깊이보다 새로움에 끌리는 편.
        </p>
      </div>

      <div className="ed-head"><div className="kicker">패턴 분석 · PATTERNS</div><div className="line" /></div>
      <div className="kr serif" style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--fg-3)', margin: '-6px 0 12px' }}>맵·대화에 쌓인 데이터로 읽은 나</div>

      <PatternCard icon="branch" iconTone="#F4831B" title="선택 패턴" sub="고민 맵에 쌓인 10개 노드 기준">
        <MiniBars rows={[
          { k: '진로', v: 5, color: KIND.진로.color },
          { k: '관계', v: 3, color: KIND.관계.color },
          { k: '상담', v: 2, color: KIND.상담.color },
        ]} />
        <hr className="hr" style={{ margin: '14px 0' }} />
        <div style={{ display: 'flex', gap: 18 }}>
          <div style={{ flex: 1 }}>
            <div className="kicker" style={{ fontSize: 9, marginBottom: 6 }}>결정 성향</div>
            <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: '64%', background: 'var(--brand)' }} />
              <div style={{ width: '36%', background: 'var(--bg-muted)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 11, color: 'var(--fg-3)' }}>
              <span style={{ color: 'var(--brand)', fontWeight: 700 }}>도전 64</span><span>안정 36</span>
            </div>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div className="ed-num" style={{ fontSize: 26, color: 'var(--fg-1)', lineHeight: 1 }}>12</div>
            <div className="kicker" style={{ fontSize: 8.5, marginTop: 3 }}>노드 재방문</div>
          </div>
        </div>
      </PatternCard>

      <PatternCard icon="message" iconTone="#6E56CF" title="대화 패턴" sub="클론과 나눈 대화에서 추출">
        <div className="kicker" style={{ fontSize: 9, marginBottom: 8 }}>자주 등장한 키워드</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {[['이직', 1], ['번아웃', 0.8], ['관계', 0.7], ['미래', 0.6], ['돈', 0.5], ['휴식', 0.4]].map(([w, s]) => (
            <span key={w} className="chip" style={{ height: 30, fontSize: 13 - (1 - (s as number)) * 2, color: 'var(--clone-twin-600)', background: 'rgba(110,86,207,0.10)' }}>{w}</span>
          ))}
        </div>
        <div className="kicker" style={{ fontSize: 9, marginBottom: 8 }}>대화 시간대</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 44 }}>
          {[['오전', 0.3], ['점심', 0.5], ['오후', 0.45], ['저녁', 0.7], ['밤', 1], ['새벽', 0.6]].map(([t, h]) => (
            <div key={t} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: '100%', height: (h as number) * 32, background: h === 1 ? 'var(--clone-twin-500)' : 'rgba(110,86,207,0.25)', borderRadius: 3 }} />
              <span className="mono" style={{ fontSize: 8.5, color: 'var(--fg-4)' }}>{t}</span>
            </div>
          ))}
        </div>
      </PatternCard>

      <PatternCard icon="chart" iconTone="#2E7CF6" title="심리 패턴" sub="선택·대화·사주를 종합한 추정">
        <div className="stack" style={{ gap: 12 }}>
          <Gauge label="불안 수준" v={68} tone="var(--danger-500)" note="중상" />
          <Gauge label="자기효능감" v={54} tone="var(--warning-500)" note="보통" />
          <Gauge label="변화 수용도" v={78} tone="var(--success-500)" note="높음" />
          <Gauge label="관계 의존도" v={46} tone="var(--info-500)" note="중간" />
        </div>
        <hr className="hr" style={{ margin: '14px 0' }} />
        <p className="kr" style={{ margin: 0, fontSize: 12.5, color: 'var(--fg-2)', lineHeight: 1.6 }}>
          전환기의 불안이 높지만 변화를 받아들이는 힘이 커요. 결정 전 <b style={{ color: 'var(--fg-1)' }}>&apos;왜&apos;를 적어두는 습관</b>이 자기효능감을 끌어올려요.
        </p>
      </PatternCard>
    </div>
  );
}
