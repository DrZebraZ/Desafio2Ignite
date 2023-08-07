import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const id = z.coerce.string()
const user_id = z.string()
const name = z.string({required_error: "Name Required"})
const description = z.string()
const inside_diet = z.coerce.boolean()
const created_at = z.coerce.date()
const updated_at = z.coerce.date().nullable().default(null)
const deleted_at = z.coerce.date().nullable().default(null)


export const filter = z.object({
  filter: z.enum(['TotalInserted', 'InsideDiet', 'OutsideDiet', 'BestCombo'],{required_error: "Must inform one of: TotalInserted, InsideDiet, OutsideDiet, BestCombo"})
})
export type filterType = z.infer<typeof filter>


export const idUserParser = z.object({
  user_id
})
export type idUserType = z.infer<typeof idUserParser>


export const idFeedParser = z.object({
  id
})
export type idFeedType = z.infer<typeof idFeedParser>


export const createFeedSchema = z.object({
  name,
  description,
  inside_diet,
  created_at
})
export type createFeedType = z.infer<typeof createFeedSchema>


export const insertFeedDatabaseSchema = z.object({
  id,
  user_id,
  name,
  description,
  inside_diet,
  created_at
})
export type insertFeedDatabaseType = z.infer<typeof insertFeedDatabaseSchema>


export const updateFeedDatabaseSchema = z.object({
  id,
  user_id,
  name,
  description,
  inside_diet,
  created_at,
  updated_at
})
export type updateFeedDatabaseType = z.infer<typeof updateFeedDatabaseSchema>


export const getFeedDatabaseSchema = z.object({
  id,
  user_id,
  name,
  description,
  inside_diet,
  created_at,
  updated_at,
  deleted_at
}).array()
export type getFeedDatabaseType = z.infer<typeof getFeedDatabaseSchema>


export const feedDTOSchema = z.object({
  id,
  name,
  description,
  inside_diet,
  created_at,
  updated_at
}).array()
export type feedDTOType = z.infer<typeof feedDTOSchema>


const models = {
  createFeedSchema,
  filter
}

const options = {
  $id: "feedSchemas"
}

export const { schemas: feedSchemas, $ref} = buildJsonSchemas(models, options)