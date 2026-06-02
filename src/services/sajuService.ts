import { calculateSaju } from '@/lib/saju';
import type { SajuData } from '@/types';

export interface SajuRequest {
  birthDate: string;
  birthTime: string | null;
}

// Mock implementation. Swap the body for a real `fetch('/api/saju', ...)`
// call once the backend Calendar/Myeongri engines are available — the
// hook and component contracts stay the same.
export async function fetchSaju({ birthDate, birthTime }: SajuRequest): Promise<SajuData> {
  return calculateSaju(birthDate, birthTime);
}
