import path from 'node:path';
import http from 'node:http';
import express from 'express';
import mongose from 'mongoose';
import { router } from './router';
import { Server } from 'socket.io';



mongose.connect('mongodb://127.0.0.1:27017')
  .then(() => {
    const port = 3001;

    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);

    io.on('connect', () => {
      console.log('Conectou!');
    });

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*'); //http://192.168.2.103:3001
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    server.listen(port, () => {
      console.log(`🌎 Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => console.log('Erro ao conectar no mongodb'));




