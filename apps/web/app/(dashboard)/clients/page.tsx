import ClientDialog from '@/features/clients/ClientDialog';
import ClientPagination from '@/features/clients/ClientPagination';
import ClientSearch from '@/features/clients/ClientSearch';
import ClientsTable from '@/features/clients/ClientsTable';

export default function ClientsPage() {
  return (
    <div className=''>
      <div className='flex justify-between items-center mb-3'>
        <ClientSearch />
        <ClientDialog />
      </div>
      <ClientsTable />
      <ClientPagination />
    </div>
  );
}
