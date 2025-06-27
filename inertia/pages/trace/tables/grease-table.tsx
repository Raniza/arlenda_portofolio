import { DateTime } from 'luxon'
import { GreaseType } from '../assy/grease'

export type TablePropsType = {
  thClasses: string
  tdClasses: string
  grease: GreaseType
}

export default function GreaseTable({ thClasses, tdClasses, grease }: TablePropsType) {
  return (
    <div className="grid gap-0 mt-4">
      <label className="text-gray-400">Grease Data</label>
      <table className="mt-2 w-full table-auto text-center text-sm">
        <thead className="bg-blue-400">
          <tr>
            <th className={`${thClasses}`}>#</th>
            <th className={`${thClasses}`}>Start Date</th>
            <th className={`${thClasses}`}>Grease Weight</th>
            <th className={`${thClasses}`}>Grease Weight Total</th>
            <th className={`${thClasses}`}>Judge</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {grease ? (
              <>
                <td className={`${tdClasses} w-10`}>#</td>

                <td className={`${tdClasses}`}>
                  {DateTime.fromMillis(grease.start_datetime)
                    .toUTC()
                    .toFormat('yyyy-MM-dd HH:mm:ss')}
                </td>
                <td className={`${tdClasses}`}>{grease.grease_weight}</td>
                <td className={`${tdClasses}`}>{grease.grease_weight_total}</td>
                <td
                  className={`font-semibold ${tdClasses} ${grease.judgment === 1 ? 'text-green-600' : 'text-red-500'} w-10`}
                >
                  {grease.judgment === 1 ? 'OK' : 'NG'}
                </td>
              </>
            ) : (
              <td colSpan={5}>No Data</td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
