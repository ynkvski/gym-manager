import AppSidebar from '@/components/layout/AppSidebar';
import { Header } from '@/components/layout/Header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <div className='h-full w-full'>
      <SidebarProvider className='h-full min-h-0'>
        <AppSidebar />

        <SidebarInset className='h-full min-h-0'>
          <Header />

          <main className='min-h-0 flex-1 overflow-y-auto'>
            {/* Здесь будет контент страницы */}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
