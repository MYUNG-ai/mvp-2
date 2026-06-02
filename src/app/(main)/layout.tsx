import { ReactNode } from 'react';
import MobileContainer from '@/components/layout/MobileContainer';
import MainShell from '@/components/layout/MainShell';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <MobileContainer>
      <MainShell>{children}</MainShell>
    </MobileContainer>
  );
}
