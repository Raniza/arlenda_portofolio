import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bbd_measurements'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('serial_number').notNullable()
      table.timestamp('start_datetime', { useTz: true })
      table.timestamp('upd_datetime', { useTz: true })
      table.string('model')
      table.float('bbd_measure_x1')
      table.float('bbd_measure_y1')
      table.float('bbd_measure_x5')
      table.float('bbd_measure_y5')
      table.boolean('judgment')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
