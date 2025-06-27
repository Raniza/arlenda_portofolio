import { BaseSeeder } from '@adonisjs/lucid/seeders'
import balance from '../../tmp/json/balance.json' with { type: 'json' }
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

type BalanceType = {
  serial_number: string
  model: string
  start_datetime: string
  upd_datetime: string
  measurements_1: number
  measurements_2: number
  degree_1: number
  degree_2: number
  judgment: number
}

const balanceItems: BalanceType[] = balance as BalanceType[]

export default class BalanceSeeder extends BaseSeeder {
  async run() {
    console.log('✅ Balance seeding start.')

    for (const items of balanceItems) {
      const startDate = DateTime.fromFormat(items.start_datetime, 'M/d/yyyy H:mm')
      const updDate = DateTime.fromFormat(items.upd_datetime, 'M/d/yyyy H:mm')

      await db.table('balances').insert({
        model: items.model,
        serial_number: items.serial_number,
        start_datetime: startDate.isValid ? startDate.toJSDate() : null,
        upd_datetime: updDate.isValid ? updDate.toJSDate() : null,
        measurements_1: items.measurements_1,
        measurements_2: items.measurements_2,
        degree_1: items.degree_1,
        degree_2: items.degree_2,
        judgment: items.judgment === 1 ? true : false,
      })
    }
  }
}
