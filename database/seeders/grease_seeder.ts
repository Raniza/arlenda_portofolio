import { BaseSeeder } from '@adonisjs/lucid/seeders'
import grease from '../../tmp/json/grease_collar_guide_side.json' with { type: 'json' }
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

type GreaseType = {
  serial_number: string
  model: string
  start_datetime: string
  upd_datetime: string
  grease_weight: number
  grease_weight_total: number
  judgment: number
}

const greaseItems: GreaseType[] = grease as GreaseType[]

export default class GreaseSeeder extends BaseSeeder {
  async run() {
    console.log('✅ Grease seeding start.')

    for (const items of greaseItems) {
      const startDate = DateTime.fromFormat(items.start_datetime, 'M/d/yyyy H:mm')
      const updDate = DateTime.fromFormat(items.upd_datetime, 'M/d/yyyy H:mm')

      await db.table('greases').insert({
        model: items.model,
        serial_number: items.serial_number,
        start_datetime: startDate.isValid ? startDate.toJSDate() : null,
        upd_datetime: updDate.isValid ? updDate.toJSDate() : null,
        grease_weight: items.grease_weight,
        grease_weight_total: items.grease_weight_total,
        judgment: items.judgment === 1 ? true : false,
      })
    }
  }
}
