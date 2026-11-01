import logo from '@/public/assets/logo.png';
import {
  CalendarDays,
  ChartNoAxesColumn,
  CreditCard,
  Dumbbell,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';

export default function AppSidebar() {
  const navItems = [
    {
      title: 'Панель управления',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    { title: 'Клиенты', href: '/clients', icon: Users },
    { title: 'Абонементы', href: '/memberships', icon: CreditCard },
    { title: 'Расписание', href: '/schedule', icon: CalendarDays },
    { title: 'Тренерский состав', href: '/trainers', icon: Dumbbell },
    { title: 'Статистика', href: '/statistics', icon: ChartNoAxesColumn },
    { title: 'Настройки', href: '/settings', icon: Settings },
  ];

  return (
    <>
      <Sidebar className='pl-4 pt-3 pb-3 rounded-tl-lg rounded-bl-lg '>
        <SidebarHeader className='flex justify-center flex-row items-center mt-4   font-bold  '>
          <Image src={logo} width={35} height={35} alt='logo' />
          <span className='text-xl'>Gym-manager</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className='mt-10 pl-2 pr-2'>
            {navItems.map(item => {
              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton>
                    <Link className='flex items-center gap-2' href={item.href}>
                      <Icon strokeWidth={2} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>Manager Alisa</SidebarFooter>
      </Sidebar>
    </>
  );
}
