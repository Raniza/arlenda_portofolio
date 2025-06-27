import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class TracesController {
  async index({ inertia }: HttpContext) {
    const balances = await this.balances()
    const bbd = await this.bbd()
    const press = await this.press()
    const slidings = await this.slidings()

    return inertia.render('trace/trace-home', {
      balances: balances,
      bbd: bbd,
      press: press,
      slidings: slidings,
    })
  }

  async balances() {
    const pi = 3.141592654
    let balances = await db.from('balances').orderBy('start_datetime', 'desc').limit(500)

    balances = balances.map((row) => {
      return {
        measure_1: {
          x: row.measurements_1 * Math.cos((row.degree_1 * pi) / 180),
          y: row.measurements_1 * Math.sin((row.degree_1 * pi) / 180),
        },
        measure_2: {
          x: row.measurements_2 * Math.cos((row.degree_2 * pi) / 180),
          y: row.measurements_2 * Math.sin((row.degree_2 * pi) / 180),
        },
      }
    })

    const standard = []

    for (let index = 0; index <= 360; index += 2) {
      standard.push({
        x: 5 * Math.cos((index * pi) / 180),
        y: 5 * Math.sin((index * pi) / 180),
      })
    }

    const data = {
      standard: standard,
      balances: balances,
    }

    return data
  }

  async bbd() {
    const data = await db
      .from('bbd_measurements')
      .where('bbd_measure_x1', '<>', 0)
      .orderBy('start_datetime', 'desc')
      .limit(500)

    const standard = {
      posA: {
        min: 24.79,
        max: 25.01,
      },
      posB: {
        min: 24.93,
        max: 25.07,
      },
    }
    return { standard: standard, data: data }
  }

  async press() {
    const press = await db.from('press_fits').orderBy('start_datetime', 'desc').limit(500)

    return press
  }

  async slidings() {
    const slidings = db.from('slidings').orderBy('start_datetime', 'desc').limit(500)

    return slidings
  }
}
