'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile } from '@/types';

interface UserStore {
  user: UserProfile;
  setName: (name: string) => void;
  setBirthDate: (date: string) => void;
  setBirthTime: (time: string | null) => void;
  setGender: (gender: 'male' | 'female' | null) => void;
  setRegion: (region: string) => void;
  setMbti: (mbti: string) => void;
  setInstagram: (insta: string) => void;
  setCareerStatus: (status: string) => void;
  setRelationStatus: (status: string) => void;
  completeOnboarding: () => void;
  completeMapOnboarding: () => void;
  reset: () => void;
}

const defaultUser: UserProfile = {
  name: '',
  birthDate: '',
  birthTime: null,
  gender: null,
  region: '',
  mbti: '',
  instagram: '',
  careerStatus: '',
  relationStatus: '',
  onboardingDone: false,
  mapOnboardingDone: false,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: defaultUser,
      setName: (name) => set((s) => ({ user: { ...s.user, name } })),
      setBirthDate: (birthDate) => set((s) => ({ user: { ...s.user, birthDate } })),
      setBirthTime: (birthTime) => set((s) => ({ user: { ...s.user, birthTime } })),
      setGender: (gender) => set((s) => ({ user: { ...s.user, gender } })),
      setRegion: (region) => set((s) => ({ user: { ...s.user, region } })),
      setMbti: (mbti) => set((s) => ({ user: { ...s.user, mbti } })),
      setInstagram: (instagram) => set((s) => ({ user: { ...s.user, instagram } })),
      setCareerStatus: (careerStatus) => set((s) => ({ user: { ...s.user, careerStatus } })),
      setRelationStatus: (relationStatus) => set((s) => ({ user: { ...s.user, relationStatus } })),
      completeOnboarding: () => set((s) => ({ user: { ...s.user, onboardingDone: true } })),
      completeMapOnboarding: () => set((s) => ({ user: { ...s.user, mapOnboardingDone: true } })),
      reset: () => set({ user: defaultUser }),
    }),
    { name: 'myung-ai-user' }
  )
);
