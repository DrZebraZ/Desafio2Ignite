import { FastifyReply, FastifyRequest } from "fastify";
import { ResultValidation } from "../../utils/result-validation";
import { FeedService } from "./feed.services";
import { FeedRepository } from "./feed.repository";
import { DatabaseConnector } from "../../database";
import { applyResult } from "../middlewares/applyresult";
import { createFeedType, filter, filterType, idFeedType } from "./feed.schemas";


export class FeedController{
  constructor(){

  }

  async createFeed(req: FastifyRequest<{Body:createFeedType}>, res: FastifyReply){
    const resultValidation = new ResultValidation()
    const feedService = new FeedService(new FeedRepository(new DatabaseConnector()))
    await feedService.createFeed(req.body, req.user, resultValidation)
    applyResult(resultValidation, res, 201)

  }

  async getFeed(req: FastifyRequest, res: FastifyReply){
    const resultValidation = new ResultValidation()
    const feedService = new FeedService(new FeedRepository(new DatabaseConnector()))
    await feedService.getFeed(req.user, resultValidation)
    applyResult(resultValidation, res, 200)
  }

  async getUniqueFeed(req: FastifyRequest<{Params: idFeedType}>, res: FastifyReply){
    const resultValidation = new ResultValidation()
    const feedService = new FeedService(new FeedRepository(new DatabaseConnector()))
    await feedService.getUniqueFeed(req.params ,req.user, resultValidation)
    applyResult(resultValidation, res, 200)
  }

  async updateFeed(req: FastifyRequest<{Body:createFeedType, Params:idFeedType}>, res: FastifyReply){
    const resultValidation = new ResultValidation()
    const feedService = new FeedService(new FeedRepository(new DatabaseConnector()))
    await feedService.updateFeed(req.body, req.params, req.user, resultValidation)
    applyResult(resultValidation, res, 200)
  }

  async deleteFeed(req: FastifyRequest<{Params:idFeedType}>, res: FastifyReply){
    const resultValidation = new ResultValidation()
    const feedService = new FeedService(new FeedRepository(new DatabaseConnector()))
    await feedService.deleteFeed(req.params, req.user, resultValidation)
    applyResult(resultValidation, res, 200)
  }

  async getStatus(req: FastifyRequest, res: FastifyReply){
    const resultValidation = new ResultValidation()
    let option = filter.parse(req.query)
    
    const feedService = new FeedService(new FeedRepository(new DatabaseConnector()))

    switch(option.filter){
      case 'TotalInserted':
        await feedService.getStatusTotalRegister(req.user, resultValidation)
        break
      case 'InsideDiet':
        await feedService.getStatusTotalInsideDiet(req.user, resultValidation)
        break
      case 'OutsideDiet':
        await feedService.getStatusTotalOutsideDiet(req.user, resultValidation)
        break
      case 'BestCombo':
        await feedService.getBestDietCombo(req.user, resultValidation)
        break
    }
    
    applyResult(resultValidation, res, 200)
  }
}