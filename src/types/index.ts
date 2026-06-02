export interface UserProfile {
  name: string;
  birthDate: string;
  birthTime: string | null;
  gender: 'male' | 'female' | null;
  region: string;
  mbti: string;
  instagram: string;
  careerStatus: string;
  relationStatus: string;
  onboardingDone: boolean;
  mapOnboardingDone: boolean;
}

export interface TenGod {
  ko: string;
  hanja: string;
}

export interface SajuPillar {
  stem: string;
  branch: string;
  stemKo: string;
  branchKo: string;
  element: string;
  tenGodStem?: TenGod;
  tenGodBranch?: TenGod;
  hiddenStems?: string[];
  stage?: string;
  spirit?: string;
}

export type OhaengKey = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

export interface DaewoonStep {
  age: number;
  stem: string;
  branch: string;
  stemKo: string;
  branchKo: string;
  element: string;
  tenGod: string;
}

export interface SajuData {
  year: SajuPillar;
  month: SajuPillar;
  day: SajuPillar;
  hour: SajuPillar | null;
  ohaeng: {
    wood: number;
    fire: number;
    earth: number;
    metal: number;
    water: number;
  };
  counts: { wood: number; fire: number; earth: number; metal: number; water: number };
  strength: { score: number; label: '신강' | '중화' | '신약'; desc: string };
  yongshin: { element: OhaengKey; reason: string };
  daewoon: DaewoonStep[];
  dayMaster: { stem: string; ko: string; element: string };
}

export interface MapNode {
  id: string;
  kind: '진로' | '관계' | '상담';
  label: string;
  selected?: boolean;
  current?: boolean;
  small?: boolean;
  dim?: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
}

export type MapScreen =
  | 'map'
  | 'career'
  | 'relation'
  | 'scenario'
  | 'counsel'
  | 'compat'
  | 'chatsim'
  | 'result';

export type OnboardingStep =
  | 'splash'
  | 'name'
  | 'birth'
  | 'gender'
  | 'region'
  | 'receiving'
  | 'state'
  | 'loading'
  | 'done';
