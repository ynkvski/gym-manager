import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';
import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL;
const sessionSecret = process.env.SESSION_SECRET;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}

if (!sessionSecret) {
  throw new Error('SESSION_SECRET is not defined');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const PgSessionStore = connectPgSimple(session);

export const sessionMiddleware = session({
  store: new PgSessionStore({
    pool,
    createTableIfMissing: true,
  }),

  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,

  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});



export default pool;
