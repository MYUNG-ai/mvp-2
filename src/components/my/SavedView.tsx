'use client';

import { useRouter } from 'next/navigation';
import { useMapStore, type Tag } from '@/store/useMapStore';
import { useHydrated } from '@/hooks/useHydrated';
import { KIND } from '@/constants/saju';
import Icon from '@/components/ui/Icon';

export default function SavedView() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { nodes, openReport } = useMapStore();

  const open = (kind: Tag, worry: string, id: string) => {
    openReport(kind, worry, id);
    router.push('/map');
  };

  if (!hydrated) return <div style={{ minHeight: 200 }} />;

  if (nodes.length === 0) {
    return (
      <div style={{ padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Icon name="bookmark" size={22} color="var(--fg-4)" />
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg-2)', marginBottom: 6 }}>저장된 리포트가 없어요</div>
        <div className="kr" style={{ fontSize: 13, color: 'var(--fg-4)', lineHeight: 1.5 }}>맵에서 시뮬레이션을 완료하면<br />결과를 여기에 저장할 수 있어요.</div>
      </div>
    );
  }

  return (
    <div className="pad-x" style={{ paddingTop: 18, paddingBottom: 24 }}>
      <div className="ed-head">
        <div className="kicker">저장된 리포트 · SAVED</div>
        <div className="line" />
      </div>
      <div className="stack" style={{ gap: 10 }}>
        {[...nodes].reverse().map((n) => {
          const kind = KIND[n.kind] || KIND.상담;
          return (
            <button key={n.id} onClick={() => open(n.kind, n.worry, n.id)} className="card ed" style={{ width: '100%', textAlign: 'left', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: kind.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={n.kind === '진로' ? 'branch' : n.kind === '관계' ? 'user' : 'message'} size={16} color={kind.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="kr" style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.label}</div>
                <div className="kr" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>
                  {n.decision ? `${n.decision} · ` : ''}{new Date(n.createdAt).toLocaleDateString('ko-KR')}
                </div>
              </div>
              <span className="chip" style={{ height: 22, fontSize: 10, background: kind.soft, color: kind.color, padding: '0 8px', flexShrink: 0 }}>{kind.label}</span>
              <Icon name="chevron-right" size={16} color="var(--fg-4)" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
