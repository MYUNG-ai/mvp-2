export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getTodayInfo() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const weekdayHanja = ['日', '月', '火', '水', '木', '金', '土'];
  const dow = now.getDay();
  return {
    year: String(year),
    month: `${month}월`,
    day: String(day),
    dayLabel: `${day}일`,
    weekday: `${weekdays[dow]} · ${weekdayHanja[dow]}`,
  };
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${y}. ${m}. ${d}.`;
}
