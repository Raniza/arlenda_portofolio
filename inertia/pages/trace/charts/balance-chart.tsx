import { useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import { Loader } from 'lucide-react'

type PointType = { x: number; y: number }

type MeasureBalanceType = {
  measure_1: PointType
  measure_2: PointType
}

type BalanceDataType = {
  standard: PointType[]
  balances: MeasureBalanceType[]
}

export default function BalanceChart({ data }: { data: BalanceDataType }) {
  const [ReactApexChart, setReactApexChart] = useState<any>(null)
  const [isClient, setIsClient] = useState<boolean>(false)

  const [series, setSeries] = useState([
    { name: 'Standard', data: [] as PointType[] },
    { name: 'Measure #1', data: [] as PointType[] },
    { name: 'Measure #2', data: [] as PointType[] },
  ])

  const options: ApexOptions = {
    chart: {
      type: 'scatter',
      zoom: { enabled: false, type: 'xy' },
      toolbar: { show: false },
    },
    markers: { size: [4, 4, 4] },
    xaxis: {
      min: -6,
      max: 6,
      stepSize: 2,
      tickAmount: 10,
      labels: {
        formatter: (val: any) => val.toFixed(1),
      },
    },
    yaxis: {
      min: -6,
      max: 6,
      stepSize: 2,
      tickAmount: 7,
      labels: {
        formatter: (val: number) => (val % 1 === 0 ? val.toString() : val.toFixed(2)),
      },
    },
  }

  useEffect(() => {
    const balance1 = data.balances.map((item: any) => item.measure_1)
    const balance2 = data.balances.map((item: any) => item.measure_2)

    setSeries([
      { name: 'Standard', data: data.standard },
      { name: 'Measure #1', data: balance1 },
      { name: 'Measure #2', data: balance2 },
    ])

    import('react-apexcharts').then((mod) => {
      setReactApexChart(() => mod.default)
      setIsClient(true)
    })
  }, [])

  return (
    <div className="grid">
      <div className="rounded border border-gray-300">
        <div className="p-2">
          <p className="text-center font-semibold">Balance (Latest - 500 datas)</p>
          <div className="-mx-2 my-2 border-b border-gray-300"></div>
          {isClient && ReactApexChart && (
            <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
              {isClient && ReactApexChart ? (
                <ReactApexChart
                  options={options}
                  series={series}
                  type="scatter"
                  width="100%"
                  height="100%"
                />
              ) : (
                <div className="flex gap-4">
                  <Loader className="animate-spin w-5 h-5" /> Loading...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
