import { DatabaseConnector } from "../../database";
import { ResultValidation } from '../../utils/result-validation';
import { feedDTOSchema, getFeedDatabaseSchema, idFeedType, idUserType, insertFeedDatabaseType, updateFeedDatabaseType } from "./feed.schemas";


export class FeedRepository{

  private databaseConnector: DatabaseConnector;

  constructor(dbConnector: DatabaseConnector){
    this.databaseConnector = dbConnector;
  }

  async createFeed(feed: insertFeedDatabaseType, resultValidation: ResultValidation){
    try{
      await this.databaseConnector.server('feeds').insert(feed).then((result)=>{
        return this._resultFormation(result, resultValidation, "Success!")
      })
    }catch(error){
      console.log(error)
      resultValidation.addError("Create Feed Error", `${error}`, true)
    }
  }

  async getFeed(userId: idUserType, resultValidation: ResultValidation){
    try{
      await this.databaseConnector.server('feeds').where(userId).where({deleted_at:null}).then((result)=>{
        return this._resultFormation(1, resultValidation, feedDTOSchema.parse(result))
      })
    }catch(error){
      console.log(error)
      resultValidation.addError("Find FeedById Error", `${error}`, true)
    }
  }

  async getFeedInsideDiet(inside: Boolean,userId: idUserType, resultValidation: ResultValidation){
    try{
      await this.databaseConnector.server('feeds').where(userId).where({deleted_at:null}).where({inside_diet: inside}).then((result)=>{
        return this._resultFormation(1, resultValidation, feedDTOSchema.parse(result))
      })
    }catch(error){
      console.log(error)
      resultValidation.addError("Find FeedById Error", `${error}`, true)
    }
  }

  async getUniqueFeed(id: idFeedType, userId: idUserType, resultValidation: ResultValidation){
    try{
      await this.databaseConnector.server('feeds').where(id).where(userId).where({deleted_at:null}).then((result)=>{
        this._resultFormation(result, resultValidation, feedDTOSchema.parse(result))
      })
    }catch(error){
      console.log(error)
      resultValidation.addError("Find FeedById Error", `${error}`, true)
    }
  }

  async findFeedById(id: idFeedType, user_id: idUserType, resultValidation:ResultValidation){
    try{
      await this.databaseConnector.server('feeds').where(id).where(user_id).where({'deleted_at':null}).then((result)=>{
        return this._resultFormation(result, resultValidation, result)
      })
    }catch(error){
      console.log(error)
      resultValidation.addError("Find FeedById Error", `${error}`, true)
    }
  }

  async updateFeedById(id: idFeedType, feed: updateFeedDatabaseType, resultValidation: ResultValidation){
    try{
      await this.databaseConnector.server('feeds').where(id).where({deleted_at:null}).update(feed).then((result)=>{
        return this._resultFormation(result, resultValidation, "Updated!")
      })

    }catch(error){
      console.log(error)
      resultValidation.addError("Update Feed Error", `${error}`, true)
    }
  }


  async deleteFeedById(id: idFeedType, user_id: idUserType, resultValidation:ResultValidation){
    try{
      await this.databaseConnector.server('feeds').where(id).where(user_id).update({deleted_at:new Date()}).then((result)=>{
        return this._resultFormation(result, resultValidation, "Deleted!")
      })

    }catch(error){
      console.log(error)
      resultValidation.addError("Update Feed Error", `${error}`, true)
    }
  }

  private _resultFormation(result: any, resultValidation:ResultValidation, returnData?: any){
    if(result === 0 || result === null || result === undefined || result.length === 0){
      return resultValidation.addError("Empty", "No data found for information given!")
    }
    return resultValidation.setResult({data: returnData})
  }
}