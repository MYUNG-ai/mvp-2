'use client';

import { useState } from 'react';
import { useMapStore, type Tag } from '@/store/useMapStore';
import { useHydrated } from '@/hooks/useHydrated';
import { KIND } from '@/constants/saju';
import Icon from '@/components/ui/Icon';
import NodeMap, { type OpenPayload } from './NodeMap';

const EXAMPLES: { t: string; k: Tag; w: string }[] = [
  { t: '개발자 취준, 프리랜서로 전향할까?', k: '진로', w: '개발자로 취업을 준비 중인데, 시장이 너무 빡빡해서 프리랜서로 전향하거나 기획 같은 다른 직군으로 옮겨야 할지 고민이에요.' },
  { t: '썸 타는 사람, 계속 만나도 될까?', k: '관계', w: '지금 썸 타는 사람이랑 만나도 괜찮을까? 대화 코드는 잘 맞는데, 표현이 너무 소극적이고 공감을 잘 해주는 편도 아니야.' },
  { t: '건강한 인간관계, 어떻게 유지하지?', k: '상담', w: '나이가 들수록 알던 사람을 챙기기에도 벅찬데, 가끔 소외되고 고립된 느낌이 들어요. 어떻게 건강한 관계를 유지할지 모르겠어요.' },
];

export default function MapScreen() {
  const hydrated = useHydrated();
  const { nodes, startFlow, openReport } = useMapStore();
  const [input, setInput] = useState('');
  const [tag, setTag] = useState<Tag | null>(null);

  const canSend = !!(tag || input.trim());

  const send = () => {
    if (!canSend) return;
    startFlow(tag || '상담', input.trim());
  };

  const openNode = (p: OpenPayload) => openReport(p.kind, p.worry, p.nodeId);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', background: '#000' }}>
      {/* Edge-to-edge galaxy background */}
      <div className="cosmic-bg" />
      <div className="cosmic-stars cosmic-twinkle" />

      <div className="scroll" style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <div style={{ padding: '18px 14px 4px' }}>
          <div className="kicker" style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: 6 }}>나의 고민 맵</div>
          {hydrated ? (
            <NodeMap userNodes={nodes} onOpen={openNode} />
          ) : (
            <div style={{ height: 320 }} />
          )}
        </div>

        <div style={{ padding: '6px 16px 18px' }}>
          <div className="kicker" style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 10 }}>시뮬레이션해볼 고민</div>
          <div className="stack" style={{ gap: 8 }}>
            {EXAMPLES.map((e, i) => {
              const k = KIND[e.k];
              return (
                <button
                  key={i}
                  onClick={() => startFlow(e.k, e.w)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', textAlign: 'left', width: '100%', borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                >
                  <span style={{ fontSize: 9, fontWeight: 700, color: k.color, letterSpacing: '0.06em', width: 30, flexShrink: 0 }}>{e.k}</span>
                  <span style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.18)', flexShrink: 0 }} />
                  <span className="kr" style={{ flex: 1, fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.92)' }}>{e.t}</span>
                  <Icon name="sparkles" size={16} color="rgba(255,255,255,0.5)" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Composer — sits above the fixed tab bar */}
      <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 14px 4px' }}>
          {(['진로', '관계', '상담'] as const).map((c) => {
            const on = tag === c;
            const k = KIND[c];
            return (
              <button key={c} onClick={() => setTag(on ? null : c)} style={{ height: 30, padding: '0 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5, background: on ? k.color : 'rgba(255,255,255,0.08)', color: on ? '#fff' : 'rgba(255,255,255,0.7)', border: `1.5px solid ${on ? k.color : 'transparent'}` }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: on ? '#fff' : k.color }} />
                {c}
              </button>
            );
          })}
        </div>
        <div style={{ padding: '6px 12px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', minHeight: 44, background: 'rgba(255,255,255,0.10)', borderRadius: 22 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder={tag ? `${tag} 고민을 입력하세요` : '카테고리 선택 후 고민 입력해주세요'}
              style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 14, color: '#fff', padding: '10px 0' }}
            />
          </div>
          <button onClick={send} disabled={!canSend} style={{ width: 44, height: 44, borderRadius: 22, background: canSend ? 'var(--brand)' : 'rgba(255,255,255,0.10)', color: canSend ? '#fff' : 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: canSend ? 'var(--shadow-brand)' : 'none', cursor: canSend ? 'pointer' : 'not-allowed', transition: 'all .15s' }}>
            <Icon name="send" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
