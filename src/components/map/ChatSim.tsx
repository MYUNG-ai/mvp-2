'use client';

import { useState, useRef, useEffect } from 'react';
import { EL } from '@/constants/saju';
import Icon from '@/components/ui/Icon';
import TwinSpark from '@/components/ui/TwinSpark';

interface Message { who: 'me' | 'them'; t: string; }
interface Partner { name: string; el: string; g: string; }
interface Props { onBack: () => void; onClose?: () => void; kind?: string; partner?: Partner; }

const SEED: Message[] = [
  { who: 'them', t: '아라야, 오늘 하루 어땠어?' },
  { who: 'me', t: '그냥 그랬어… 요즘 우리 사이 좀 애매한 것 같아서.' },
  { who: 'them', t: '무슨 일 있었어? 말 안 해도 돼, 근데 저녁은 먹었어? 안 먹었으면 데리러 갈게.' },
  { who: 'me', t: '(또 위로 대신 밥 얘기네… 내 마음은 안 궁금한가?)' },
  { who: 'them', t: '사실 너 요즘 힘들어 보여서 계속 신경 쓰였어. 어떻게 말 꺼낼지 몰라서 그냥 챙기기만 했어.' },
  { who: 'me', t: '우리 계속 이렇게 만나도 괜찮을까?' },
  { who: 'them', t: '난 너랑 더 가까워지고 싶어. 표현이 서툴러서 그렇지, 마음은 늘 너한테 가 있어. 천천히 가보자.' },
];

export default function ChatSim({ onBack, onClose, kind = '연애', partner = { name: '지원', el: 'fire', g: '丙' } }: Props) {
  const el = EL[partner.el] || EL.fire;
  const [revealed, setRevealed] = useState(1);
  const [extra, setExtra] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const seedDone = revealed >= SEED.length;
  const msgs = [...SEED.slice(0, revealed), ...extra];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [revealed, extra]);

  const send = () => {
    const v = text.trim();
    if (!v) return;
    setText('');
    setExtra((m) => [...m, { who: 'me', t: v }]);
    setTimeout(() => setExtra((m) => [...m, { who: 'them', t: '응, 무슨 말인지 알 것 같아. 같이 생각해보자.' }]), 600);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="app-header">
        <div className="left"><button className="icon-btn" onClick={onBack}><Icon name="chevron-left" size={22} /></button></div>
        <div className="title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 28, height: 28, borderRadius: '50%', background: el.soft, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="glyph" style={{ fontSize: 14, color: el.color }}>{partner.g}</span>
          </span>
          <span>{partner.name}</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--clone-twin-600)', background: 'rgba(110,86,207,0.12)', padding: '2px 6px', borderRadius: 4 }}>클론</span>
        </div>
        <div className="right"><button className="icon-btn" onClick={onClose || onBack}><Icon name="x" size={22} /></button></div>
      </div>
      <div style={{ padding: '10px 16px', background: 'var(--brand-soft)', borderBottom: '1px solid var(--divider)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name={kind === '대화' ? 'message' : kind === '결혼' ? 'sparkles' : 'heart'} size={15} color="var(--brand)" />
        <span className="kr" style={{ fontSize: 12, color: 'var(--brand)', fontWeight: 600 }}>{kind} 시뮬레이션 · {partner.name}의 클론과 대화 중</span>
      </div>
      <div ref={scrollRef} className="scroll" style={{ flex: 1, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.map((m, i) =>
          m.who === 'them' ? (
            <div key={i} className={i === revealed - 1 && !extra.length ? 'animate-float-up' : undefined} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', maxWidth: '82%' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: el.soft, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="glyph" style={{ fontSize: 14, color: el.color }}>{partner.g}</span>
              </div>
              <div className="kr" style={{ padding: '10px 13px', borderRadius: '4px 16px 16px 16px', background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 14, lineHeight: 1.45 }}>{m.t}</div>
            </div>
          ) : (
            <div key={i} style={{ alignSelf: 'flex-end', maxWidth: '82%' }}>
              <div className="kr" style={{ padding: '10px 13px', borderRadius: '16px 4px 16px 16px', background: 'var(--brand)', color: '#fff', fontSize: 14, lineHeight: 1.45 }}>{m.t}</div>
            </div>
          )
        )}
        {seedDone && (
          <div className="card clone-card animate-float-up" style={{ marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <TwinSpark size={15} />
              <div className="eyebrow" style={{ color: 'var(--clone-twin-500)' }}>방금 대화에서 보이세요?</div>
            </div>
            <p className="kr" style={{ margin: 0, fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.65 }}>
              지원의 클론은 &quot;힘들어 보여서 계속 신경 썼다&quot;고 했어요. 다만 그걸 말이 아니라 <b style={{ color: 'var(--fg-1)' }}>&apos;밥 챙기기&apos;로 표현</b>했던 거예요. <span className="glyph">丙</span>火는 위로를 <b style={{ color: 'var(--fg-1)' }}>행동</b>으로 줘요.
            </p>
          </div>
        )}
      </div>
      {seedDone ? (
        <div style={{ padding: '10px 12px calc(14px + env(safe-area-inset-bottom, 0px))', borderTop: '1px solid var(--divider)', background: 'var(--surface)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 14px', minHeight: 44, background: 'var(--bg-muted)', borderRadius: 22 }}>
            <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder={`${partner.name}에게 메시지…`} style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 14, color: 'var(--fg-1)', padding: '10px 0' }} />
          </div>
          <button onClick={send} style={{ width: 44, height: 44, borderRadius: 22, background: text.trim() ? 'var(--brand)' : 'var(--bg-muted)', color: text.trim() ? '#fff' : 'var(--fg-4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: text.trim() ? 'var(--shadow-brand)' : 'none', transition: 'all .15s' }}>
            <Icon name="send" size={20} />
          </button>
        </div>
      ) : (
        <div style={{ padding: '12px 16px calc(16px + env(safe-area-inset-bottom, 0px))', borderTop: '1px solid var(--divider)', background: 'var(--surface)' }}>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setRevealed((r) => Math.min(SEED.length, r + 1))}>
            다음 <Icon name="arrow-right" size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
