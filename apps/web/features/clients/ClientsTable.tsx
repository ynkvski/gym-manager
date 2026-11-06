import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Client } from '@/lib/api/client';

type Props = {
  clients: Client[];
};

export default async function ClientsTable({ clients }: Props) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Дата регистрации</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Окончание</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className='text-center py-8'>
                Клиентов не найдено
              </TableCell>
            </TableRow>
          ) : (
            clients.map(client => (
              <TableRow key={client.id}>
                <TableCell>
                  {client.firstName} {client.lastName}
                </TableCell>
                <TableCell>
                  {' '}
                  {new Date(client.createdAt).toLocaleDateString('ru-RU')}
                </TableCell>
                <TableCell>
                  {client.activeMembership ? (
                    <Badge className='bg-green-600 text-white hover:bg-green-700'>
                      Активен
                    </Badge>
                  ) : (
                    <Badge variant='secondary'>Не активен</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {' '}
                  {client.activeMembership?.endDate
                    ? new Date(
                        client.activeMembership.endDate,
                      ).toLocaleDateString('ru-RU')
                    : '—'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
}
