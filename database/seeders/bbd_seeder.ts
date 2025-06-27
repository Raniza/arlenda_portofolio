import { BaseSeeder } from '@adonisjs/lucid/seeders'
import bbd from '../../tmp/json/bbd.json' with { type: 'json' }
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

const bbdItems: BbdType[] = bbd as BbdType[]

type BbdType = {
  serial_number: string
  model: string
  start_datetime: string
  upd_datetime: string
  bbd_measure_x1: number
  bbd_measure_y1: number
  bbd_measure_x5: number
  bbd_measure_y5: number
  judgment: number
}

export default class BbdSeeder extends BaseSeeder {
  async run() {
    console.log('✅ BBD seeding start.')

    for (const items of bbdItems) {
      const startDate = DateTime.fromFormat(items.start_datetime, 'M/d/yyyy H:mm')
      const updDate = DateTime.fromFormat(items.upd_datetime, 'M/d/yyyy H:mm')

      await db.table('bbd_measurements').insert({
        model: items.model,
        serial_number: items.serial_number,
        start_datetime: startDate.isValid ? startDate.toJSDate() : null,
        upd_datetime: updDate.isValid ? updDate.toJSDate() : null,
        bbd_measure_x1: items.bbd_measure_x1,
        bbd_measure_y1: items.bbd_measure_y1,
        bbd_measure_x5: items.bbd_measure_x5,
        bbd_measure_y5: items.bbd_measure_y5,
        judgment: items.judgment === 1 ? true : false,
      })
    }
  }
}
