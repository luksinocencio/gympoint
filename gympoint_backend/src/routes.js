import { Router } from 'express'

import CheckinsController from './app/controllers/CheckinsController'
import EnrollsController from './app/controllers/EnrollsController'
import HelpOrderController from './app/controllers/HelpOrderController'
import NotificationController from './app/controllers/NotificationController'
import PlanController from './app/controllers/PlanController'
import SessionController from './app/controllers/SessionController'
import StudentController from './app/controllers/StudentController'
import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.post('/session', SessionController.store)

routes.get('/students/:id/help-orders', HelpOrderController.show)
routes.post('/students/:id/help-orders', HelpOrderController.store)

// Checkins
routes.post('/students/:studentId/checkins', CheckinsController.store)
routes.get('/students/:studentId/checkins', CheckinsController.index)
routes.post('/students-exists', StudentController.show)

// Admin routes
routes.use(authMiddleware)

// Estudantes
routes.post('/students', StudentController.store)
routes.get('/students', StudentController.index)
routes.put('/students/:id', StudentController.update)
routes.delete('/students/:id', StudentController.delete)

// Gestão de planejamento
routes.get('/planManagement', PlanController.index)
routes.post('/planManagement', PlanController.store)
routes.get('/planManagement/:id', PlanController.show)
routes.put('/planManagement/:id', PlanController.update)
routes.delete('/planManagement/:id', PlanController.delete)

// Gestão de matriculas
routes.get('/enrolls', EnrollsController.index)
routes.post('/enrolls', EnrollsController.store)
routes.put('/enrolls/:id', EnrollsController.update)
routes.get('/enrolls/:id', EnrollsController.show)
routes.delete('/enrolls/:id', EnrollsController.delete)

// Pedido de ajuda
routes.put('/help-orders/:id/answear', HelpOrderController.update)
routes.get('/help-orders', HelpOrderController.index)

// Notification
routes.get('/notifications', NotificationController.index)
routes.put('/notifications/:id', NotificationController.update)

export default routes
