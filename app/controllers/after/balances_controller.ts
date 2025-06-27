import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export default class BalancesController {
  async index({ inertia }: HttpContext) {
    const balances = await db.from('balances').orderBy('start_datetime', 'desc').limit(1000)

    return inertia.render('trace/after/balance', { balances: balances })
  }

  async search({ inertia, request }: HttpContext) {
    const params = request.qs()
    let balances = []

    if (params.mode === 'qr') {
      balances = await db.from('balances').where('serial_number', params.serial_number)
    } else {
      const startDate = DateTime.fromFormat(params.start_date, 'yyyy-MM-dd')
        .startOf('day')
        .toMillis()
      const endDate = DateTime.fromFormat(params.end_date, 'yyyy-MM-dd').endOf('day').toMillis()

      balances = await db.from('balances').whereBetween('start_datetime', [startDate, endDate])
    }

    return inertia.render('trace/after/balance', { balances: balances })
  }
}
