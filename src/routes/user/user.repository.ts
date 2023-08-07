import { DatabaseConnector } from "../../database";
import { ResultValidation } from "../../utils/result-validation";
import { insertAccountDatabaseType } from './user.schemas';


export class UserRepository{

  private databaseConnector: DatabaseConnector

  constructor(dbConnector: DatabaseConnector){
    this.databaseConnector = dbConnector;
  }

  async createUser(user: insertAccountDatabaseType, resultValidation: ResultValidation){
    try{
      await this.databaseConnector.server('users').insert(user).then((result)=>{
        resultValidation.setResult({data: "Success!"})
      })
    }catch(error){
      console.log(error)
      resultValidation.addError("Create User Failed", `${error}`, true)
    }
    
  }

  async findByEmail(email: string, resultValidation: ResultValidation){
    try{
      await this.databaseConnector.server('users').where({
        email: email
      }).then((result) => {
        if(result.length > 0){
          return resultValidation.setResult({data: result[0]});
        }
        return resultValidation.addError("EMAIL ERROR", "Email not found")
        
      })
    }catch(error){
      console.log(error)
      resultValidation.addError("Find User Failed", `${error}`, true)
    }
  }
}