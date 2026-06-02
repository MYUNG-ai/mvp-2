'use client';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export default function Icon({ name, size = 24, color = 'currentColor', strokeWidth = 1.75 }: IconProps) {
  const k = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth,
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'os': return <svg {...k}><circle cx="12" cy="12" r="3.2"/><path d="M12 2.6l1.5 2.3 2.6-.9.6 2.7 2.8.2-.5 2.7 2.4 1.4-1.4 2.4 1.7 2.2-2.5 1.2.2 2.8-2.7.3-1 2.6-2.5-1-1.7 2.2-1.7-2.2-2.5 1-1-2.6-2.7-.3.2-2.8-2.5-1.2 1.7-2.2-1.4-2.4 2.4-1.4-.5-2.7 2.8-.2.6-2.7 2.6.9z"/></svg>;
    case 'map': return <svg {...k}><path d="M9 4L3.5 6.2a1 1 0 00-.5.9v12.1a.6.6 0 00.85.55L9 18l6 2.5 5.15-2.1a1 1 0 00.5-.9V5.4a.6.6 0 00-.85-.55L15 6.5 9 4z"/><path d="M9 4v14M15 6.5v14"/></svg>;
    case 'user': return <svg {...k}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>;
    case 'users': return <svg {...k}><circle cx="9" cy="8" r="3.4"/><path d="M3 20c0-3.6 2.7-6.4 6-6.4s6 2.8 6 6.4"/><path d="M16 5.2a3.4 3.4 0 010 6.4M18.5 20c0-3-1.4-5.4-3.6-6.2"/></svg>;
    case 'branch': return <svg {...k}><circle cx="12" cy="4" r="2.2"/><circle cx="6" cy="14" r="2.2"/><circle cx="18" cy="14" r="2.2"/><circle cx="12" cy="20.5" r="1.8"/><path d="M12 6.2v3.3M12 9.5c0 2-2 2.3-3.6 3M12 9.5c0 2 2 2.3 3.6 3M12 16.2v2.5"/></svg>;
    case 'message': return <svg {...k}><path d="M21 11.5a8.4 8.4 0 01-1.3 4.5 8.5 8.5 0 01-7.2 4 8.4 8.4 0 01-4.5-1.3L3 21l2.3-5a8.4 8.4 0 01-1.3-4.5 8.5 8.5 0 014-7.2A8.4 8.4 0 0112.5 3a8.5 8.5 0 018.5 8.5z"/></svg>;
    case 'bookmark': return <svg {...k}><path d="M6 4h12a1 1 0 011 1v15l-7-4-7 4V5a1 1 0 011-1z"/></svg>;
    case 'thumbs-up': return <svg {...k}><path d="M7 11v9H4a1 1 0 01-1-1v-7a1 1 0 011-1h3zM7 11l4-8a2.5 2.5 0 012.4 3.2L12.5 9H19a2 2 0 011.9 2.6l-1.8 6A2 2 0 0117.2 19H7"/></svg>;
    case 'thumbs-down': return <svg {...k}><path d="M17 13V4h3a1 1 0 011 1v7a1 1 0 01-1 1h-3zM17 13l-4 8a2.5 2.5 0 01-2.4-3.2L11.5 15H5a2 2 0 01-1.9-2.6l1.8-6A2 2 0 016.8 5H17"/></svg>;
    case 'refresh': return <svg {...k}><path d="M3 12a9 9 0 0115.5-6.2L21 8M21 4v4h-4M21 12a9 9 0 01-15.5 6.2L3 16M3 20v-4h4"/></svg>;
    case 'image': return <svg {...k}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9.5" r="1.8"/><path d="M21 16l-4.5-4.5L7 21"/></svg>;
    case 'map-pin': return <svg {...k}><path d="M12 21s-6-5.3-6-10a6 6 0 1112 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2.2"/></svg>;
    case 'plus': return <svg {...k}><path d="M12 5v14M5 12h14"/></svg>;
    case 'x': return <svg {...k}><path d="M18 6L6 18M6 6l12 12"/></svg>;
    case 'chevron-right': return <svg {...k}><path d="M9 6l6 6-6 6"/></svg>;
    case 'chevron-left': return <svg {...k}><path d="M15 6l-6 6 6 6"/></svg>;
    case 'chevron-down': return <svg {...k}><path d="M6 9l6 6 6-6"/></svg>;
    case 'arrow-right': return <svg {...k}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'arrow-left': return <svg {...k}><path d="M19 12H5M11 5l-7 7 7 7"/></svg>;
    case 'more': return <svg {...k}><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>;
    case 'settings': return <svg {...k}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5"/></svg>;
    case 'calendar': return <svg {...k}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>;
    case 'clock': return <svg {...k}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'check': return <svg {...k}><path d="M20 6L9 17l-5-5"/></svg>;
    case 'info': return <svg {...k}><circle cx="12" cy="12" r="9"/><path d="M12 8v.01M11 12h1v4h1"/></svg>;
    case 'lock': return <svg {...k}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>;
    case 'send': return <svg {...k}><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>;
    case 'mic': return <svg {...k}><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg>;
    case 'sparkles': return <svg {...k}><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z"/><path d="M19 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></svg>;
    case 'compass': return <svg {...k}><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5L13 13l-4.5 2.5L11 11z"/></svg>;
    case 'split': return <svg {...k}><path d="M5 5l6 6v8M19 5l-6 6"/></svg>;
    case 'flame': return <svg {...k}><path d="M12 2s4 4 4 8a4 4 0 01-8 0c0-1.5.5-3 2-4-.5 1.5 0 2.5 1 2.5 1.5 0 1.5-1.5 1-3 0-2-1-3.5 0-3.5z"/><path d="M5 18a7 7 0 0014 0"/></svg>;
    case 'leaf': return <svg {...k}><path d="M11 20A7 7 0 014 13c0-6 7-10 16-10 0 9-4 16-10 16-1.5 0-3-.7-4-2"/><path d="M2 22l8-8"/></svg>;
    case 'mountain': return <svg {...k}><path d="M3 20l5-8 4 5 3-4 6 7H3z"/></svg>;
    case 'droplet': return <svg {...k}><path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"/></svg>;
    case 'trend-up': return <svg {...k}><path d="M3 17l6-6 4 4 8-8M14 7h7v7"/></svg>;
    case 'flask': return <svg {...k}><path d="M9 3h6M10 3v7l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3"/><path d="M7 14h10"/></svg>;
    case 'chart': return <svg {...k}><path d="M3 21V3M3 21h18M7 16v-5M12 16v-9M17 16v-7"/></svg>;
    case 'edit': return <svg {...k}><path d="M11 4H4v16h16v-7"/><path d="M18.5 2.5a2.1 2.1 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
    case 'log-out': return <svg {...k}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>;
    case 'bell': return <svg {...k}><path d="M6 8a6 6 0 0112 0v5l2 3H4l2-3V8zM10 20a2 2 0 004 0"/></svg>;
    case 'instagram': return <svg {...k}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill={color}/></svg>;
    case 'briefcase': return <svg {...k}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/></svg>;
    case 'heart': return <svg {...k}><path d="M12 20s-7-4.5-9-9.5C2 7 4.5 4.5 7.5 4.5 9.5 4.5 11 6 12 7c1-1 2.5-2.5 4.5-2.5 3 0 5.5 2.5 4.5 6-2 5-9 9.5-9 9.5z"/></svg>;
    case 'grid': return <svg {...k}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
    case 'wifi': return <svg {...k}><path d="M5 13a10 10 0 0114 0M8.5 16.5a5 5 0 017 0M12 20h.01"/></svg>;
    case 'battery': return <svg {...k}><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/></svg>;
    case 'signal': return <svg {...k} stroke="none" fill={color}><rect x="2" y="16" width="3" height="5" rx="0.5"/><rect x="7" y="12" width="3" height="9" rx="0.5"/><rect x="12" y="8" width="3" height="13" rx="0.5"/><rect x="17" y="3" width="3" height="18" rx="0.5"/></svg>;
    default: return <svg {...k}><circle cx="12" cy="12" r="9"/></svg>;
  }
}
