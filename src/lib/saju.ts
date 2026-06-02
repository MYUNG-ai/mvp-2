import {
  STEMS, STEMS_KO, BRANCHES, BRANCHES_KO,
  STEM_ELEMENTS, BRANCH_ELEMENTS, ELEMENT_MAP,
  HIDDEN_STEMS, TEN_GODS_KO, TWELVE_STAGES, STAGE_START,
  TWELVE_SPIRITS, SPIRIT_START
} from '@/constants/saju';
import type { SajuData, SajuPillar, TenGod, OhaengKey, DaewoonStep } from '@/types';

// stem(한자) → element key
function stemElement(stem: string): OhaengKey {
  return ELEMENT_MAP[STEM_ELEMENTS[STEMS.indexOf(stem)]] as OhaengKey;
}
// stem(한자) yin/yang: even index = 陽(yang) → true
function isYang(stem: string): boolean {
  return STEMS.indexOf(stem) % 2 === 0;
}

// generating cycle (生): 木→火→土→金→水→木
const GEN_NEXT: Record<OhaengKey, OhaengKey> = {
  wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood',
};
// controlling cycle (剋): 木→土→水→火→金→木
const CTRL_NEXT: Record<OhaengKey, OhaengKey> = {
  wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood',
};

// ── 십성 (Ten Gods): relation of `otherStem` to day master `dayStem`
export function tenGod(dayStem: string, otherStem: string): TenGod {
  const dm = stemElement(dayStem);
  const ot = stemElement(otherStem);
  const samePolarity = isYang(dayStem) === isYang(otherStem);
  let hanja: string;
  if (ot === dm) {
    hanja = samePolarity ? '比肩' : '劫財';
  } else if (GEN_NEXT[dm] === ot) {
    // DM generates (I produce) → 식상
    hanja = samePolarity ? '食神' : '傷官';
  } else if (CTRL_NEXT[dm] === ot) {
    // DM controls (I control) → 재성
    hanja = samePolarity ? '偏財' : '正財';
  } else if (CTRL_NEXT[ot] === dm) {
    // other controls DM (controls me) → 관성
    hanja = samePolarity ? '偏官' : '正官';
  } else {
    // other generates DM (produces me) → 인성
    hanja = samePolarity ? '偏印' : '正印';
  }
  return { ko: TEN_GODS_KO[hanja], hanja };
}

// main hidden stem (정기 = last) of a branch
function mainHidden(branch: string): string {
  const arr = HIDDEN_STEMS[branch];
  return arr ? arr[arr.length - 1] : branch;
}

// ── 12운성 (Twelve Life Stages): day stem against a branch
export function twelveStage(dayStem: string, branch: string): string {
  const start = STAGE_START[dayStem];
  const startIdx = BRANCHES.indexOf(start);
  const branchIdx = BRANCHES.indexOf(branch);
  const forward = isYang(dayStem);
  const steps = forward
    ? ((branchIdx - startIdx) % 12 + 12) % 12
    : ((startIdx - branchIdx) % 12 + 12) % 12;
  return TWELVE_STAGES[steps];
}

// ── 12신살 (Twelve Spirits): year branch group against a branch
export function twelveSpirit(yearBranch: string, branch: string): string {
  const start = SPIRIT_START[yearBranch];
  const startIdx = BRANCHES.indexOf(start);
  const branchIdx = BRANCHES.indexOf(branch);
  const steps = ((branchIdx - startIdx) % 12 + 12) % 12;
  return TWELVE_SPIRITS[steps];
}

function getYearPillar(year: number): SajuPillar {
  const stemIdx = ((year - 4) % 10 + 10) % 10;
  const branchIdx = ((year - 4) % 12 + 12) % 12;
  return {
    stem: STEMS[stemIdx],
    branch: BRANCHES[branchIdx],
    stemKo: STEMS_KO[stemIdx],
    branchKo: BRANCHES_KO[branchIdx],
    element: ELEMENT_MAP[STEM_ELEMENTS[stemIdx]],
  };
}

function getMonthPillar(year: number, month: number): SajuPillar {
  const solarMonthStart = [6, 4, 6, 5, 6, 6, 7, 8, 8, 8, 7, 7];
  const branchBase = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1];
  const yearStemIdx = ((year - 4) % 10 + 10) % 10;
  const monthOffset = (yearStemIdx % 5) * 2;
  const branchIdx = branchBase[month - 1];
  const stemIdx = (monthOffset + branchIdx) % 10;
  void solarMonthStart;
  return {
    stem: STEMS[stemIdx],
    branch: BRANCHES[branchIdx],
    stemKo: STEMS_KO[stemIdx],
    branchKo: BRANCHES_KO[branchIdx],
    element: ELEMENT_MAP[STEM_ELEMENTS[stemIdx]],
  };
}

function getDayPillar(year: number, month: number, day: number): SajuPillar {
  const refYear = 2020, refMonth = 1, refDay = 1;
  const refStem = 6, refBranch = 6;
  function julianDay(y: number, m: number, d: number): number {
    const a = Math.floor((14 - m) / 12);
    const yy = y + 4800 - a;
    const mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
  }
  const refJD = julianDay(refYear, refMonth, refDay);
  const targetJD = julianDay(year, month, day);
  const diff = targetJD - refJD;
  const stemIdx = ((refStem + diff) % 10 + 10) % 10;
  const branchIdx = ((refBranch + diff) % 12 + 12) % 12;
  return {
    stem: STEMS[stemIdx],
    branch: BRANCHES[branchIdx],
    stemKo: STEMS_KO[stemIdx],
    branchKo: BRANCHES_KO[branchIdx],
    element: ELEMENT_MAP[STEM_ELEMENTS[stemIdx]],
  };
}

function getHourPillar(hour: number, dayStemIdx: number): SajuPillar {
  const branchIdx = Math.floor(((hour + 1) % 24) / 2);
  const stemBase = (dayStemIdx % 5) * 2;
  const stemIdx = (stemBase + branchIdx) % 10;
  return {
    stem: STEMS[stemIdx],
    branch: BRANCHES[branchIdx],
    stemKo: STEMS_KO[stemIdx],
    branchKo: BRANCHES_KO[branchIdx],
    element: ELEMENT_MAP[STEM_ELEMENTS[stemIdx]],
  };
}

function calcOhaeng(pillars: SajuPillar[]): Record<string, number> {
  const counts: Record<string, number> = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  for (const p of pillars) {
    const si = STEMS.indexOf(p.stem);
    const bi = BRANCHES.indexOf(p.branch);
    const se = ELEMENT_MAP[STEM_ELEMENTS[si]];
    const be = ELEMENT_MAP[BRANCH_ELEMENTS[bi]];
    if (se) counts[se] = (counts[se] || 0) + 1;
    if (be) counts[be] = (counts[be] || 0) + 1;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  const pct: Record<string, number> = {};
  for (const k of Object.keys(counts)) {
    pct[k] = Math.round((counts[k] / total) * 100);
  }
  return pct;
}

// raw counts: stems + branch 정기(main hidden stem) across active pillars
function calcCounts(pillars: SajuPillar[]): Record<OhaengKey, number> {
  const counts: Record<OhaengKey, number> = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  for (const p of pillars) {
    counts[stemElement(p.stem)] += 1;
    counts[stemElement(mainHidden(p.branch))] += 1;
  }
  return counts;
}

const EL_KO_NAME: Record<OhaengKey, string> = {
  wood: '목(木)', fire: '화(火)', earth: '토(土)', metal: '금(金)', water: '수(水)',
};

// ── 신강/신약 (Strength)
function calcStrength(
  dayStem: string,
  pillars: { month: SajuPillar; day: SajuPillar; others: SajuPillar[] }
): { score: number; label: '신강' | '중화' | '신약'; desc: string } {
  const dm = stemElement(dayStem);
  const resourceEl = (Object.keys(GEN_NEXT) as OhaengKey[]).find((k) => GEN_NEXT[k] === dm)!;
  const isSupport = (el: OhaengKey) => el === dm || el === resourceEl;

  // weighted contribution of a pillar (stem + main hidden stem)
  const pillarSupport = (p: SajuPillar, w: number) => {
    let s = 0;
    if (isSupport(stemElement(p.stem))) s += w;
    if (isSupport(stemElement(mainHidden(p.branch)))) s += w;
    return s;
  };
  const pillarTotal = (w: number) => 2 * w;

  let support = 0;
  let total = 0;
  // 월령 strongest ×2
  support += pillarSupport(pillars.month, 2); total += pillarTotal(2);
  // 일지 ×1.5 (day stem itself is DM so it always supports; count day branch)
  support += isSupport(stemElement(mainHidden(pillars.day.branch))) ? 1.5 : 0; total += 1.5;
  // others ×1
  for (const p of pillars.others) { support += pillarSupport(p, 1); total += pillarTotal(1); }

  const score = total > 0 ? Math.round((support / total) * 100) : 50;
  let label: '신강' | '중화' | '신약';
  let desc: string;
  if (score >= 60) { label = '신강'; desc = '일간이 강해 주체성과 추진력이 돋보여요.'; }
  else if (score >= 40) { label = '중화'; desc = '기운이 고르게 균형 잡힌 사주예요.'; }
  else { label = '신약'; desc = '일간이 약해 주변의 도움과 협력이 힘이 돼요.'; }
  return { score, label, desc };
}

// ── 용신 (Useful God), simplified
function calcYongshin(
  dayStem: string,
  strengthLabel: '신강' | '중화' | '신약',
  counts: Record<OhaengKey, number>
): { element: OhaengKey; reason: string } {
  const dm = stemElement(dayStem);
  const outputEl = GEN_NEXT[dm];                 // 식상 (DM produces)
  const wealthEl = CTRL_NEXT[dm];                // 재성 (DM controls)
  const resourceEl = (Object.keys(GEN_NEXT) as OhaengKey[]).find((k) => GEN_NEXT[k] === dm)!; // 인성

  const strong = strengthLabel === '신강';
  const candidates: OhaengKey[] = strong ? [outputEl, wealthEl] : [resourceEl, dm];
  // pick the weakest (smallest count) among candidates
  const element = candidates.reduce((a, b) => (counts[b] < counts[a] ? b : a));
  let reason: string;
  if (strong) {
    reason = `신강하니 기운을 덜어내는 ${EL_KO_NAME[element]} 기운을 용신으로 삼아요.`;
  } else if (strengthLabel === '중화') {
    reason = `중화에 가깝지만 다소 약한 편이라 일간을 돕는 ${EL_KO_NAME[element]} 기운을 용신으로 삼아요.`;
  } else {
    reason = `신약하니 일간을 돕는 ${EL_KO_NAME[element]} 기운을 용신으로 삼아요.`;
  }
  return { element, reason };
}

// ── 대운 (Luck Cycles)
function calcDaewoon(
  dayStem: string,
  yearStem: string,
  monthPillar: SajuPillar,
  startAge: number
): DaewoonStep[] {
  // direction: yang year stem (male default) → forward, else backward
  const forward = isYang(yearStem);
  const monthStemIdx = STEMS.indexOf(monthPillar.stem);
  const monthBranchIdx = BRANCHES.indexOf(monthPillar.branch);
  const steps: DaewoonStep[] = [];
  for (let i = 1; i <= 8; i++) {
    const off = forward ? i : -i;
    const stemIdx = ((monthStemIdx + off) % 10 + 10) % 10;
    const branchIdx = ((monthBranchIdx + off) % 12 + 12) % 12;
    const stem = STEMS[stemIdx];
    const branch = BRANCHES[branchIdx];
    steps.push({
      age: startAge + (i - 1) * 10,
      stem,
      branch,
      stemKo: STEMS_KO[stemIdx],
      branchKo: BRANCHES_KO[branchIdx],
      element: stemElement(stem),
      tenGod: tenGod(dayStem, stem).ko,
    });
  }
  return steps;
}

// enrich a pillar with 십성/지장간/12운성/12신살 (in place, returns same object)
function enrichPillar(p: SajuPillar, dayStem: string, yearBranch: string, isDay: boolean): SajuPillar {
  p.hiddenStems = HIDDEN_STEMS[p.branch] ? [...HIDDEN_STEMS[p.branch]] : [];
  p.tenGodStem = isDay ? { ko: '일간', hanja: '我' } : tenGod(dayStem, p.stem);
  p.tenGodBranch = tenGod(dayStem, mainHidden(p.branch));
  p.stage = twelveStage(dayStem, p.branch);
  p.spirit = twelveSpirit(yearBranch, p.branch);
  return p;
}

export function calculateSaju(
  birthDate: string,
  birthTime: string | null
): SajuData {
  const [y, m, d] = birthDate.split('-').map(Number);
  const year = isNaN(y) ? 1990 : y;
  const month = isNaN(m) ? 1 : m;
  const day = isNaN(d) ? 1 : d;

  const yearPillar = getYearPillar(year);
  const monthPillar = getMonthPillar(year, month);
  const dayPillar = getDayPillar(year, month, day);

  let hourPillar: SajuPillar | null = null;
  if (birthTime) {
    const parts = birthTime.split(':');
    const hour = parseInt(parts[0], 10);
    if (!isNaN(hour)) {
      const dayStemIdx = STEMS.indexOf(dayPillar.stem);
      hourPillar = getHourPillar(hour, dayStemIdx);
    }
  }

  const activePillars = [yearPillar, monthPillar, dayPillar, ...(hourPillar ? [hourPillar] : [])];
  const ohaeng = calcOhaeng(activePillars) as {
    wood: number; fire: number; earth: number; metal: number; water: number;
  };

  const dayStem = dayPillar.stem;
  const yearBranch = yearPillar.branch;

  // enrich each pillar with 십성/지장간/12운성/12신살
  enrichPillar(yearPillar, dayStem, yearBranch, false);
  enrichPillar(monthPillar, dayStem, yearBranch, false);
  enrichPillar(dayPillar, dayStem, yearBranch, true);
  if (hourPillar) enrichPillar(hourPillar, dayStem, yearBranch, false);

  const counts = calcCounts(activePillars);

  const others: SajuPillar[] = [yearPillar, ...(hourPillar ? [hourPillar] : [])];
  const strength = calcStrength(dayStem, { month: monthPillar, day: dayPillar, others });
  const yongshin = calcYongshin(dayStem, strength.label, counts);

  // 대운수: deterministic small number 1–10 (3 + (day % 7) → 3..9)
  const startAge = 3 + (day % 7);
  const daewoon = calcDaewoon(dayStem, yearPillar.stem, monthPillar, startAge);

  const dayMaster = {
    stem: dayStem,
    ko: dayPillar.stemKo,
    element: stemElement(dayStem),
  };

  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    ohaeng,
    counts,
    strength,
    yongshin,
    daewoon,
    dayMaster,
  };
}
