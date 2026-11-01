'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Avatar } from '../ui/avatar';

interface Props {
  className?: string;
}

export function Header() {
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    '/dashboard': 'Панель управления',
    '/clients': 'Клиенты',
    '/memberships': 'Абонементы',
    '/settings': 'Настройки',
  };

  const title = pageTitles[pathname] ?? 'Gym Manager';

  return (
    <header
      className={cn(
        ' h-[60px] px-5 flex items-center justify-between border-b-2 border-white/10',
      )}
    >
      <h2 className='text-left text-[clamp(1.6rem,2.5vw,2rem)]  max-[480px]:leading-[0.9] '>
        {title}
      </h2>
      <div className='flex items-center justify-center gap-2'>
        <Avatar />
        John Adamson
      </div>
    </header>
  );
}
