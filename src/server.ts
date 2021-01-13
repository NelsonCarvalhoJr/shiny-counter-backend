import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import path from 'path';
import fs from 'fs';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  async (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (request.file.filename) {
      const userAvatarFilePath = path.join(
        uploadConfig.directory,
        request.file.filename,
      );
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(3333, () => {
  console.log('👽️ Server start on port 3333');
});
