import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class MetalFlowsController {
  async index({ inertia }: HttpContext) {
    const metal_flow = await db.from('metals').orderBy('start_datetime', 'desc').limit(1000)
    // console.log(metal_flow)

    return inertia.render('trace/after/metal-flow', { metal_flow: metal_flow })
  }

  async search({ inertia, request }: HttpContext) {
    const params = request.qs()
    let metal_flow = []

    if (params.mode === 'qr') {
      metal_flow = await db.from('metals').where('serial_number', params.serial_number)
    } else {
      const startDate = DateTime.fromFormat(params.start_date, 'yyyy-MM-dd')
        .startOf('day')
        .toJSDate()

      const endDate = DateTime.fromFormat(params.end_date, 'yyyy-MM-dd').endOf('day').toJSDate()

      metal_flow = await db.from('metals').whereBetween('start_datetime', [startDate, endDate])
    }

    return inertia.render('trace/after/metal-flow', { metal_flow: metal_flow })
  }
}
