import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export default class GreasesController {
  async index({ inertia }: HttpContext) {
    const greases = await db.from('greases').orderBy('start_datetime', 'desc').limit(1000)

    return inertia.render('trace/assy/grease', { greases: greases })
  }

  async search({ inertia, request }: HttpContext) {
    const params = request.qs()
    let greases = []

    if (params.mode === 'qr') {
      greases = await db.from('greases').where('serial_number', params.serial_number)
    } else {
      const startDate = DateTime.fromFormat(params.start_date, 'yyyy-MM-dd')
        .startOf('day')
        .toJSDate()

      const endDate = DateTime.fromFormat(params.end_date, 'yyyy-MM-dd').endOf('day').toJSDate()

      greases = await db.from('greases').whereBetween('start_datetime', [startDate, endDate])
    }

    return inertia.render('trace/assy/grease', { greases: greases })
  }
}
