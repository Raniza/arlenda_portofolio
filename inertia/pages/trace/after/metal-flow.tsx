import { Head, router } from '@inertiajs/react'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import SearchBox from '~/components/app/search-box'
import TraceLayout from '~/components/trace-layout'
import { formatDateOnly } from '~/lib/utils'

export type MetalFlowType = {
  serial_number: string
  model: string
  start_datetime: string
  upd_datetime: string
  peak_pressure: number
  peak_pressure_load_cell: number
  judgment: number
}

export default function MetalFlow({ metal_flow }: { metal_flow: MetalFlowType[] }) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  //   console.log(metal_flow)

  const [isClient, setIsclient] = useState<boolean>(false)

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

    router.get('/trace/mach-after/search/metal-flow', searchParams, {
      onError: (error) => console.log(error),
    })
  }

  const TABLE_HEAD = [
    '#',
    'Serial No',
    'Model',
    'Start',
    'End',
    'Peak Pressure Std.',
    'Peak Pressure Act.',
    'Judge',
  ]

  useEffect(() => {
    setIsclient(true)
  }, [])

  return (
    <>
      <Head title="Metal Flow">
        <meta
          name="description"
          content="Traceability system perusahaan manufaktur - Proses Press Fit / Metal Flow"
        />
      </Head>

      <TraceLayout>
        <SearchBox
          title="Metal Flow"
          serialNumber={serialNumber}
          setSerialNumber={setSerialNumber}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          action={handleSearch}
          parentUrl={'/trace/mach-after/metal-flow'}
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
                {metal_flow.length ? (
                  metal_flow.map((mf: MetalFlowType, index: number) => {
                    const isLast = index === metal_flow.length - 1
                    const classes = isLast ? 'p-2' : 'p-2 border-b border-gray-300'

                    return (
                      <tr key={index}>
                        <td className={`${classes}`}>{index + 1}</td>
                        <td className={`${classes}`}>{mf.serial_number}</td>
                        <td className={`${classes}`}>{mf.model}</td>
                        <td className={`${classes}`}>
                          {isClient
                            ? DateTime.fromISO(mf.start_datetime)
                                .toUTC()
                                .toFormat('yyyy-MM-dd HH:mm:ss')
                            : ''}
                        </td>
                        <td className={`${classes}`}>
                          {isClient
                            ? DateTime.fromISO(mf.upd_datetime)
                                .toUTC()
                                .toFormat('yyyy-MM-dd HH:mm:ss')
                            : ''}
                        </td>
                        <td className={`${classes}`}>{mf.peak_pressure}</td>
                        <td className={`${classes}`}>{mf.peak_pressure_load_cell}</td>
                        <td
                          className={`${classes} ${mf.judgment === 1 ? 'text-green-600' : 'text-red-500'} font-semibold`}
                        >
                          {mf.judgment === 1 ? 'OK' : 'NG'}
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
