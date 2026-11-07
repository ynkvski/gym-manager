import { prisma } from '@gym-manager/db';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, Math.floor(Number(req.query.page) || 1));
    const limit = Math.min(
      100,
      Math.max(1, Math.floor(Number(req.query.limit) || 8)),
    );

    const skip = (page - 1) * limit;

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        skip,
        take: limit,
        include: {
          memberships: {
            where: {
              status: 'ACTIVE',
              endDate: { gt: new Date() },
            },
            select: {
              endDate: true,
              membershipPlan: {
                select: {
                  name: true,
                },
              },
            },
            take: 1,
            orderBy: {
              endDate: 'desc',
            },
          },
        },
      }),

      prisma.client.count(),
    ]);

    const clientsWithMembership = clients.map(client => {
      const membership = client.memberships[0];

      const { memberships, ...clientData } = client;

      return {
        ...clientData,
        activeMembership: membership
          ? {
              endDate: membership.endDate,
              planName: membership.membershipPlan.name,
            }
          : null,
      };
    });

    res.json({
      clients: clientsWithMembership,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Failed to fetch clients:', error);

    res.status(500).json({
      message: 'Не удалось получить список клиентов',
    });
  }
});

export default router;
