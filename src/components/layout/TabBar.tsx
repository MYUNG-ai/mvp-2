'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMapStore } from '@/store/useMapStore';
import Icon from '@/components/ui/Icon';

const TABS = [
  { key: 'os',  label: 'OS',  icon: 'os',  href: '/os' },
  { key: 'map', label: 'map', icon: 'map', href: '/map' },
  { key: 'my',  label: 'MY',  icon: 'user', href: '/my' },
];

export default function TabBar({ hidden = false }: { hidden?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const resetFlow = useMapStore((s) => s.resetFlow);
  const active = TABS.find((t) => pathname.startsWith(t.href))?.key ?? 'os';

  const go = (href: string) => {
    resetFlow();
    router.push(href);
  };

  return (
    <div className="tabbar" data-hidden={hidden}>
      {TABS.map((t) => (
        <button
          key={t.key}
          className={'tab ' + (active === t.key ? 'active' : '')}
          onClick={() => go(t.href)}
          style={{ minHeight: 44 }}
        >
          <Icon name={t.icon} size={26} strokeWidth={active === t.key ? 2 : 1.6} />
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
