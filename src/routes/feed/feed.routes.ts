import { FastifyInstance } from "fastify";
import { FeedController } from "./feed.controllers";
import { RequireAuth } from '../middlewares/authentication';
import { $ref, filter } from './feed.schemas';


export async function feedRoutes(app: FastifyInstance){

  const feedController = new FeedController()

  app.post('/create', {preHandler:RequireAuth.bind(app), schema:{body:$ref('createFeedSchema')}}, feedController.createFeed)
  app.get('/', {preHandler:RequireAuth.bind(app)}, feedController.getFeed)
  app.get('/:id', {preHandler:RequireAuth.bind(app)}, feedController.getUniqueFeed)
  app.post('/update/:id', {preHandler:RequireAuth.bind(app), schema:{body:$ref('createFeedSchema')}}, feedController.updateFeed)
  app.delete('/:id', {preHandler:RequireAuth.bind(app)}, feedController.deleteFeed)
  app.get('/status', {preHandler:RequireAuth.bind(app)}, feedController.getStatus)

}