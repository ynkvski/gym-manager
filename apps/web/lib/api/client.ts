export type ActiveMembership = {
  endDate: string;
  planName: string;
};

export type Client = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  createdAt: string;
  activeMembership: ActiveMembership | null;
};

export type PaginatedClients = {
  clients: Client[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export async function getClients(page = 1): Promise<PaginatedClients> {
  const res = await fetch(
    `${process.env.API_URL}/api/clients?page=${page}&limit=9`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Не удалось получить список клиентов');
  }

  return res.json();
}
