import { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from './sidebar'

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <>
      <nav className="bg-white border-b shadow-xs px-2 md:px-6 fixed top-0 w-full z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* <div className="text-lg font-bold">MyPortfolio</div> */}

          <div className="flex items-center gap-4 text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
            <div className="text-2xl">
              A<span className="-ml-1">F</span>
            </div>
            <span className="text-gray-800">Arlenda Fitranto</span>
          </div>

          <div className="hidden md:flex gap-6 text-gray-700">
            <a href="#about" className="hover:text-blue-500">
              About
            </a>
            <a href="#projects" className="hover:text-blue-500">
              Projects
            </a>
            <a href="#skills" className="hover:text-blue-500">
              Skills
            </a>
            <a href="#contact" className="hover:text-blue-500">
              Contact
            </a>
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
