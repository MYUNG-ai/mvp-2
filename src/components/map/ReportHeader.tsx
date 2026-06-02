'use client';

import Icon from '@/components/ui/Icon';

interface Props {
  title: string;
  saved?: boolean;
  onBack?: () => void;
  onClose?: () => void;
}

export default function ReportHeader({ title, saved, onBack, onClose }: Props) {
  const close = onClose || onBack;
  return (
    <div className="app-header">
      <div className="left">
        <button className="icon-btn" onClick={onBack} aria-label="뒤로">
          <Icon name="chevron-left" size={22} />
        </button>
      </div>
      <div className="title">{title}</div>
      <div className="right" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {saved && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: 'var(--brand)', background: 'var(--brand-soft)', padding: '5px 10px', borderRadius: 999 }}>
            <Icon name="bookmark" size={12} /> 저장됨
          </span>
        )}
        <button className="icon-btn" onClick={close} aria-label="닫기">
          <Icon name="x" size={22} />
        </button>
      </div>
    </div>
  );
}
