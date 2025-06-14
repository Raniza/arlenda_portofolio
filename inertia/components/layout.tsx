import { ReactNode } from 'react'
import Navbar from './app/menu/navbar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-0 min-h-[calc(100vh-64px)] bg-white">{children}</main>
    </>
  )
}
