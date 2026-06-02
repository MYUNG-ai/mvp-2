'use client';

import { KIND } from '@/constants/saju';
import type { WorryNode, Tag } from '@/store/useMapStore';

export interface OpenPayload { kind: Tag; worry: string; nodeId?: string; }

interface Props {
  userNodes: WorryNode[];
  onOpen: (p: OpenPayload) => void;
}

interface SpineNode {
  id: string;
  kind: Tag;
  label: string;
  worry: string;
  nodeId?: string;       // present only for user-saved nodes
  alt?: string;          // not-chosen alternative label
}

// Seed "past" journey so the map reads as an accumulated timeline for new users.
const SEED: SpineNode[] = [
  { id: 'seed1', kind: '진로', label: '이직 고민', worry: '지금 이직을 해야 할까? 연봉은 오르지만 팀이 바뀌는 게 불안해요.', alt: '남는다' },
  { id: 'seed2', kind: '상담', label: '번아웃', worry: '요즘 번아웃이 온 것 같아요. 일에 의미를 못 느끼겠어요.', alt: '버틴다' },
  { id: 'seed3', kind: '관계', label: '연애 고민', worry: '지금 썸 타는 사람이랑 만나도 괜찮을까? 표현이 소극적이고 공감도 적은 편이야.', alt: '고백' },
];

const reportKindFromNode = (n: WorryNode): Tag => n.kind;

const W = 340;
const cx = W / 2;
const TOP = 26;
const STEP = 62;

interface Placed extends SpineNode {
  x: number; y: number; w: number; h: number; current: boolean;
}

function buildBoundary(x: number, y: number, w: number, h: number, tx: number, ty: number): [number, number] {
  const ang = Math.atan2(ty - y, tx - x);
  const rx = w / 2 + 4, ry = h / 2 + 4;
  const t = 1 / Math.hypot(Math.cos(ang) / rx, Math.sin(ang) / ry);
  return [x + t * Math.cos(ang), y + t * Math.sin(ang)];
}

export default function NodeMap({ userNodes, onOpen }: Props) {
  const spine: SpineNode[] = [
    ...SEED,
    ...userNodes.map((n) => ({ id: n.id, kind: reportKindFromNode(n), label: n.label, worry: n.worry, nodeId: n.id })),
  ];

  const placed: Placed[] = spine.map((s, i) => {
    const current = i === spine.length - 1;
    return {
      ...s,
      x: cx,
      y: TOP + (i + 1) * STEP,
      w: current ? 112 : Math.max(58, s.label.length * 13 + 22),
      h: current ? 42 : 26,
      current,
    };
  });

  const root = { x: cx, y: TOP, w: 30, h: 30 };
  const last = placed[placed.length - 1];
  const H = (last ? last.y : TOP) + 96;

  // Edges: root → first, then chain; plus dashed alternative / future branches.
  const solidEdges: Array<[{ x: number; y: number; w: number; h: number }, { x: number; y: number; w: number; h: number }]> = [];
  let prev = root;
  for (const p of placed) {
    solidEdges.push([prev, p]);
    prev = p;
  }

  interface Branch { x: number; y: number; w: number; h: number; label: string; fromX: number; fromY: number; fromW: number; fromH: number; }
  const branches: Branch[] = [];
  placed.forEach((p, i) => {
    if (p.current) {
      // two future hints below current
      branches.push({ x: cx - 84, y: p.y + 52, w: 56, h: 24, label: '다른 선택', fromX: p.x, fromY: p.y, fromW: p.w, fromH: p.h });
      branches.push({ x: cx + 84, y: p.y + 52, w: 56, h: 24, label: '기다림', fromX: p.x, fromY: p.y, fromW: p.w, fromH: p.h });
    } else if (p.alt) {
      const side = i % 2 === 0 ? 1 : -1;
      branches.push({ x: cx + side * 104, y: p.y - 18, w: 54, h: 24, label: p.alt, fromX: p.x, fromY: p.y, fromW: p.w, fromH: p.h });
    }
  });

  return (
    <div style={{ position: 'relative', width: '100%', height: H, margin: '0 auto', maxWidth: W }}>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        {branches.map((b, i) => {
          const [sx, sy] = buildBoundary(b.fromX, b.fromY, b.fromW, b.fromH, b.x, b.y);
          const [ex, ey] = buildBoundary(b.x, b.y, b.w, b.h, b.fromX, b.fromY);
          const my = (sy + ey) / 2;
          return (
            <path key={`b${i}`} d={`M ${sx} ${sy} C ${sx} ${my}, ${ex} ${my}, ${ex} ${ey}`} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth={1.4} strokeDasharray="4 4" strokeLinecap="round" />
          );
        })}
        {solidEdges.map(([a, b], i) => {
          const [sx, sy] = buildBoundary(a.x, a.y, a.w, a.h, b.x, b.y);
          const [ex, ey] = buildBoundary(b.x, b.y, b.w, b.h, a.x, a.y);
          const my = (sy + ey) / 2;
          return (
            <path key={`s${i}`} d={`M ${sx} ${sy} C ${sx} ${my}, ${ex} ${my}, ${ex} ${ey}`} fill="none" stroke="var(--brand)" strokeWidth={2} strokeLinecap="round" opacity={0.9} />
          );
        })}
      </svg>

      {/* root */}
      <div style={{ position: 'absolute', left: '50%', top: root.y, transform: 'translate(-50%,-50%)' }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, var(--clone-coral-200), var(--brand))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 11, boxShadow: 'var(--shadow-brand)', border: '2px solid #000' }}>나</div>
      </div>

      {/* branches (dashed, non-clickable hints) */}
      {branches.map((b, i) => (
        <div key={`bl${i}`} style={{ position: 'absolute', left: `${(b.x / W) * 100}%`, top: b.y, transform: 'translate(-50%,-50%)' }}>
          <div style={{ padding: '4px 10px', borderRadius: 9, fontSize: 10.5, fontWeight: 600, whiteSpace: 'nowrap', color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.05)', border: '1.5px dashed rgba(255,255,255,0.28)' }}>{b.label}</div>
        </div>
      ))}

      {/* spine nodes */}
      {placed.map((p) => {
        const k = KIND[p.kind];
        return (
          <div key={p.id} style={{ position: 'absolute', left: '50%', top: p.y, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <button
              onClick={() => onOpen({ kind: p.kind, worry: p.worry, nodeId: p.nodeId })}
              style={{
                padding: p.current ? '11px 20px' : '5px 12px',
                borderRadius: p.current ? 15 : 9,
                fontSize: p.current ? 16 : 11.5,
                fontWeight: p.current ? 700 : 600,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                background: p.current ? k.color : k.color + '2e',
                color: '#fff',
                border: p.current ? 'none' : `1.5px solid ${k.color}99`,
                boxShadow: p.current ? `0 8px 22px ${k.color}66` : 'none',
              }}
            >
              {p.label}
            </button>
            {p.current && <div className="kicker" style={{ fontSize: 8.5, color: 'var(--brand)', letterSpacing: '0.14em', marginTop: 1 }}>NOW</div>}
          </div>
        );
      })}
    </div>
  );
}
