'use client';

export default function TwinSpark({ size = 16, color = '#6E56CF' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 1l1.3 4.7L14 8l-4.7 1.3L8 14l-1.3-4.7L2 8l4.7-1.3L8 1z" fill={color}/>
    </svg>
  );
}
