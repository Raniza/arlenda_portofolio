import { BaseSeeder } from '@adonisjs/lucid/seeders'
import metalflow from '../../tmp/json/metal_flow.json' with { type: 'json' }
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

type MetalFlowType = {
  serial_number: string
  model: string
  start_datetime: string
  upd_datetime: string
  peak_pressure: number
  peak_pressure_load_cell: number
  judgment: number
}

const metalFlowItems: MetalFlowType[] = metalflow as MetalFlowType[]

export default class MetalSeeder extends BaseSeeder {
  async run() {
    console.log('✅ Metal seeding start.')

    for (const items of metalFlowItems) {
      const startDate = DateTime.fromFormat(items.start_datetime, 'M/d/yyyy H:mm')
      const updDate = DateTime.fromFormat(items.upd_datetime, 'M/d/yyyy H:mm')

      await db.table('metals').insert({
        model: items.model,
        serial_number: items.serial_number,
        start_datetime: startDate.isValid ? startDate.toJSDate() : null,
        upd_datetime: updDate.isValid ? updDate.toJSDate() : null,
        peak_pressure: items.peak_pressure,
        peak_pressure_load_cell: items.peak_pressure_load_cell,
        judgment: items.judgment === 1 ? true : false,
      })
    }
  }
}
