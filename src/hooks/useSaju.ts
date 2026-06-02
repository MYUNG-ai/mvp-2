'use client';

import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/store/useUserStore';
import { fetchSaju } from '@/services/sajuService';

export function useSaju() {
  const { user } = useUserStore();
  return useQuery({
    queryKey: ['saju', user.birthDate, user.birthTime],
    queryFn: () => fetchSaju({ birthDate: user.birthDate, birthTime: user.birthTime }),
    enabled: !!user.birthDate,
    staleTime: Infinity,
  });
}
