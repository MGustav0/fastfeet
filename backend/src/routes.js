import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import CourierController from './app/controllers/CourierController';
import CourierDeliveryController from './app/controllers/CourierDeliveryController';
import CourierFinishController from './app/controllers/CourierFinishController';
import CourierStartController from './app/controllers/CourierStartController';
import DeliveryOrderController from './app/controllers/DeliveryOrderController';
import DeliveryProblemsControler from './app/controllers/DeliveryProblemsControler';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import SignatureRecipientController from './app/controllers/SignatureRecipientController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/** Funcionalidades do entregador. */
routes.get('/couriers/:id/deliveries', CourierDeliveryController.index);
routes.put('/couriers/:id/startDelivery', CourierStartController.update);
routes.put('/couriers/:id/finishDelivery', CourierFinishController.update);
routes.post(
  '/couriers/sendSignature',
  upload.single('file'),
  SignatureRecipientController.store
);
routes.post('/delivery/:delivery_id/problems', DeliveryProblemsControler.store);

/** Todas as rotas abaixo utilizam este middleware. */
routes.use(authMiddleware);

/** Criação de usuários administradores. */
routes.put('/users', UserController.update);

/** Listagem, criação, atualização e deleção de entregadores. */
routes.get('/couriers', CourierController.index);
routes.post('/couriers', CourierController.store);
routes.put('/couriers/:id', CourierController.update);
routes.delete('/couriers/:id', CourierController.delete);

/** Criação, atualização e deleção de entregas. */
routes.get('/delivery', DeliveryOrderController.index);
routes.post('/delivery', DeliveryOrderController.store);
routes.put('/delivery/:id', DeliveryOrderController.update);
routes.delete('/delivery/:id', DeliveryOrderController.delete);

/** Criação e atualização de destinatários. */
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);

/** Problemas na entrega. */
routes.get('/delivery/problems', DeliveryProblemsControler.index);
routes.get('/delivery/:delivery_id/problems', DeliveryProblemsControler.list);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemsControler.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
