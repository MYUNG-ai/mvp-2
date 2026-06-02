'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import MobileContainer from '@/components/layout/MobileContainer';

export default function RootPage() {
  const router = useRouter();
  const onboardingDone = useUserStore((s) => s.user.onboardingDone);

  useEffect(() => {
    router.replace(onboardingDone ? '/os' : '/onboarding');
  }, [onboardingDone, router]);

  return (
    <MobileContainer>
      <div
        style={{
          flex: 1,
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg)',
        }}
      >
        <div className="glyph" style={{ fontSize: 56, color: 'var(--brand)', opacity: 0.9 }}>命</div>
      </div>
    </MobileContainer>
  );
}
