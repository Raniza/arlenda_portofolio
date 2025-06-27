import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'

type SeriesType = {
  name: string
  data: number[]
  color?: string
  type?: string
}

export default function SlidingChart({ data }: any) {
  const [ReactApexChart, setReactApexChart] = useState<any>(null)
  const [isClient, setIsClient] = useState<boolean>(false)

  const [series, setSeries] = useState<SeriesType[]>([
    { name: 'Max Std', data: [] },
    { name: 'Sliding Resistance', data: [] },
  ])

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: [4, 2],
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
      xaxis: {
        lines: { show: false },
      },
    },
    xaxis: {
      min: 0,
      max: 500,
      tickAmount: 39,
      labels: {
        rotate: -90,
      },
      axisTicks: { show: false },
    },
  }

  useEffect(() => {
    const standard = Array(500).fill(115)
    const sliding = data.map((sliding: any) => Number(sliding.sliding_resistance))

    setSeries([
      { name: 'Max Std', data: standard, type: 'line' },
      { name: 'Sliding Resistance', data: sliding, type: 'area' },
    ])

    import('react-apexcharts').then((mod) => {
      setReactApexChart(() => mod.default)
      setIsClient(true)
    })
  }, [])

  return (
    <div className="rounded border border-gray-300">
      <div className="p-2">
        <p className="text-center font-semibold">Sliding Resinstance (Latest - 500 datas)</p>
        <div className="-mx-2 my-2 border-b border-gray-300"></div>
        {isClient && ReactApexChart && (
          <ReactApexChart options={options} series={series} type="area" height={400} />
        )}
      </div>
    </div>
  )
}
