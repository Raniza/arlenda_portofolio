import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class LaserMarkingsController {
  async index({ inertia }: HttpContext) {
    const lasers = await db.from('lasers').orderBy('start_datetime', 'desc').limit(1000)
    return inertia.render('trace/after/laser-marking', { lasers: lasers })
  }

  async search({ inertia, request }: HttpContext) {
    const params = request.qs()
    let lasers = []

    if (params.mode === 'qr') {
      lasers = await db.from('lasers').where('serial_number', params.serial_number)
    } else {
      const startDate = DateTime.fromFormat(params.start_date, 'yyyy-MM-dd')
        .startOf('day')
        .toMillis()
      const endDate = DateTime.fromFormat(params.end_date, 'yyyy-MM-dd').endOf('day').toMillis()

      lasers = await db.from('lasers').whereBetween('start_datetime', [startDate, endDate])
    }

    return inertia.render('trace/after/laser-marking', { lasers: lasers })
  }
}
