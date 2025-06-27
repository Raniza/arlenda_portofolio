import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'

type SeriesType = {
  name: string
  data: number[]
  color?: string
}

export default function PressChart({ data }: any) {
  const [ReactApexChart, setReactApexChart] = useState<any>(null)
  const [isClient, setIsClient] = useState<boolean>(false)

  const [seriesBush, setSeriesBush] = useState<SeriesType[]>([
    { name: 'Standard', data: [] },
    { name: 'Bush', data: [] },
  ])

  const [seriesOilSeal, setSeriesOilSeal] = useState<SeriesType[]>([
    { name: 'Standard', data: [] },
    { name: 'Oil Seal', data: [] },
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
      curve: 'straight',
      width: [2, 0],
    },
    markers: {
      size: [0, 3],
      colors: ['#FF4560', '#008000'],
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
      tickAmount: 24,
      labels: {
        rotate: -90,
      },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 50,
      max: 110,
    },
  }

  useEffect(() => {
    const minBushStd = Array(500).fill(65)
    const bushData = data.map((pf: any) => Number(pf.bush_loadstroke))

    const minOilSealStd = Array(500).fill(100)
    const oilSealData = data.map((pf: any) => Number(pf.oil_seal_stroke))

    setSeriesBush([
      { name: 'Standard', data: minBushStd },
      { name: 'Bush', data: bushData },
    ])

    setSeriesOilSeal([
      { name: 'Standard', data: minOilSealStd },
      { name: 'Oil Seal', data: oilSealData },
    ])

    import('react-apexcharts').then((mod) => {
      setReactApexChart(() => mod.default)
      setIsClient(true)
    })
  }, [])

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded border border-gray-300">
          <div className="p-2">
            <p className="text-center font-semibold">Press Data - Bush (Latest - 500 datas)</p>
            <div className="-mx-2 my-2 border-b border-gray-300"></div>
            {isClient && ReactApexChart && (
              <ReactApexChart options={options} series={seriesBush} type="line" />
            )}
          </div>
        </div>

        <div className="rounded border border-gray-300">
          <div className="p-2">
            <p className="text-center font-semibold">Press Data - Oil Seal (Latest - 500 datas)</p>
            <div className="-mx-2 my-2 border-b border-gray-300"></div>
            {isClient && ReactApexChart && (
              <ReactApexChart options={options} series={seriesOilSeal} type="line" />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
