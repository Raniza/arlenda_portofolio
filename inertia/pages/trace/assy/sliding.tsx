import { Head, router } from '@inertiajs/react'
import { DateTime } from 'luxon'
import { useState } from 'react'
import SearchBox from '~/components/app/search-box'
import TraceLayout from '~/components/trace-layout'
import { formatDateOnly } from '~/lib/utils'

export type SlidingType = {
  serial_number: string
  model: string
  start_datetime: number
  upd_datetime: number
  sliding_resistance: number
  judgment: number
}

export default function Sliding({ slidings }: { slidings: SlidingType[] }) {
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

    router.get('/trace/assy/search/sliding', searchParams, {
      onError: (error) => console.log(error),
    })
  }

  const TABLE_HEAD = ['#', 'Serial No', 'Model', 'Start', 'End', 'Sliding Resistance', 'Judge']

  return (
    <>
      <Head title="Sliding">
        <meta
          name="description"
          content="Traceability system perusahaan manufaktur - Proses Sliding Resistance"
        />
      </Head>

      <TraceLayout>
        <SearchBox
          title="Sliding Resistance"
          serialNumber={serialNumber}
          setSerialNumber={setSerialNumber}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          action={handleSearch}
          parentUrl={'/trace/assy/sliding'}
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
                {slidings.length ? (
                  slidings.map((sliding: SlidingType, index: number) => {
                    const isLast = index === slidings.length - 1
                    const classes = isLast ? 'p-2' : 'p-2 border-b border-gray-300'

                    return (
                      <tr key={index}>
                        <td className={`${classes}`}>{index + 1}</td>
                        <td className={`${classes}`}>{sliding.serial_number}</td>
                        <td className={`${classes}`}>{sliding.model}</td>
                        <td className={`${classes}`}>
                          {DateTime.fromMillis(sliding.start_datetime)
                            .toUTC()
                            .toFormat('yyyy-MM-dd HH:mm:ss')}
                        </td>
                        <td className={`${classes}`}>
                          {DateTime.fromMillis(sliding.upd_datetime)
                            .toUTC()
                            .toFormat('yyyy-MM-dd HH:mm:ss')}
                        </td>
                        <td className={`${classes}`}>{sliding.sliding_resistance}</td>
                        <td
                          className={`${classes} ${sliding.judgment === 1 ? 'text-green-600' : 'text-red-500'} font-semibold`}
                        >
                          {sliding.judgment === 1 ? 'OK' : 'NG'}
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
