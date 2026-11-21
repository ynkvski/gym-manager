import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

console.log({
  databaseUrlLoaded: Boolean(process.env.DATABASE_URL),
  sessionSecretLoaded: Boolean(process.env.SESSION_SECRET),
});

async function start() {
  const appModule = await import('./app.js');
  const app = appModule.default;

  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
  });
}

start();
