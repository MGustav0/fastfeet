import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import routes from './routes';

import './database';

// Classe executada apenas uma vez.
class App {
  // Método executado sempre que a classe é chamada.
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    // Funciona como um middleware
    this.server.use(routes);
  }
}

export default new App().server;
