import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { errorHandler } from './middleware/error.js';
import authRoutes from './modules/auth/routes.js';
import anonymousRoutes from './modules/anonymous/routes.js';
import topicsRoutes from './modules/topics/routes.js';
import questionsRoutes from './modules/questions/routes.js';


const app = express();

app.use(
  cors({
    origin: env.NODE_ENV === 'development' ? 'http://localhost:5173' : undefined,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'skillforge-api', env: env.NODE_ENV });
});

app.use('/auth', authRoutes);
app.use('/anonymous', anonymousRoutes);
app.use('/topics', topicsRoutes);
app.use("/questions", questionsRoutes);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`[api] listening on http://localhost:${env.PORT}`);
});
