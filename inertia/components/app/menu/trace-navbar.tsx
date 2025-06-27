import { Link, router, usePage } from '@inertiajs/react'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Input } from '~/components/ui/input'

export default function TraceNavbar() {
  const { url } = usePage()
  const [menuOpen, setMenuOpen] = useState<null | 'after' | 'assy'>(null)
  const [qr, setQr] = useState<string>('')

  const handleSearch = () => {
    if (qr.length === 27) {
      router.get('/trace/search', { qr: qr })
    } else {
      alert('QR Code yang dimasukan tidak sesuai standard QR yang sudah ditetapkan.')
    }
  }

  return (
    <nav className="flex items-center justify-start gap-10 bg-blue-950 px-6 py-2 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
        <div className="flex items-center gap-4 text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
          <div className="text-lg">TRACEAbility</div>
        </div>
      </div>

      <div className="flex flex-1 justify-between gap-2">
        <div className="flex flex-1 items-center gap-4">
          <Link
            href="/trace"
            className={`${url === '/trace' ? 'border-b-2 border-white p-1' : 'text-gray-400'} hover:text-gray-300`}
          >
            Home
          </Link>
          <DropdownMenu onOpenChange={(open) => (open ? setMenuOpen('after') : setMenuOpen(null))}>
            <DropdownMenuTrigger
              className={
                url.startsWith('/trace/mach-after')
                  ? 'border-b-2 border-white p-1'
                  : 'text-gray-400'
              }
            >
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                <span>Mach. After</span>
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ease-in-out ${menuOpen && menuOpen == 'after' ? 'rotate-90' : 'rotate-0'}`}
                />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="rounded-none border-none bg-black/80 text-white">
              <DropdownMenuLabel className="px-2 text-sm text-gray-400">
                Machining After HT
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className={`cursor-pointer ${url.startsWith('/trace/mach-after/laser-marking') ? 'text-blue-500' : ''}`}
                asChild
              >
                <Link href="/trace/mach-after/laser-marking">Laser Marking</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`cursor-pointer ${url.startsWith('/trace/mach-after/metal-flow') ? 'text-blue-500' : ''}`}
                asChild
              >
                <Link href="/trace/mach-after/metal-flow">Metal FLow</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem
                className={`cursor-pointer ${url.startsWith('/trace/mach-after/lathe') ? 'text-blue-500' : ''}`}
                asChild
              >
                <Link href="/trace/mach-after/lathe">Lathe</Link>
              </DropdownMenuItem> */}
              <DropdownMenuItem
                className={`cursor-pointer ${url.startsWith('/trace/mach-after/balance') ? 'text-blue-500' : ''}`}
                asChild
              >
                <Link href="/trace/mach-after/balance">Balance</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`cursor-pointer ${url.startsWith('/trace/mach-after/bbd') ? 'text-blue-500' : ''}`}
                asChild
              >
                <Link href="/trace/mach-after/bbd">BBD Measuring</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu onOpenChange={(open) => (open ? setMenuOpen('assy') : setMenuOpen(null))}>
            <DropdownMenuTrigger
              className={`${
                url.startsWith('/trace/assy')
                  ? 'border-b-2 border-white px-2 py-1'
                  : 'text-gray-400'
              } cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                <span>Assy</span>
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ease-in-out ${menuOpen && menuOpen == 'assy' ? 'rotate-90' : 'rotate-0'}`}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-none border-none bg-black/80 text-white">
              <DropdownMenuLabel className="px-2 text-sm text-gray-400">Assy</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={`cursor-pointer ${url.startsWith('/trace/assy/press') ? 'text-blue-500' : ''}`}
                asChild
              >
                <Link href="/trace/assy/press">Press Fit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`cursor-pointer ${url.startsWith('/trace/assy/grease') ? 'text-blue-500' : ''}`}
                asChild
              >
                <Link href="/trace/assy/grease">Grease</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`cursor-pointer ${url.startsWith('/trace/assy/sliding') ? 'text-blue-500' : ''}`}
                asChild
              >
                <Link href="/trace/assy/sliding">Sliding Resistance</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="QR Code ..."
            onChange={(e) => setQr(e.target.value)}
            className="focus-visible:border-0 focus-visible:ring-blue-500"
          />
          <Button
            type="button"
            onClick={handleSearch}
            className="cursor-pointer border bg-transparent hover:bg-green-500"
          >
            Search
          </Button>
        </div>
      </div>
    </nav>
  )
}
