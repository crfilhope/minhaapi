import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import userRoutes from './routes/userRoutes';
import sessionRoutes from './routes/sessionsRoutes';
import tweetRoutes from './routes/tweetRoutes';
import tokenRoutes from './routes/tokenRoutes';

import './database';

require('dotenv').config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/users', userRoutes);
    this.app.use('/sessions', sessionRoutes);
    this.app.use('/tweet', tweetRoutes);
    this.app.use('/tokens', tokenRoutes);
  }


  authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
}

export default new App().app;
