import { Head } from '@inertiajs/react'
import { Printer } from 'lucide-react'
import TraceLayout from '~/components/trace-layout'
import { LaserItemType } from './after/laser-marking'
import QRCode from 'react-qr-code'
import { useEffect, useState } from 'react'
import LaserTable from './tables/laser-table'
import MetalFlowTable from './tables/metal-flow-table'
import { MetalFlowType } from './after/metal-flow'
import BalanceTable from './tables/balance-table'
import { BalanceType } from './after/balance'
import { BbdType } from './after/bbd'
import BbdTable from './tables/bbd-table'
import { PressType } from './assy/press-fit'
import PressTable from './tables/press-table'
import { GreaseType } from './assy/grease'
import GreaseTable from './tables/grease-table'
import SlidingTable from './tables/sliding-table'
import { SlidingType } from './assy/sliding'

type SerachPropsType = {
  qr: string
  laser: LaserItemType
  metal: MetalFlowType
  balance: BalanceType
  bbd: BbdType
  press: PressType
  grease: GreaseType
  sliding: SlidingType
}

export default function Search({
  qr,
  laser,
  metal,
  balance,
  bbd,
  press,
  grease,
  sliding,
}: SerachPropsType) {
  const [isClient, setIsClient] = useState(false)

  const thClasses = 'border border-gray-400 bg-gray-50/50 p-2 font-semibold'
  const tdClasses = 'border-x border-b border-gray-300 p-2'

  const handlePrint = () => {
    print()
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <Head title="Search">
        <meta
          name="description"
          content="Traceability system perusahaan manufaktur - Hasil Search"
        />
      </Head>

      <TraceLayout>
        <div className="grid gap-2">
          <div className="flex justify-between">
            <button onClick={handlePrint}>
              <div className="flex cursor-pointer items-center gap-2 text-blue-500">
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </div>
            </button>
          </div>

          <div className="border-b border-gray-300"></div>

          <div className="grid gap-0 print-area">
            <div className="flex justify-between">
              <div>
                <p>
                  QR: <b>{qr}</b>
                </p>
                <p>
                  Model: <b>{laser ? laser.model : '-'}</b>
                </p>
              </div>

              {isClient && <QRCode value={qr} size={80} level="H" />}
            </div>

            <LaserTable thClasses={thClasses} tdClasses={tdClasses} laser={laser} />
            <MetalFlowTable thClasses={thClasses} tdClasses={tdClasses} metal={metal} />
            <BalanceTable thClasses={thClasses} tdClasses={tdClasses} balance={balance} />
            <BbdTable thClasses={thClasses} tdClasses={tdClasses} bbd={bbd} />
            <PressTable thClasses={thClasses} tdClasses={tdClasses} press={press} />
            <GreaseTable thClasses={thClasses} tdClasses={tdClasses} grease={grease} />
            <SlidingTable thClasses={thClasses} tdClasses={tdClasses} sliding={sliding} />
          </div>
        </div>
      </TraceLayout>
    </>
  )
}
