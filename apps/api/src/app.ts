import express from 'express';
import clientsrouter from './routes/clients.routes.js';

const app = express();

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/clients', clientsrouter);

export default app;
