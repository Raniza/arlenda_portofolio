import { X } from 'lucide-react'

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-20 transform transition-transform duration-300 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <span className="text-lg font-bold">Menu</span>
        <button onClick={onClose}>
          <X />
        </button>
      </div>
      <nav className="flex flex-col gap-4 p-4 text-gray-700">
        <a href="#about" onClick={onClose}>
          About
        </a>
        <a href="#projects" onClick={onClose}>
          Projects
        </a>
        <a href="#skills" onClick={onClose}>
          Skills
        </a>
        <a href="#contact" onClick={onClose}>
          Contact
        </a>
        <a href="/resume.pdf" onClick={onClose}>
          Resume
        </a>
      </nav>
    </div>
  )
}
