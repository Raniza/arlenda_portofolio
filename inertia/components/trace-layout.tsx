import { ReactNode } from 'react'
import TraceNavbar from './app/menu/trace-navbar'
import SpeedDial from './ui/speed-dial'

export default function TraceLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TraceNavbar />
      <SpeedDial />
      <main className="px-10 py-2 min-h-[calc(100vh-64px)] bg-white">{children}</main>
    </>
  )
}
