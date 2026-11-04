import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// Вспомогательные функции для дат
const today = new Date();
today.setHours(12, 0, 0, 0);

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  const day = result.getDate();

  result.setDate(1);
  result.setMonth(result.getMonth() + months);

  const lastDay = new Date(
    result.getFullYear(),
    result.getMonth() + 1,
    0,
  ).getDate();

  result.setDate(Math.min(day, lastDay));

  return result;
}

async function main() {
  // 1. Пользователи
  const users = [
    {
      email: 'admin@gym-manager.local',
      password: 'Admin123!',
      firstName: 'Александр',
      lastName: 'Администратор',
      role: 'ADMIN' as const,
    },
    {
      email: 'manager1@gym-manager.local',
      password: 'Manager123!',
      firstName: 'Иван',
      lastName: 'Петров',
      role: 'MANAGER' as const,
    },
    {
      email: 'manager2@gym-manager.local',
      password: 'Manager123!',
      firstName: 'Мария',
      lastName: 'Иванова',
      role: 'MANAGER' as const,
    },
  ];

  const userIds = new Map<string, string>();

  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 10);

    const savedUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      create: {
        email: user.email,
        passwordHash,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });

    userIds.set(user.email, savedUser.id);
  }

  const managerIds = [
    userIds.get('manager1@gym-manager.local')!,
    userIds.get('manager2@gym-manager.local')!,
  ];

  // 2. Тарифы абонементов
  const plans = [
    {
      name: '1 месяц',
      description: 'Абонемент на один месяц',
      price: '35.00',
      durationMonths: 1,
    },
    {
      name: '3 месяца',
      description: 'Абонемент на три месяца',
      price: '90.00',
      durationMonths: 3,
    },
    {
      name: '6 месяцев',
      description: 'Абонемент на шесть месяцев',
      price: '165.00',
      durationMonths: 6,
    },
    {
      name: '12 месяцев',
      description: 'Годовой абонемент',
      price: '300.00',
      durationMonths: 12,
    },
  ];

  const planMap = new Map<
    string,
    { id: string; price: string; durationMonths: number }
  >();

  for (const plan of plans) {
    const existingPlan = await prisma.membershipPlan.findFirst({
      where: { name: plan.name },
    });

    const savedPlan = existingPlan
      ? await prisma.membershipPlan.update({
          where: { id: existingPlan.id },
          data: plan,
        })
      : await prisma.membershipPlan.create({
          data: plan,
        });

    planMap.set(plan.name, {
      id: savedPlan.id,
      price: plan.price,
      durationMonths: plan.durationMonths,
    });
  }

  // 3. Клиенты
  const clients = [
    ['Андрей', 'Соколов', 'andrey@example.com', '+37120000001'],
    ['Елена', 'Козлова', 'elena@example.com', '+37120000002'],
    ['Дмитрий', 'Новиков', 'dmitry@example.com', '+37120000003'],
    ['Анна', 'Морозова', 'anna@example.com', '+37120000004'],
    ['Сергей', 'Волков', 'sergey@example.com', '+37120000005'],
    ['Ольга', 'Лебедева', 'olga@example.com', '+37120000006'],
    ['Максим', 'Соколов', 'maxim@example.com', '+37120000007'],
    ['Наталья', 'Попова', 'natalia@example.com', '+37120000008'],
    ['Артём', 'Васильев', 'artem@example.com', '+37120000009'],
    ['Ирина', 'Павлова', 'irina@example.com', '+37120000010'],
    ['Павел', 'Семёнов', 'pavel@example.com', '+37120000011'],
    ['Татьяна', 'Голубева', 'tatiana@example.com', '+37120000012'],
    ['Роман', 'Виноградов', 'roman@example.com', '+37120000013'],
    ['Марина', 'Беляева', 'marina@example.com', '+37120000014'],
    ['Кирилл', 'Комаров', 'kirill@example.com', '+37120000015'],
  ] as const;

  const clientIds = new Map<string, string>();

  for (let i = 0; i < clients.length; i++) {
    const [firstName, lastName, email, phone] = clients[i];
    const cardNumber = `GM-${String(i + 1).padStart(4, '0')}`;

    const data = {
      firstName,
      lastName,
      email,
      phone,
      cardNumber,
      isActive: true,
      createdById: managerIds[i % managerIds.length],
      birthDate: new Date(Date.UTC(1985 + (i % 15), i % 12, 10 + (i % 18))),
    };

    const client = await prisma.client.upsert({
      where: { cardNumber },
      update: data,
      create: data,
    });

    clientIds.set(cardNumber, client.id);
  }

  // 4. Абонементы клиентов
  // ACTIVE с датой окончания в прошлом = истёкший абонемент.
  // CANCELLED = отменённый абонемент.

  const memberships = [
    {
      id: '10000000-0000-4000-8000-000000000001',
      card: 'GM-0001',
      plan: '3 месяца',
      kind: 'EXPIRED',
    },
    {
      id: '10000000-0000-4000-8000-000000000002',
      card: 'GM-0001',
      plan: '1 месяц',
      kind: 'ACTIVE',
    },
    {
      id: '10000000-0000-4000-8000-000000000003',
      card: 'GM-0002',
      plan: '3 месяца',
      kind: 'ACTIVE',
    },
    {
      id: '10000000-0000-4000-8000-000000000004',
      card: 'GM-0003',
      plan: '6 месяцев',
      kind: 'ACTIVE',
    },
    {
      id: '10000000-0000-4000-8000-000000000005',
      card: 'GM-0004',
      plan: '12 месяцев',
      kind: 'ACTIVE',
    },
    {
      id: '10000000-0000-4000-8000-000000000006',
      card: 'GM-0005',
      plan: '1 месяц',
      kind: 'EXPIRED',
    },
    {
      id: '10000000-0000-4000-8000-000000000007',
      card: 'GM-0006',
      plan: '3 месяца',
      kind: 'EXPIRED',
    },
    {
      id: '10000000-0000-4000-8000-000000000008',
      card: 'GM-0007',
      plan: '6 месяцев',
      kind: 'EXPIRED',
    },
    {
      id: '10000000-0000-4000-8000-000000000009',
      card: 'GM-0008',
      plan: '12 месяцев',
      kind: 'CANCELLED',
    },
    {
      id: '10000000-0000-4000-8000-000000000010',
      card: 'GM-0009',
      plan: '1 месяц',
      kind: 'ACTIVE',
    },
    {
      id: '10000000-0000-4000-8000-000000000011',
      card: 'GM-0012',
      plan: '12 месяцев',
      kind: 'EXPIRED',
    },
    {
      id: '10000000-0000-4000-8000-000000000012',
      card: 'GM-0013',
      plan: '3 месяца',
      kind: 'CANCELLED',
    },
    {
      id: '10000000-0000-4000-8000-000000000013',
      card: 'GM-0014',
      plan: '6 месяцев',
      kind: 'ACTIVE',
    },
  ] as const;

  for (const membership of memberships) {
    const clientId = clientIds.get(membership.card);
    const plan = planMap.get(membership.plan);

    if (!clientId || !plan) {
      throw new Error(
        `Не найден клиент или тариф для абонемента ${membership.id}`,
      );
    }

    let startDate: Date;

    if (membership.kind === 'ACTIVE') {
      startDate =
        plan.durationMonths === 1 ? addDays(today, -10) : addMonths(today, -1);
    } else if (membership.kind === 'EXPIRED') {
      startDate = addMonths(today, -(plan.durationMonths + 2));
    } else {
      startDate = addMonths(today, -(plan.durationMonths + 1));
    }

    const endDate = addMonths(startDate, plan.durationMonths);

    const status =
      membership.kind === 'CANCELLED'
        ? ('CANCELLED' as const)
        : ('ACTIVE' as const);

    const data = {
      clientId,
      membershipPlanId: plan.id,
      startDate,
      endDate,
      paidAmount: plan.price,
      status,
    };

    await prisma.clientMembership.upsert({
      where: { id: membership.id },
      update: data,
      create: {
        id: membership.id,
        ...data,
      },
    });
  }

  console.log('Seed completed successfully!');
  console.log('Users: 3');
  console.log('Membership plans: 4');
  console.log('Clients: 15');
  console.log('Membership records: 13');
}

main()
  .catch(error => {
    console.error('Seed error:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
