import { FastifyInstance } from "fastify";
import { userSchemas } from "./routes/user/user.schemas";
import { feedSchemas } from "./routes/feed/feed.schemas";


async function insertSchemas(app: FastifyInstance){
  for (let schema of [
    ...userSchemas,
    ...feedSchemas
  ]){
    app.addSchema(schema);
  }
}

export default insertSchemas