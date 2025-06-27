/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const TraceController = () => import('#controllers/traces_controller')
const LaserMarkingController = () => import('#controllers/after/laser_markings_controller')
const MetalFlowController = () => import('#controllers/after/metal_flows_controller')
const LatheController = () => import('#controllers/after/lathes_controller')
const BalanceController = () => import('#controllers/after/balances_controller')
const BbdController = () => import('#controllers/after/bbds_controller')
const PressFitController = () => import('#controllers/assy/press_fits_controller')
const GreaseController = () => import('#controllers/assy/greases_controller')
const SlidingController = () => import('#controllers/assy/slidings_controller')
const SearchController = () => import('#controllers/searches_controller')

router.on('/').renderInertia('home')

/* ------------------------------ Traceability ------------------------------ */
router
  .group(() => {
    router.get('/', [TraceController, 'index']) //Home trace ability

    /* --------------------------- Machining After HT --------------------------- */
    router
      .group(() => {
        router.get('/laser-marking', [LaserMarkingController, 'index'])
        router.get('search/laser-marking', [LaserMarkingController, 'search'])

        router.get('/metal-flow', [MetalFlowController, 'index'])
        router.get('search/metal-flow', [MetalFlowController, 'search'])

        router.get('lathe', [LatheController, 'index'])

        router.get('/balance', [BalanceController, 'index'])
        router.get('search/balance', [BalanceController, 'search'])

        router.get('/bbd', [BbdController, 'index'])
        router.get('search/bbd', [BbdController, 'search'])
      })
      .prefix('mach-after')

    /* ---------------------------------- Assy ---------------------------------- */
    router
      .group(() => {
        router.get('/press', [PressFitController, 'index'])
        router.get('search/press', [PressFitController, 'search'])

        router.get('/grease', [GreaseController, 'index'])
        router.get('search/grease', [GreaseController, 'search'])

        router.get('/sliding', [SlidingController, 'index'])
        router.get('search/sliding', [SlidingController, 'search'])
      })
      .prefix('assy')

    router.get('search', [SearchController])
  })
  .prefix('trace')
