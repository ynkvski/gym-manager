import ClientDialog from '@/features/clients/ClientDialog';
import ClientPagination from '@/features/clients/ClientPagination';
import ClientSearch from '@/features/clients/ClientSearch';
import ClientsTable from '@/features/clients/ClientsTable';
import ClientsTableSkeleton from '@/features/clients/ClientsSkeleton';
import { getClients } from '@/lib/api/client';
import { Suspense } from 'react';

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

async function ClientsContent({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const data = await getClients(currentPage);

  return (
    <>
      <ClientsTable clients={data.clients} />

      <ClientPagination currentPage={data.page} totalPages={data.totalPages} />
    </>
  );
}

export default function ClientsPage({ searchParams }: Props) {
  return (
    <div className=''>
      <div className='flex justify-between items-center mb-3'>
        <ClientSearch />
        <ClientDialog />
      </div>

      <Suspense fallback={<ClientsTableSkeleton />}>
        <ClientsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
