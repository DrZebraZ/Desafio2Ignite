import { FastifyReply, FastifyRequest } from "fastify";
import { createAccountType, loginBodyType } from './user.schemas';
import { UserService } from "./user.services";
import { DatabaseConnector } from "../../database";
import { UserRepository } from './user.repository';
import { ResultValidation } from '../../utils/result-validation';
import { applyResult } from "../middlewares/applyresult";


export class UserController{
  
  constructor(){
  }

  async createUser(req:FastifyRequest<{Body: createAccountType}>, res: FastifyReply){
    const resultValidation = new ResultValidation()
    const userService = new UserService(new UserRepository(new DatabaseConnector()))
    await userService.createUser(req.body, resultValidation)
    applyResult(resultValidation, res, 201)
  }

  async login(req:FastifyRequest<{Body: loginBodyType}>, res: FastifyReply){
    const resultValidation = new ResultValidation()
    const userService = new UserService(new UserRepository(new DatabaseConnector()))
    await userService.login(req.body, resultValidation)
    applyResult(resultValidation, res, 200)
  }
  
}