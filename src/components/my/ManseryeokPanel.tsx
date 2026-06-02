'use client';

import { useUserStore } from '@/store/useUserStore';
import { useSaju } from '@/hooks/useSaju';
import { EL, STEMS, STEM_ELEMENTS, ELEMENT_MAP } from '@/constants/saju';
import type { SajuPillar } from '@/types';

function hiddenStemColor(stem: string): string {
  const el = ELEMENT_MAP[STEM_ELEMENTS[STEMS.indexOf(stem)]];
  return (EL[el] || EL.earth).color;
}

interface ColumnDef {
  pillar: SajuPillar | null;
  label: string; // 시주/일주/월주/년주
  ko: string;    // 시 日 월 년 kicker
  isDay: boolean;
}

function Chip({ text, tone }: { text: string; tone?: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 18,
        padding: '0 6px',
        borderRadius: 5,
        background: 'var(--bg-muted)',
        border: '1px solid var(--border)',
        fontSize: 10,
        color: tone || 'var(--fg-3)',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  );
}

function EmptyColumn({ col }: { col: ColumnDef }) {
  const rowGap = { display: 'flex', flexDirection: 'column' as const, alignItems: 'center' as const, gap: 8 };
  return (
    <div style={{ ...rowGap, flex: 1, minWidth: 0 }}>
      <div className="kicker" style={{ fontSize: 8 }}>{col.label}</div>
      <div style={{ fontSize: 10, color: 'var(--fg-4)' }}>—</div>
      <div className="glyph" style={{ fontSize: 30, color: 'var(--fg-4)', lineHeight: 1 }}>—</div>
      <div style={{ width: 40, height: 40, borderRadius: 10, border: '1px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-4)' }}>—</div>
      <div style={{ fontSize: 9, color: 'var(--fg-4)' }}>—</div>
    </div>
  );
}

function Column({ col }: { col: ColumnDef }) {
  if (!col.pillar) return <EmptyColumn col={col} />;
  const p = col.pillar;
  const stemEl = EL[p.element] || EL.earth;
  const hidden = p.hiddenStems || [];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        flex: 1,
        minWidth: 0,
        position: 'relative',
        padding: '8px 2px',
        borderRadius: 12,
        background: col.isDay ? 'var(--brand-soft)' : 'transparent',
        borderTop: col.isDay ? '2px solid var(--brand)' : '2px solid transparent',
      }}
    >
      {/* 1. 기둥 label */}
      <div className="kicker" style={{ fontSize: 8, color: col.isDay ? 'var(--brand)' : undefined }}>{col.label}</div>

      {/* 2. 십성 of stem */}
      <div style={{ fontSize: 10, fontWeight: 600, color: col.isDay ? 'var(--brand)' : 'var(--fg-2)', height: 13 }}>
        {col.isDay ? '일간(我)' : p.tenGodStem?.ko}
      </div>

      {/* 3. 천간 glyph */}
      <div className="glyph" style={{ fontSize: 30, color: stemEl.color, lineHeight: 1 }}>{p.stem}</div>

      {/* 4. 지지 in rounded square */}
      <div style={{ width: 40, height: 40, borderRadius: 10, background: stemEl.soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="glyph" style={{ fontSize: 22, color: stemEl.color }}>{p.branch}</span>
      </div>

      {/* korean reading */}
      <div style={{ fontSize: 9, color: 'var(--fg-4)', lineHeight: 1.3 }}>{p.stemKo}{p.branchKo}</div>

      {/* 5. 지장간 */}
      <div style={{ display: 'flex', gap: 2, minHeight: 14 }}>
        {hidden.map((h, i) => (
          <span key={i} className="glyph" style={{ fontSize: 11, color: hiddenStemColor(h) }}>{h}</span>
        ))}
      </div>

      {/* 6. 십성 of branch main hidden stem */}
      <div style={{ fontSize: 9.5, color: 'var(--fg-3)', height: 12 }}>{p.tenGodBranch?.ko}</div>

      {/* 7. 12운성 */}
      <Chip text={p.stage || '—'} />

      {/* 8. 12신살 */}
      <Chip text={p.spirit || '—'} />
    </div>
  );
}

export default function ManseryeokPanel() {
  const { user } = useUserStore();
  const { data: saju } = useSaju();

  if (!user.birthDate || !saju) {
    return (
      <div className="kr" style={{ color: 'var(--fg-3)', fontSize: 14, textAlign: 'center', padding: '20px 0' }}>
        생년월일을 입력하면 만세력이 표시돼요.
      </div>
    );
  }

  const columns: ColumnDef[] = [
    { pillar: saju.hour, label: '시주', ko: '時', isDay: false },
    { pillar: saju.day, label: '일주', ko: '日', isDay: true },
    { pillar: saju.month, label: '월주', ko: '月', isDay: false },
    { pillar: saju.year, label: '년주', ko: '年', isDay: false },
  ];

  return (
    <div>
      {/* row labels (sidebar of meanings) */}
      <div style={{ display: 'flex', gap: 4, alignItems: 'stretch' }}>
        {columns.map((c, i) => (
          <Column key={i} col={c} />
        ))}
      </div>
      <div className="kr" style={{ marginTop: 10, fontSize: 10.5, color: 'var(--fg-4)', textAlign: 'center', lineHeight: 1.5 }}>
        천간·지지 · 지장간 · 십성 · 12운성 · 12신살
      </div>
    </div>
  );
}
