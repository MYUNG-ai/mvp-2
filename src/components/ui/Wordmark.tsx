'use client';

interface WordmarkProps {
  size?: number;
  muted?: string;
}

export default function Wordmark({ size = 22, muted = 'var(--fg-3)' }: WordmarkProps) {
  return (
    <span style={{
      fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: size,
      letterSpacing: '-0.04em', lineHeight: 1, whiteSpace: 'nowrap',
    }}>
      <span style={{ color: '#F4831B' }}>my</span>
      <span style={{ color: muted }}>ung.ai</span>
    </span>
  );
}
