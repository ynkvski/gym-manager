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
      <SidebarProvider className='h-full min-h-0'>
        <AppSidebar />

        <SidebarInset className='min-h-0 overflow-hidden'>
          <Header />

          <main className='min-h-0 flex-1 overflow-y-auto p-6'>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
