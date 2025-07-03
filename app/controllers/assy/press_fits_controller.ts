import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export default class PressFitsController {
  async index({ inertia }: HttpContext) {
    const press = await db.from('press_fits').orderBy('start_datetime', 'desc').limit(1000)

    return inertia.render('trace/assy/press-fit', { press: press })
  }

  async search({ inertia, request }: HttpContext) {
    const params = request.qs()
    let press = []

    if (params.mode === 'qr') {
      press = await db.from('press_fits').where('serial_number', params.serial_number)
    } else {
      const startDate = DateTime.fromFormat(params.start_date, 'yyyy-MM-dd')
        .startOf('day')
        .toJSDate()

      const endDate = DateTime.fromFormat(params.end_date, 'yyyy-MM-dd').endOf('day').toJSDate()

      press = await db.from('press_fits').whereBetween('start_datetime', [startDate, endDate])
    }

    return inertia.render('trace/assy/press-fit', { press: press })
  }
}
