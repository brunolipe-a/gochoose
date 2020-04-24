import { Router } from 'express';

import auth from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from "./app/controllers/SessionController";
import GroupController from "./app/controllers/GroupController";
import MessageController from "./app/controllers/MessageController";

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(auth);

routes.get('/users', UserController.index);

routes.get('/groups', GroupController.index);
routes.post('/groups', GroupController.store);
routes.delete('/groups/:id', GroupController.delete);

routes.get('/channels/:id/messages', MessageController.index);
routes.post('/channels/:id/messages', MessageController.store);

export default routes;
