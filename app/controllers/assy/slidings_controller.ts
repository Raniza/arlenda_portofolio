import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export default class SlidingsController {
  async index({ inertia }: HttpContext) {
    const slidings = await db.from('slidings').orderBy('start_datetime', 'desc').limit(1000)

    return inertia.render('trace/assy/sliding', { slidings: slidings })
  }

  async search({ inertia, request }: HttpContext) {
    const params = request.qs()
    let slidings = []

    if (params.mode === 'qr') {
      slidings = await db.from('slidings').where('serial_number', params.serial_number)
    } else {
      const startDate = DateTime.fromFormat(params.start_date, 'yyyy-MM-dd')
        .startOf('day')
        .toJSDate()

      const endDate = DateTime.fromFormat(params.end_date, 'yyyy-MM-dd').endOf('day').toJSDate()

      slidings = await db.from('slidings').whereBetween('start_datetime', [startDate, endDate])
    }

    return inertia.render('trace/assy/sliding', { slidings: slidings })
  }
}
