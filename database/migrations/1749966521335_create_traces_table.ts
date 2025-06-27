import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('lasers', (table) => {
      table.string('serial_number').notNullable()
      table.timestamp('start_datetime', { useTz: true })
      table.timestamp('upd_datetime', { useTz: true })
      table.string('model')
      table.boolean('judgment')
    })
  }

  async down() {
    this.schema.dropTable('lasers')
  }
}
