import express from 'express';
import { sessionMiddleware } from './config/session.js';
import authRouter from './routes/auth.routes.js';
import clientsrouter from './routes/clients.routes.js';

const app = express();

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/clients', clientsrouter);
app.use(express.json());
app.use(sessionMiddleware);
app.use('/api/auth', authRouter);

app.get('/api/session-test', (req, res, next) => {
  req.session.save(err => {
    if (err) {
      return next(err);
    }

    res.json({
      status: 'Session saved',
      sessionID: req.sessionID,
    });
  });
});

export default app;
