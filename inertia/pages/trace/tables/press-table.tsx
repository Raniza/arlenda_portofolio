import { DateTime } from 'luxon'
import { PressType } from '../assy/press-fit'

export type TablePropsType = {
  thClasses: string
  tdClasses: string
  press: PressType
}

export default function PressTable({ thClasses, tdClasses, press }: TablePropsType) {
  return (
    <div className="grid gap-0 mt-4">
      <label className="text-gray-400">Press Fit Data</label>
      <table className="mt-2 w-full table-auto text-center text-sm">
        <thead className="bg-blue-400">
          <tr>
            <th className={`${thClasses}`}>#</th>
            <th className={`${thClasses}`}>Start Date</th>
            <th className={`${thClasses}`}>Bush Load Stroke</th>
            <th className={`${thClasses}`}>Oil Seal Load Stroke</th>
            <th className={`${thClasses}`}>Judge</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {press ? (
              <>
                <td className={`${tdClasses} w-10`}>#</td>

                <td className={`${tdClasses}`}>
                  {DateTime.fromMillis(press.start_datetime)
                    .toUTC()
                    .toFormat('yyyy-MM-dd HH:mm:ss')}
                </td>
                <td className={`${tdClasses}`}>{press.bush_loadstroke}</td>
                <td className={`${tdClasses}`}>{press.oil_seal_stroke}</td>
                <td
                  className={`font-semibold ${tdClasses} ${press.judgment === 1 ? 'text-green-600' : 'text-red-500'} w-10`}
                >
                  {press.judgment === 1 ? 'OK' : 'NG'}
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
