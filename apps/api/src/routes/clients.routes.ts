import { prisma } from '@gym-manager/db';
import { Router } from 'express';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(clients);
  } catch (error) {
    console.error('Failed to fetch clients:', error);

    res.status(500).json({
      message: 'Не удалось получить список клиентов',
    });
  }
});

export default router;
