import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table)=>{
    table.uuid('id').primary().unique()
    table.text('name').notNullable()
    table.text('email').notNullable().unique()
    table.text('salt').notNullable()
    table.text('hash').notNullable()
    table.dateTime('created_at').defaultTo(new Date()).notNullable()
    table.dateTime('updated_at').defaultTo(null)
    table.dateTime('deleted_at').defaultTo(null)
  })

  await knex.schema.createTable('feeds', (table)=>{
    table.uuid('id').primary().unique()
    table.uuid('user_id').index().notNullable()
    table.foreign('user_id').references('users.id')
    table.text('name').notNullable()
    table.text('description')
    table.boolean('inside_diet').notNullable()
    table.dateTime('created_at').defaultTo(new Date()).notNullable()
    table.dateTime('updated_at').defaultTo(null)
    table.dateTime('deleted_at').defaultTo(null)
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('feeds')
}

