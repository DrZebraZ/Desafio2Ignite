import { FastifyInstance } from "fastify";
import userRoutes from "./routes/user/user.routes";
import { feedRoutes } from "./routes/feed/feed.routes";


export async function insertRoutes(app: FastifyInstance){
  app.register(userRoutes, {prefix:"/user"})
  app.register(feedRoutes, {prefix:"/feed"})
}