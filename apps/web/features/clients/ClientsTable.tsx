import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ClientsTable() {
  const clients = [
    {
      id: 1,
      name: 'Иван Иванов',
      email: 'ivan@mail.com',
      phone: '+371 20000000',
    },
    {
      id: 2,
      name: 'Анна Петрова',
      email: 'anna@mail.com',
      phone: '+371 21111111',
    },
    {
      id: 3,
      name: 'Алексей Смирнов',
      email: 'alex@mail.com',
      phone: '+371 22222222',
    },
    {
      id: 4,
      name: 'Николай Петрович',
      email: 'npetrovich91@mail.com',
      phone: '+371 22222222',
    },
    {
      id: 5,
      name: 'Арнольд Витальевич',
      email: 'vetalya11@mail.com',
      phone: '+371 22222222',
    },
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Имя</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Телефон</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {clients.map(client => (
          <TableRow key={client.id}>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
