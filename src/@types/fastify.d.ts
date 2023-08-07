import { accountDTOType } from "../routes/user/user.schemas";

declare module "fastify"{
  interface FastifyRequest{
    user: accountDTOType
  }
}