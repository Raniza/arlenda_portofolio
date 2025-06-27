import { useState } from 'react'
import { Plus, LucideIcon, ChevronsRight } from 'lucide-react'
import { Link } from '@inertiajs/react'

export default function SpeedDial() {
  const [open, setOpen] = useState(false)

  const toggleSpeedDial = () => setOpen(!open)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Action Buttons - muncul ke atas dan rata kanan */}
      <div
        className={`flex flex-col items-end space-y-3 mb-4 transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <SpeedDialAction icon={ChevronsRight} label="Main" url="/" />
        {/* <SpeedDialAction icon={ChevronsRight} label="Edit" />
        <SpeedDialAction icon={ChevronsRight} label="Delete" /> */}
      </div>

      {/* Main FAB */}
      <button
        onClick={toggleSpeedDial}
        className="bg-black/30 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-transform duration-300 cursor-pointer"
      >
        <Plus
          size={16}
          className={`transform transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
        />
      </button>
    </div>
  )
}

type SpeedDialActionProps = {
  icon: LucideIcon
  label: string
  url: string
}

function SpeedDialAction({ icon: Icon, label, url }: SpeedDialActionProps) {
  return (
    <Link
      href={url}
      className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-200 cursor-pointer"
    >
      <Icon size={18} />
      <span className="text-sm">{label}</span>
    </Link>
  )
}
