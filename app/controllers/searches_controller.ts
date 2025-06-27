import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class SearchesController {
  async handle({ inertia, request }: HttpContext) {
    const { qr } = request.qs()

    const laser = await db
      .from('lasers')
      .orderBy('start_datetime', 'desc')
      .where('serial_number', qr)
      .first()

    const metal = await db
      .from('metals')
      .orderBy('start_datetime', 'desc')
      .where('serial_number', qr)
      .first()

    const balance = await db
      .from('balances')
      .orderBy('start_datetime', 'desc')
      .where('serial_number', qr)
      .first()

    const bbd = await db
      .from('bbd_measurements')
      .orderBy('start_datetime', 'desc')
      .where('serial_number', qr)
      .first()

    const press = await db
      .from('press_fits')
      .orderBy('start_datetime', 'desc')
      .where('serial_number', qr)
      .first()

    const grease = await db
      .from('greases')
      .orderBy('start_datetime', 'desc')
      .where('serial_number', qr)
      .first()

    const sliding = await db
      .from('slidings')
      .orderBy('start_datetime', 'desc')
      .where('serial_number', qr)
      .first()

    return inertia.render('trace/trace-search', {
      qr: qr,
      laser: laser,
      metal: metal,
      balance: balance,
      bbd: bbd,
      press: press,
      grease: grease,
      sliding: sliding,
    })
  }
}
