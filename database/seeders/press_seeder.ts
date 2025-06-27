import { BaseSeeder } from '@adonisjs/lucid/seeders'
import press from '../../tmp/json/press_boss_side.json' with { type: 'json' }
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

type PressType = {
  serial_number: string
  model: string
  start_datetime: string
  upd_datetime: string
  bush_loadstroke: number
  oil_seal_stroke: number
  judgment: number
}

const pressItems: PressType[] = press as PressType[]

export default class PressSeeder extends BaseSeeder {
  async run() {
    console.log('✅ Press seeding start.')

    for (const items of pressItems) {
      const startDate = DateTime.fromFormat(items.start_datetime, 'M/d/yyyy H:mm')
      const updDate = DateTime.fromFormat(items.upd_datetime, 'M/d/yyyy H:mm')

      await db.table('press_fits').insert({
        model: items.model,
        serial_number: items.serial_number,
        start_datetime: startDate.isValid ? startDate.toJSDate() : null,
        upd_datetime: updDate.isValid ? updDate.toJSDate() : null,
        bush_loadstroke: items.bush_loadstroke,
        oil_seal_stroke: items.oil_seal_stroke,
        judgment: items.judgment === 1 ? true : false,
      })
    }
  }
}
