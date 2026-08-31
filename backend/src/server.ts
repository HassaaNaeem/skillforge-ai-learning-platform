import cors from 'cors';
import express from 'express';
import { env } from './config/env';

const app = express();

app.use(cors());
app.use(express.json());

// Placeholder route only, to prove the entrypoint boots end-to-end.
// Real routes are added module-by-module starting in M2.
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'skillforge-api', env: env.NODE_ENV });
});

app.listen(env.PORT, () => {
  console.log(`[api] listening on http://localhost:${env.PORT}`);
});
