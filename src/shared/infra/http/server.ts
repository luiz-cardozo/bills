import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

// import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
// import rateLimiter from './middlewares/rateLimiter';
import routes from '@shared/infra/http/routes';

import '@shared/container';
import '@shared/infra/typeorm';

const app = express();
// app.use(rateLimiter);
app.use(cors());
app.use(express.json());
// app.use('/files', express.static(uploadConfig.tmpFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  // eslint-disable-next-line no-console
  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started on port 3333');
});
