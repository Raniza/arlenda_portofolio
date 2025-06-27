import { DateTime } from 'luxon'
import { SlidingType } from '../assy/sliding'

export type TablePropsType = {
  thClasses: string
  tdClasses: string
  sliding: SlidingType
}

export default function SlidingTable({ thClasses, tdClasses, sliding }: TablePropsType) {
  return (
    <div className="grid gap-0 mt-4">
      <label className="text-gray-400">Sliding Resistance Data</label>
      <table className="mt-2 w-full table-auto text-center text-sm">
        <thead className="bg-blue-400">
          <tr>
            <th className={`${thClasses}`}>#</th>
            <th className={`${thClasses}`}>Start Date</th>
            <th className={`${thClasses}`}>Sliding Resistance</th>
            <th className={`${thClasses}`}>Judge</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {sliding ? (
              <>
                <td className={`${tdClasses} w-10`}>#</td>

                <td className={`${tdClasses}`}>
                  {DateTime.fromMillis(sliding.start_datetime)
                    .toUTC()
                    .toFormat('yyyy-MM-dd HH:mm:ss')}
                </td>
                <td className={`${tdClasses}`}>{sliding.sliding_resistance}</td>
                <td
                  className={`font-semibold ${tdClasses} ${sliding.judgment === 1 ? 'text-green-600' : 'text-red-500'} w-10`}
                >
                  {sliding.judgment === 1 ? 'OK' : 'NG'}
                </td>
              </>
            ) : (
              <td colSpan={4}>No Data</td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
