'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useMapStore } from '@/store/useMapStore';
import { useUserStore } from '@/store/useUserStore';
import { useHydrated } from '@/hooks/useHydrated';
import TabBar from './TabBar';

export default function MainShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const flow = useMapStore((s) => s.flow);
  const mapOnboardingDone = useUserStore((s) => s.user.mapOnboardingDone);

  const onMap = pathname.startsWith('/map');
  // Map sub-flows and the first-entry map onboarding take over the full screen.
  // Gate on hydration so server and first client render agree (persisted state
  // is only known on the client).
  const immersive = hydrated && onMap && (flow !== 'map' || !mapOnboardingDone);

  return (
    <>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: immersive ? 0 : 'calc(var(--tabbar-h) + env(safe-area-inset-bottom, 0px))',
        }}
      >
        {children}
      </div>
      <TabBar hidden={immersive} />
    </>
  );
}
