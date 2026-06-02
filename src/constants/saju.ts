export const STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
export const STEMS_KO = ['갑','을','병','정','무','기','경','신','임','계'];
export const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
export const BRANCHES_KO = ['자','축','인','묘','진','사','오','미','신','유','술','해'];
export const STEM_ELEMENTS: string[] = ['木','木','火','火','土','土','金','金','水','水'];
export const BRANCH_ELEMENTS: string[] = ['水','土','木','木','土','火','火','土','金','金','土','水'];

export const ELEMENT_MAP: Record<string, string> = {
  '木': 'wood',
  '火': 'fire',
  '土': 'earth',
  '金': 'metal',
  '水': 'water',
};

export const EL: Record<string, { color: string; soft: string; hanja: string; ko: string }> = {
  wood:  { color: '#5BA672', soft: 'rgba(91,166,114,0.15)',   hanja: '木', ko: '목' },
  fire:  { color: '#E26A2C', soft: 'rgba(226,106,44,0.15)',  hanja: '火', ko: '화' },
  earth: { color: '#D9A441', soft: 'rgba(217,164,65,0.15)',  hanja: '土', ko: '토' },
  metal: { color: '#9CA3AF', soft: 'rgba(156,163,175,0.15)', hanja: '金', ko: '금' },
  water: { color: '#5686C4', soft: 'rgba(86,134,196,0.15)',  hanja: '水', ko: '수' },
};

export const KIND: Record<string, { color: string; soft: string; label: string }> = {
  진로: { color: '#F4831B', soft: 'rgba(244,131,27,0.10)', label: '진로' },
  관계: { color: '#6E56CF', soft: 'rgba(110,86,207,0.11)', label: '관계' },
  상담: { color: '#2E7CF6', soft: 'rgba(46,124,246,0.10)', label: '상담' },
};

// ── 지장간 (Hidden Stems) — branch(한자) → hidden stems(한자), order 여기/중기/정기
export const HIDDEN_STEMS: Record<string, string[]> = {
  '子': ['壬', '癸'],
  '丑': ['癸', '辛', '己'],
  '寅': ['戊', '丙', '甲'],
  '卯': ['甲', '乙'],
  '辰': ['乙', '癸', '戊'],
  '巳': ['戊', '庚', '丙'],
  '午': ['丙', '己', '丁'],
  '未': ['丁', '乙', '己'],
  '申': ['戊', '壬', '庚'],
  '酉': ['庚', '辛'],
  '戌': ['辛', '丁', '戊'],
  '亥': ['戊', '甲', '壬'],
};

// ── 십성 (Ten Gods) — 한자 → 한국어 label
export const TEN_GODS_KO: Record<string, string> = {
  '比肩': '비견',
  '劫財': '겁재',
  '食神': '식신',
  '傷官': '상관',
  '偏財': '편재',
  '正財': '정재',
  '偏官': '편관',
  '正官': '정관',
  '偏印': '편인',
  '正印': '정인',
};

// ── 12운성 (Twelve Life Stages) — order from 장생
export const TWELVE_STAGES = ['장생', '목욕', '관대', '건록', '제왕', '쇠', '병', '사', '묘', '절', '태', '양'];

// 장생 시작 지지(한자) per day stem(한자)
export const STAGE_START: Record<string, string> = {
  '甲': '亥', '乙': '午', '丙': '寅', '丁': '酉', '戊': '寅',
  '己': '酉', '庚': '巳', '辛': '子', '壬': '申', '癸': '卯',
};

// ── 12신살 (Twelve Spirits) — order from 겁살
export const TWELVE_SPIRITS = ['겁살', '재살', '천살', '지살', '연살', '월살', '망신살', '장성살', '반안살', '역마살', '육해살', '화개살'];

// 삼합 그룹의 겁살 시작 지지(한자). key = 그룹 멤버 지지(한자)
export const SPIRIT_START: Record<string, string> = {
  '申': '巳', '子': '巳', '辰': '巳', // 申子辰 → 겁살 巳
  '寅': '亥', '午': '亥', '戌': '亥', // 寅午戌 → 겁살 亥
  '巳': '寅', '酉': '寅', '丑': '寅', // 巳酉丑 → 겁살 寅
  '亥': '申', '卯': '申', '未': '申', // 亥卯未 → 겁살 申
};
