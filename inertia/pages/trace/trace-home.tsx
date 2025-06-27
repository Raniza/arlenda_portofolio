import { Head } from '@inertiajs/react'
import TraceLayout from '~/components/trace-layout'
import BalanceChart from './charts/balance-chart'
import BbdChart from './charts/bbd-chart'
import PressChart from './charts/press-chart'
import SlidingChart from './charts/sliding-chart'

export default function TraceHome({ balances, bbd, press, slidings }: any) {
  return (
    <>
      <Head title="Home">
        <meta name="description" content="Traceability system perusahaan manufaktur" />
      </Head>

      <TraceLayout>
        <div className="grid gap-4">
          <BalanceChart data={balances} />
          <BbdChart data={bbd} />
          <PressChart data={press} />
          <SlidingChart data={slidings} />
        </div>
      </TraceLayout>
    </>
  )
}
