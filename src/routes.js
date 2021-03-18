const { Router } = require('express');
const TaskController = require('./app/controllers/TaskController');

const SessionController = require('./app/controllers/SessionController');

const UserController = require('./app/controllers/UserController');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

// Toda rota abaixo desse middleware é necessário estar autenticado
routes.use(authMiddleware);

routes.put('/users', authMiddleware, UserController.update);

routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.put('/tasks/:task_id', TaskController.update);
routes.delete('/tasks/:task_id', TaskController.delete);

module.exports = routes;
