'use client';

export default function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="6" y="6" width="36" height="36" rx="12" fill="#F4831B"/>
      <rect x="22" y="22" width="36" height="36" rx="12" fill="var(--fg-1)"/>
      <rect x="22" y="22" width="20" height="20" fill="#F4831B" fillOpacity="0.9"/>
    </svg>
  );
}
