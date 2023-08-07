import { FastifyReply, FastifyRequest } from 'fastify'
import cookie from '@fastify/cookie'
import { env } from './env'

const app = require('fastify')()

app.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply)=>{
  console.log(`${request.method} - ${request.url}`)
})

app.setErrorHandler(function (error, request, reply) {
  console.log(error)
  if(error.errors[0].code==="invalid_enum_value"){
    const message = error.errors[0].message || "Untreated Error"
    reply.code(400).send({"tag": "Invalid Enum", "message": message})
  }
})

app.get('/healthcheck', async (request: FastifyRequest, reply: FastifyReply) =>{
  reply.code(200).send('Everything is good!')
})

app.register(cookie)

app.register(require('@fastify/jwt'),{
  secret: env.JWTTOKEN
})

export default app