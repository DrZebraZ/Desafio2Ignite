import { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction, preValidationHookHandler } from "fastify";
import crypto from 'crypto';
import { env } from "../../env";
import { accountDTO, accountDTOType } from '../user/user.schemas';
import cookie from '@fastify/cookie';
const jwtValidator = require('jsonwebtoken')

export const RequireAuth = function (request:FastifyRequest, reply:FastifyReply, done:HookHandlerDoneFunction): void{
  try{
    const token = request.headers.cookie?.split('token=')[1]?.split(';')[0]
    if(!token){
      reply.code(400).send('Token not Found')
      return
    }
    const jwt = decrypt(token)
    var decoded = jwtValidator.verify(jwt, env.JWTTOKEN);
    if(!decoded){
      reply.clearCookie('token')
      reply.code(401).send('UNAUTHORIZED')
      return
    }
    const user = accountDTO.parse(decoded)
    request.user = user
    done()
  }catch(e){
    console.log(e)
    reply.clearCookie('token')
    reply.code(401).send('UNAUTHORIZED')
  }
}

function decrypt(encryptedText:string) {
  try{
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(env.ENCRYPTKEY).digest('base64').slice(0, 32);
    const ivHex = encryptedText.split('%3A')[0]
    if (!ivHex) {
      throw new Error('IV is missing');
    }
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = encryptedText.split('%3A')[1]
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }catch(e){
    console.log(e)
    return new Error()
  }
}  
