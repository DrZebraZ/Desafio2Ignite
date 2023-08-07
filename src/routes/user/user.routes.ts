import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { UserController } from "./user.controllers"
import { $ref } from "./user.schemas"

async function userRoutes(app: FastifyInstance){
  
  const userController = new UserController()

  app.post('/create', {schema:{body:$ref('createAccountBody')}} , userController.createUser)
  app.post('/login', {schema:{body:$ref('loginBody')}}, userController.login)

}

export default userRoutes