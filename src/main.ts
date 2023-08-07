import { env } from './env'
import { insertRoutes } from './routes'
import insertSchemas from './schemas'
import app from './server'


async function main(){
  try{
    await insertSchemas(app)
    await insertRoutes(app)
    app.listen({
      host:"0.0.0.0",
      port:env.PORT
    }).then(()=>{
      console.log("server listening on port ", env.PORT);
    })
  }catch(e){
    console.log(e)
  }
}

main()