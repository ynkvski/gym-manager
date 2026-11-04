import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { config } from 'dotenv';
import path from 'node:path';

config({ path: path.join(__dirname, '../.env') }); 

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({
  connectionString,
});

export const prisma = new PrismaClient({ adapter });
