import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function ClientsSkeleton() {
  return (
    <>
      <Table className='table-fixed w-full'>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Дата регистрации</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Окончание</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 8 }, (_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className='h-5 w-32' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-5 w-22' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-5 w-20' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-5 w-22' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
