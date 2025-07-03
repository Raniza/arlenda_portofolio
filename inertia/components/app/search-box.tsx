import { Dispatch, SetStateAction } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '~/lib/utils'
import { router } from '@inertiajs/react'

type SearchDataType = {
  title: string
  parentUrl: string

  serialNumber: string
  setSerialNumber: Dispatch<SetStateAction<string>>

  startDate: Date | undefined
  setStartDate: Dispatch<SetStateAction<Date | undefined>>

  endDate: Date | undefined
  setEndDate: Dispatch<SetStateAction<Date | undefined>>

  action: (mode: 'qr' | 'date' | 'download') => void
}

export default function SearchBox({
  title,
  parentUrl,
  serialNumber,
  setSerialNumber,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  action,
}: SearchDataType) {
  const handleReset = () => {
    setSerialNumber('')
    setStartDate(undefined)
    setEndDate(undefined)
    // console.log(parentUrl)

    router.get(parentUrl)
  }
  return (
    <div className="rounded border border-gray-300 p-3">
      <div className="grid gap-2">
        <div className="flex justify-between">
          <p>
            Search data for <span className="font-semibold text-blue-500">{title}</span>
          </p>
          <p className="cursor-pointer text-gray-500 hover:text-black" onClick={handleReset}>
            Reset Filter
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 px-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="qr">QR Code / Serial Number</Label>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                disabled={startDate !== undefined || endDate !== undefined}
                type="text"
                id="qr"
                placeholder="By QR Code ..."
                className="focus-visible:ring-1 focus-visible:ring-blue-400"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
              <Button
                disabled={startDate !== undefined || endDate !== undefined}
                onClick={() => action('qr')}
                size="sm"
                type="button"
                className="cursor-pointer rounded-xs border border-green-500 bg-transparent text-green-500 hover:bg-green-500 hover:text-white"
              >
                Search
              </Button>
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="castingLot">Register Date</Label>
            <div className="flex items-center justify-start gap-0">
              {/* Start Date */}
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={serialNumber !== ''}
                      variant="outline"
                      className={cn(
                        'max-w-48 justify-start rounded-e-none border-e-0 text-left font-normal',
                        !startDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? startDate.toLocaleDateString() : <span>Start date</span>}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      month={new Date(2025, 5, 1)}
                      fromMonth={new Date(2025, 3, 11)}
                      toMonth={new Date(2025, 5, 10)}
                      disabled={(date) =>
                        date < new Date(2025, 3, 11) || date > new Date(2025, 5, 10)
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* End Date */}
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={serialNumber !== ''}
                      variant="outline"
                      className={cn(
                        'max-w-48 justify-start rounded-s-none text-left font-normal',
                        !endDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? endDate.toLocaleDateString() : <span>End date</span>}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      month={new Date(2025, 5, 1)}
                      fromMonth={new Date(2025, 3, 11)}
                      toMonth={new Date(2025, 5, 10)}
                      disabled={(date) =>
                        date < new Date(2025, 3, 11) || date > new Date(2025, 5, 10)
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center gap-0 px-2">
                <Button
                  disabled={serialNumber !== ''}
                  onClick={() => action('date')}
                  size="sm"
                  type="button"
                  className="cursor-pointer rounded-xs rounded-e-none border border-e-0 border-green-500 bg-transparent px-2 text-green-500 hover:bg-green-500 hover:text-white"
                >
                  Search
                </Button>

                <a
                  href="#"
                  className={`rounded-xs rounded-s-none border border-green-500 px-2 py-[3.5px] ${startDate === undefined || endDate === undefined ? 'cursor-not-allowed bg-gray-300 text-gray-500' : 'cursor-pointer bg-transparent text-green-500 hover:bg-green-500 hover:text-white'}`}
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
