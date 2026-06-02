'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { useMapStore } from '@/store/useMapStore';
import { useHydrated } from '@/hooks/useHydrated';
import MapScreen from './MapScreen';
import CareerEntry from './CareerEntry';
import ScenarioSim from './ScenarioSim';
import ResultReport from './ResultReport';
import RelationEntry from './RelationEntry';
import CompatReport from './CompatReport';
import ChatSim from './ChatSim';
import CounselReport from './CounselReport';
import OnbMapState from '@/components/onboarding/OnbMapState';
import OnbMapLoading from '@/components/onboarding/OnbMapLoading';

export default function MapPageClient() {
  const hydrated = useHydrated();
  const { user, completeMapOnboarding } = useUserStore();
  const { flow, simKind, viewingSaved, setFlow, resetFlow, setSimKind, saveCurrentNode } = useMapStore();
  const [onbStep, setOnbStep] = useState<'state' | 'loading'>('state');

  // Avoid hydration mismatch: persisted onboarding/node state is only known on the client.
  if (!hydrated) {
    return <div style={{ flex: 1, background: '#000' }} />;
  }

  if (!user.mapOnboardingDone) {
    if (onbStep === 'state') return <OnbMapState onNext={() => setOnbStep('loading')} />;
    return <OnbMapLoading onDone={() => { completeMapOnboarding(); setOnbStep('state'); }} />;
  }

  switch (flow) {
    case 'career':
      return <CareerEntry onNext={() => setFlow('scenario')} onBack={resetFlow} />;
    case 'scenario':
      return <ScenarioSim onNext={() => setFlow('result')} onBack={() => setFlow('career')} />;
    case 'result':
      return (
        <ResultReport
          saved={viewingSaved}
          onSave={(decision) => saveCurrentNode(decision)}
          onBack={() => (viewingSaved ? resetFlow() : setFlow('scenario'))}
          onClose={resetFlow}
        />
      );
    case 'relation':
      return <RelationEntry onNext={() => setFlow('compat')} onBack={resetFlow} />;
    case 'compat':
      return (
        <CompatReport
          saved={viewingSaved}
          onSave={() => saveCurrentNode()}
          onSim={(k) => { setSimKind(k); setFlow('chatsim'); }}
          onBack={() => (viewingSaved ? resetFlow() : setFlow('relation'))}
          onClose={resetFlow}
        />
      );
    case 'chatsim':
      return <ChatSim onBack={() => setFlow('compat')} onClose={resetFlow} kind={simKind} />;
    case 'counsel':
      return (
        <CounselReport
          saved={viewingSaved}
          onSave={() => saveCurrentNode()}
          onBack={resetFlow}
          onClose={resetFlow}
        />
      );
    default:
      return <MapScreen />;
  }
}
