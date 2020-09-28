'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumPermissionUserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.string('permission').notNullable()
    })
  }

  down () {
    this.alter('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddColumPermissionUserSchema
