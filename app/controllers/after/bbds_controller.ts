import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export default class BbdsController {
  async index({ inertia }: HttpContext) {
    const bbd = await db.from('bbd_measurements').orderBy('start_datetime', 'desc').limit(1000)

    return inertia.render('trace/after/bbd', { bbd: bbd })
  }

  async search({ inertia, request }: HttpContext) {
    const params = request.qs()
    let bbd = []

    if (params.mode === 'qr') {
      bbd = await db.from('bbd_measurements').where('serial_number', params.serial_number)
    } else {
      const startDate = DateTime.fromFormat(params.start_date, 'yyyy-MM-dd')
        .startOf('day')
        .toMillis()
      const endDate = DateTime.fromFormat(params.end_date, 'yyyy-MM-dd').endOf('day').toMillis()

      bbd = await db.from('bbd_measurements').whereBetween('start_datetime', [startDate, endDate])
    }

    return inertia.render('trace/after/bbd', { bbd: bbd })
  }
}
