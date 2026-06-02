'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import MobileContainer from '@/components/layout/MobileContainer';
import OnbSplash from './OnbSplash';
import OnbName from './OnbName';
import OnbBirth from './OnbBirth';
import OnbGender from './OnbGender';
import OnbRegion from './OnbRegion';
import OnbReceiving from './OnbReceiving';

// Steps 1–5 = initial onboarding (splash, name, birth, gender, region).
// Step 6 = 명(命) receiving loading screen → sends entry notification → enters /os.
// Steps 7–8 (state input + clone-creation loading) live on first map-tab entry.
type Step = 'splash' | 'name' | 'birth' | 'gender' | 'region' | 'receiving';

export default function OnboardingFlow() {
  const router = useRouter();
  const { user, completeOnboarding } = useUserStore();
  const [step, setStep] = useState<Step>('splash');

  useEffect(() => {
    if (user.onboardingDone) {
      router.replace('/os');
    }
  }, [user.onboardingDone, router]);

  const next = (nextStep: Step) => setStep(nextStep);

  const handleReceivingDone = () => {
    completeOnboarding();
    router.push('/os');
  };

  return (
    <MobileContainer>
      {step === 'splash' && <OnbSplash onNext={() => next('name')} />}
      {step === 'name' && <OnbName onNext={() => next('birth')} />}
      {step === 'birth' && <OnbBirth onNext={() => next('gender')} onBack={() => next('name')} />}
      {step === 'gender' && <OnbGender onNext={() => next('region')} onBack={() => next('birth')} />}
      {step === 'region' && <OnbRegion onNext={() => next('receiving')} onBack={() => next('gender')} />}
      {step === 'receiving' && <OnbReceiving onDone={handleReceivingDone} />}
    </MobileContainer>
  );
}
