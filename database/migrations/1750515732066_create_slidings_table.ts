import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'slidings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('serial_number').notNullable()
      table.timestamp('start_datetime', { useTz: true })
      table.timestamp('upd_datetime', { useTz: true })
      table.string('model')
      table.float('sliding_resistance')
      table.boolean('judgment')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
