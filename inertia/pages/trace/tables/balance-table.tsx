import { DateTime } from 'luxon'
import { BalanceType } from '../after/balance'

export type TablePropsType = {
  thClasses: string
  tdClasses: string
  balance: BalanceType
}

export default function BalanceTable({ thClasses, tdClasses, balance }: TablePropsType) {
  return (
    <div className="grid gap-0 mt-4">
      <label className="text-gray-400">Balance Data</label>
      <table className="mt-2 w-full table-auto text-center text-sm">
        <thead className="bg-blue-400">
          <tr>
            <th className={`${thClasses}`}>#</th>
            <th className={`${thClasses}`}>Start Date</th>
            <th className={`${thClasses}`}>Measure #1</th>
            <th className={`${thClasses}`}>Degree #1</th>
            <th className={`${thClasses}`}>Measure #2</th>
            <th className={`${thClasses}`}>Degree #2</th>
            <th className={`${thClasses}`}>Judge</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {balance ? (
              <>
                <td className={`${tdClasses} w-10`}>#</td>
                <td className={`${tdClasses}`}>
                  {DateTime.fromMillis(balance.start_datetime)
                    .toUTC()
                    .toFormat('yyyy-MM-dd HH:mm:ss')}
                </td>
                <td className={`${tdClasses}`}>{balance.measurements_1}</td>
                <td className={`${tdClasses}`}>{balance.degree_1}</td>
                <td className={`${tdClasses}`}>{balance.measurements_2}</td>
                <td className={`${tdClasses}`}>{balance.degree_2}</td>
                <td
                  className={`font-semibold ${tdClasses} ${balance.judgment === 1 ? 'text-green-600' : 'text-red-500'} w-10`}
                >
                  {balance.judgment === 1 ? 'OK' : 'NG'}
                </td>
              </>
            ) : (
              <td colSpan={7}>No Data</td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
