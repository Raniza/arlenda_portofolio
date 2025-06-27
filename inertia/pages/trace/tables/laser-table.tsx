import { DateTime } from 'luxon'
import { LaserItemType } from '../after/laser-marking'

export type TablePropsType = {
  thClasses: string
  tdClasses: string
  laser: LaserItemType
}

export default function LaserTable({ thClasses, tdClasses, laser }: TablePropsType) {
  return (
    <div className="grid gap-0 mt-4">
      <label className="text-gray-400">Laser Marking Data</label>
      <table className="mt-2 w-full table-auto text-center text-sm">
        <thead className="bg-blue-400">
          <tr>
            <th className={`${thClasses}`}>#</th>
            <th className={`${thClasses}`}>Start Date</th>
            <th className={`${thClasses}`}>Judge</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {laser ? (
              <>
                <td className={`${tdClasses} w-10`}>#</td>
                <td className={`${tdClasses}`}>
                  {DateTime.fromMillis(laser.start_datetime)
                    .toUTC()
                    .toFormat('yyyy-MM-dd HH:mm:ss')}
                </td>
                <td
                  className={`font-semibold ${tdClasses} ${laser.judgment === 1 ? 'text-green-600' : 'text-red-500'} w-10`}
                >
                  {laser.judgment === 1 ? 'OK' : 'NG'}
                </td>
              </>
            ) : (
              <td colSpan={3}>No Data</td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
