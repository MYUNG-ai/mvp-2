'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Tag = '진로' | '관계' | '상담';

export type MapFlow =
  | 'map'        // node map (main)
  | 'career'     // 진로: 고민카드 + 시나리오 선택
  | 'scenario'   // 진로: 시나리오 시뮬레이션
  | 'result'     // 진로: 결과 리포트
  | 'relation'   // 관계: 상대 선택
  | 'compat'     // 관계: 궁합 리포트
  | 'chatsim'    // 관계: 클론 채팅 시뮬레이션
  | 'counsel';   // 상담: 상담 리포트

export type ReportType = 'result' | 'compat' | 'counsel';

export interface WorryNode {
  id: string;
  kind: Tag;
  label: string;
  worry: string;
  reportType: ReportType;
  decision?: string;
  createdAt: number;
}

const reportFor = (tag: Tag): ReportType =>
  tag === '관계' ? 'compat' : tag === '상담' ? 'counsel' : 'result';

const entryFor = (tag: Tag): MapFlow =>
  tag === '관계' ? 'relation' : tag === '상담' ? 'counsel' : 'career';

const shortLabel = (worry: string): string => {
  const t = worry.trim().replace(/\s+/g, ' ');
  if (!t) return '새 고민';
  return t.length > 12 ? t.slice(0, 12) + '…' : t;
};

interface MapStore {
  flow: MapFlow;
  worry: string;
  tag: Tag | null;
  simKind: string;
  viewingSaved: boolean;
  nodes: WorryNode[];
  activeNodeId: string | null;

  setFlow: (flow: MapFlow) => void;
  startFlow: (tag: Tag, worry: string) => void;
  openReport: (kind: Tag, worry: string, nodeId?: string) => void;
  setSimKind: (kind: string) => void;
  saveCurrentNode: (decision?: string) => void;
  resetFlow: () => void;
  removeNode: (id: string) => void;
}

const SESSION = { flow: 'map' as MapFlow, worry: '', tag: null as Tag | null, viewingSaved: false, activeNodeId: null as string | null };

export const useMapStore = create<MapStore>()(
  persist(
    (set, get) => ({
      ...SESSION,
      simKind: '연애',
      nodes: [],

      setFlow: (flow) => set({ flow }),

      startFlow: (tag, worry) =>
        set({ tag, worry, viewingSaved: false, activeNodeId: null, flow: entryFor(tag) }),

      openReport: (kind, worry, nodeId) =>
        set({ tag: kind, worry, viewingSaved: true, activeNodeId: nodeId ?? null, flow: reportFor(kind) }),

      setSimKind: (simKind) => set({ simKind }),

      saveCurrentNode: (decision) => {
        const { tag, worry, viewingSaved, activeNodeId, nodes } = get();
        // Re-opening an already-saved node: just return to the map.
        if (viewingSaved || activeNodeId || !tag) {
          set({ ...SESSION });
          return;
        }
        const node: WorryNode = {
          id: `n_${Date.now().toString(36)}`,
          kind: tag,
          label: shortLabel(worry),
          worry,
          reportType: reportFor(tag),
          decision,
          createdAt: Date.now(),
        };
        set({ nodes: [...nodes, node], ...SESSION });
      },

      resetFlow: () => set({ ...SESSION }),

      removeNode: (id) => set((s) => ({ nodes: s.nodes.filter((n) => n.id !== id) })),
    }),
    {
      name: 'myung-ai-map',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ nodes: s.nodes, simKind: s.simKind }),
    }
  )
);
