import AppSidebar from '@/components/layout/AppSidebar';
import { Header } from '@/components/layout/Header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-dvh w-full overflow-hidden p-3'>
      <SidebarProvider className='h-full  min-h-0 overflow-hidden'>
        <AppSidebar />

        <SidebarInset className='flex h-full min-h-0 min-w-0 flex-col overflow-hidden'>
          <Header />

          <main className='min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-6 '>
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
