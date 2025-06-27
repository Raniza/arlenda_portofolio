import { BaseSeeder } from '@adonisjs/lucid/seeders'
import laserData from '../../tmp/json/laser.json' with { type: 'json' }
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

type LaserItemType = {
  serial_number: string
  model: string
  start_datetime: string
  upd_datetime: string
  judgment: number
}

const laserItems: LaserItemType[] = laserData as LaserItemType[]

export default class TraceSeeder extends BaseSeeder {
  async run() {
    for (const items of laserItems) {
      const startDate = DateTime.fromFormat(items.start_datetime, 'M/d/yyyy H:mm')
      const updDate = DateTime.fromFormat(items.upd_datetime, 'M/d/yyyy H:mm')

      await db.table('lasers').insert({
        model: items.model,
        serial_number: items.serial_number,
        start_datetime: startDate.isValid ? startDate.toJSDate() : null,
        upd_datetime: updDate.isValid ? updDate.toJSDate() : null,
        judgment: items.judgment === 1 ? true : false,
      })
    }
  }
}
