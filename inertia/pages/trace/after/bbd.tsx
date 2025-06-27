import { Head, router } from '@inertiajs/react'
import { DateTime } from 'luxon'
import { useState } from 'react'
import SearchBox from '~/components/app/search-box'
import TraceLayout from '~/components/trace-layout'
import { formatDateOnly } from '~/lib/utils'

export type BbdType = {
  serial_number: string
  model: string
  start_datetime: number
  upd_datetime: number
  bbd_measure_x1: number
  bbd_measure_y1: number
  bbd_measure_x5: number
  bbd_measure_y5: number
  judgment: number
}

export default function Bbd({ bbd }: { bbd: BbdType[] }) {
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

    router.get('/trace/mach-after/search/bbd', searchParams, {
      onError: (error) => console.log(error),
    })
  }

  const TABLE_HEAD = [
    '#',
    'Serial No',
    'Model',
    'Start',
    'End',
    'BBD Measure X1',
    'BBD Measure Y1',
    'BBD Measure X5',
    'BBD Measure Y5',
    'Judge',
  ]

  return (
    <>
      <Head title="BBD">
        <meta
          name="description"
          content="Traceability system perusahaan manufaktur - Proses BBD Measuring"
        />
      </Head>

      <TraceLayout>
        <SearchBox
          title="BBD Measurement"
          serialNumber={serialNumber}
          setSerialNumber={setSerialNumber}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          action={handleSearch}
          parentUrl={'/trace/mach-after/bbd'}
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
                {bbd.length ? (
                  bbd.map((meas: BbdType, index: number) => {
                    const isLast = index === bbd.length - 1
                    const classes = isLast ? 'p-2' : 'p-2 border-b border-gray-300'

                    return (
                      <tr key={index}>
                        <td className={`${classes}`}>{index + 1}</td>
                        <td className={`${classes}`}>{meas.serial_number}</td>
                        <td className={`${classes}`}>{meas.model}</td>
                        <td className={`${classes}`}>
                          {DateTime.fromMillis(meas.start_datetime)
                            .toUTC()
                            .toFormat('yyyy-MM-dd HH:mm:ss')}
                        </td>
                        <td className={`${classes}`}>
                          {DateTime.fromMillis(meas.upd_datetime)
                            .toUTC()
                            .toFormat('yyyy-MM-dd HH:mm:ss')}
                        </td>
                        <td className={`${classes}`}>{meas.bbd_measure_x1}</td>
                        <td className={`${classes}`}>{meas.bbd_measure_y1}</td>
                        <td className={`${classes}`}>{meas.bbd_measure_x5}</td>
                        <td className={`${classes}`}>{meas.bbd_measure_y5}</td>
                        <td
                          className={`${classes} ${meas.judgment === 1 ? 'text-green-600' : 'text-red-500'} font-semibold`}
                        >
                          {meas.judgment === 1 ? 'OK' : 'NG'}
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
