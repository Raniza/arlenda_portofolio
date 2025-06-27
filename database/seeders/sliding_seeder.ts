import { BaseSeeder } from '@adonisjs/lucid/seeders'
import sliding from '../../tmp/json/sliding.json' with { type: 'json' }
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

type SlidingType = {
  serial_number: string
  model: string
  start_datetime: string
  upd_datetime: string
  sliding_resistance: number
  judgment: number
}

const slidingItems: SlidingType[] = sliding as SlidingType[]

export default class SlidingSeeder extends BaseSeeder {
  async run() {
    console.log('✅ Sliding seeding start.')

    for (const items of slidingItems) {
      const startDate = DateTime.fromFormat(items.start_datetime, 'M/d/yyyy H:mm')
      const updDate = DateTime.fromFormat(items.upd_datetime, 'M/d/yyyy H:mm')

      await db.table('slidings').insert({
        model: items.model,
        serial_number: items.serial_number,
        start_datetime: startDate.isValid ? startDate.toJSDate() : null,
        upd_datetime: updDate.isValid ? updDate.toJSDate() : null,
        sliding_resistance: items.sliding_resistance,
        judgment: items.judgment === 1 ? true : false,
      })
    }
  }
}
