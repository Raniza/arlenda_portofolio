import { Head, router } from '@inertiajs/react'
import { DateTime } from 'luxon'
import { useState } from 'react'
import SearchBox from '~/components/app/search-box'
import TraceLayout from '~/components/trace-layout'
import { formatDateOnly } from '~/lib/utils'

export type PressType = {
  serial_number: string
  model: string
  start_datetime: number
  upd_datetime: number
  bush_loadstroke: number
  oil_seal_stroke: number
  judgment: number
}

export default function PressFit({ press }: { press: PressType[] }) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const [serialNumber, setSerialNumber] = useState<string>('')

  const handleSearch = (mode: string) => {
    let searchParams = {}

    if (mode === 'qr') {
      searchParams = {
        mode: 'qr',
        serial_number: serialNumber,
      }
    } else {
      searchParams = {
        mode: 'date',
        start_date: formatDateOnly(startDate),
        end_date: formatDateOnly(endDate),
      }
    }

    router.get('/trace/assy/search/press', searchParams, {
      onError: (error) => console.log(error),
    })
  }

  const TABLE_HEAD = [
    '#',
    'Serial No',
    'Model',
    'Start',
    'End',
    'Bush Load Stroke',
    'Oil Seal Stroke',
    'Judge',
  ]

  return (
    <>
      <Head title="Press Fit">
        <meta
          name="description"
          content="Traceability system perusahaan manufaktur - Proses Press Fit"
        />
      </Head>

      <TraceLayout>
        <SearchBox
          title="Press Fit"
          serialNumber={serialNumber}
          setSerialNumber={setSerialNumber}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          action={handleSearch}
          parentUrl={'/trace/assy/press'}
        />

        <div className="grid gap-2">
          <div className="mb-2 overflow-x-auto">
            <table className="mt-2 w-full table-auto text-center text-sm">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-gray-400 bg-gray-50/50 p-2 font-semibold"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {press.length ? (
                  press.map((pf: PressType, index: number) => {
                    const isLast = index === press.length - 1
                    const classes = isLast ? 'p-2' : 'p-2 border-b border-gray-300'

                    return (
                      <tr key={index}>
                        <td className={`${classes}`}>{index + 1}</td>
                        <td className={`${classes}`}>{pf.serial_number}</td>
                        <td className={`${classes}`}>{pf.model}</td>
                        <td className={`${classes}`}>
                          {DateTime.fromMillis(pf.start_datetime)
                            .toUTC()
                            .toFormat('yyyy-MM-dd HH:mm:ss')}
                        </td>
                        <td className={`${classes}`}>
                          {DateTime.fromMillis(pf.upd_datetime)
                            .toUTC()
                            .toFormat('yyyy-MM-dd HH:mm:ss')}
                        </td>
                        <td className={`${classes}`}>{pf.bush_loadstroke}</td>
                        <td className={`${classes}`}>{pf.oil_seal_stroke}</td>
                        <td
                          className={`${classes} ${pf.judgment === 1 ? 'text-green-600' : 'text-red-500'} font-semibold`}
                        >
                          {pf.judgment === 1 ? 'OK' : 'NG'}
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={TABLE_HEAD.length} className="py-3 font-semibold text-gray-700">
                      No Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </TraceLayout>
    </>
  )
}
