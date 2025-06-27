import type { HttpContext } from '@adonisjs/core/http'

export default class LathesController {
  async index({ inertia }: HttpContext) {
    return inertia.render('trace/after/lathe')
  }
}
