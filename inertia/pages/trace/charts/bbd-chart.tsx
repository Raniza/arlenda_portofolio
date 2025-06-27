import { ApexOptions } from 'apexcharts'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'

type SeriesType = {
  name: string
  data: number[]
  color?: string
}

export default function BbdChart({ data }: any) {
  const [ReactApexChart, setReactApexChart] = useState<any>(null)
  const [isClient, setIsClient] = useState<boolean>(false)

  const [seriesA, setSeriesA] = useState<SeriesType[]>([
    { name: 'Min Std', data: [] },
    { name: 'Max Std', data: [] },
    { name: 'X1', data: [] },
    { name: 'Y1', data: [] },
  ])
  const [seriesB, setSeriesB] = useState<SeriesType[]>([
    { name: 'Min Std', data: [] },
    { name: 'Max Std', data: [] },
    { name: 'X1', data: [] },
    { name: 'Y1', data: [] },
  ])

  const optionsA: ApexOptions = {
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
      width: 2,
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
      min: 24.7,
      max: 25.1,
    },
  }

  const optionsB: ApexOptions = {
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
      width: 2,
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
      min: 24.7,
      max: 25.1,
    },
  }

  useEffect(() => {
    const bbdData = data.data

    const minStdA = Array(500).fill(data.standard.posA.min)
    const maxStdA = Array(500).fill(data.standard.posA.max)
    const bbdX1 = bbdData.map((bbd: any) => Number(bbd.bbd_measure_x1))
    const bbdY1 = bbdData.map((bbd: any) => Number(bbd.bbd_measure_y1))

    const minStdB = Array(500).fill(data.standard.posB.min)
    const maxStdB = Array(500).fill(data.standard.posB.max)
    const bbdX5 = bbdData.map((bbd: any) => Number(bbd.bbd_measure_x5))
    const bbdY5 = bbdData.map((bbd: any) => Number(bbd.bbd_measure_y5))

    setSeriesA([
      { name: 'Min Std', data: minStdA, color: '#FF0000' },
      { name: 'Max Std', data: maxStdA, color: '#FF0000' },
      { name: 'X1', data: bbdX1, color: '#0000FF' },
      { name: 'Y1', data: bbdY1, color: '#008000' },
    ])

    setSeriesB([
      { name: 'Min Std', data: minStdB, color: '#FF0000' },
      { name: 'Max Std', data: maxStdB, color: '#FF0000' },
      { name: 'X1', data: bbdX5, color: '#0000FF' },
      { name: 'Y1', data: bbdY5, color: '#008000' },
    ])

    import('react-apexcharts').then((mod) => {
      setReactApexChart(() => mod.default)
      setIsClient(true)
    })
  }, [])

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded border border-gray-300">
        <div className="p-2">
          <p className="text-center font-semibold">BBD Position #A (Latest - 500 datas)</p>
          <div className="-mx-2 my-2 border-b border-gray-300"></div>
          {isClient && ReactApexChart ? (
            <ReactApexChart options={optionsA} series={seriesA} type="line" />
          ) : (
            <div className="flex gap-4">
              <Loader className="animate-spin w-5 h-5" /> Loading...
            </div>
          )}
        </div>
      </div>
      <div className="rounded border border-gray-300">
        <div className="p-2">
          <p className="text-center font-semibold">BBD Position #B (Latest - 500 datas)</p>
          <div className="-mx-2 my-2 border-b border-gray-300"></div>
          {isClient && ReactApexChart ? (
            <ReactApexChart options={optionsB} series={seriesB} type="line" />
          ) : (
            <div className="flex gap-4">
              <Loader className="animate-spin w-5 h-5" /> Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
