import { ResultValidation } from '../../utils/result-validation';
import { accountDTOType } from '../user/user.schemas';
import { FeedRepository } from './feed.repository';
import { createFeedType, idFeedType, idUserParser, insertFeedDatabaseSchema, updateFeedDatabaseSchema, idUserType, feedDTOSchema } from './feed.schemas';
import { randomUUID } from 'node:crypto'

export class FeedService{

  private repository: FeedRepository;

  constructor(feedRepository: FeedRepository){
    this.repository = feedRepository
  }

  async createFeed(body: createFeedType, user:accountDTOType, resultValidation:ResultValidation){
    const feed = insertFeedDatabaseSchema.parse({
      id: randomUUID(),
      ...body,
      user_id: user.id
    })
    await this.repository.createFeed(feed, resultValidation)
  }
  
  async getFeed(user: accountDTOType, resultValidation: ResultValidation){
    const userId = idUserParser.parse({user_id: user.id})
    await this.repository.getFeed(userId, resultValidation)
  }

  async getUniqueFeed(id: idFeedType, user: accountDTOType, resultValidation:ResultValidation){
    const userId = idUserParser.parse({user_id: user.id})
    await this.repository.getUniqueFeed(id, userId, resultValidation)
  }

  async updateFeed(body:createFeedType, id: idFeedType, user:accountDTOType, resultValidation:ResultValidation){
    const userId = idUserParser.parse({user_id: user.id})
    await this.repository.findFeedById(id, userId, resultValidation)
    if (resultValidation.hasError()){
      return resultValidation
    }
    const updatedFeed = updateFeedDatabaseSchema.parse({
      ...body,
      ...id,
      ...userId,
      updated_at: new Date()      
    })
    await this.repository.updateFeedById(id, updatedFeed, resultValidation)
  }

  async deleteFeed(id: idFeedType, user: accountDTOType, resultValidation: ResultValidation){
    const userId = idUserParser.parse({user_id: user.id})
    await this.repository.deleteFeedById(id, userId, resultValidation);
  }

  async getStatusTotalRegister(user: accountDTOType, resultValidation:ResultValidation){
    const userId = idUserParser.parse({user_id: user.id})
    await this.repository.getFeed(userId, resultValidation)
    if (resultValidation.hasError() || resultValidation.isResultEmpty()){
      return resultValidation
    }
    const result = resultValidation.getResult().data
    const num = result.length
    resultValidation.setResult({data: {total: num}})
  }

  async getStatusTotalInsideDiet(user: accountDTOType, resultValidation:ResultValidation){
    const userId = idUserParser.parse({user_id: user.id})
    await this.repository.getFeedInsideDiet(true, userId, resultValidation)
    if (resultValidation.hasError() || resultValidation.isResultEmpty()){
      return resultValidation
    }
    const result = resultValidation.getResult().data
    const num = result.length
    resultValidation.setResult({data: {total: num}})
  }

  async getStatusTotalOutsideDiet(user: accountDTOType, resultValidation:ResultValidation){
    const userId = idUserParser.parse({user_id: user.id})
    await this.repository.getFeedInsideDiet(false, userId, resultValidation)
    if (resultValidation.hasError() || resultValidation.isResultEmpty()){
      return resultValidation
    }
    const result = resultValidation.getResult().data
    const num = result.length
    resultValidation.setResult({data: {total: num}})
  }

  async getBestDietCombo(user: accountDTOType, resultValidation:ResultValidation){
    const userId = idUserParser.parse({user_id: user.id})
    await this.repository.getFeed(userId, resultValidation)
    if (resultValidation.hasError() || resultValidation.isResultEmpty()){
      return resultValidation
    }
    const feeds = feedDTOSchema.parse(resultValidation.getResult().data)

    let count = 0
    let feedsLen = feeds.length
    while (feedsLen >= 0){
      if(!feeds[feedsLen-1].inside_diet){
        break
      }
      count+=1
      feedsLen -= 1
    }
    resultValidation.setResult({data:{"bestCombo": count}})
  }

}