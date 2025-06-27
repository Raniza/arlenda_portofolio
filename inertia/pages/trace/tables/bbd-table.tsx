import { DateTime } from 'luxon'
import { BbdType } from '../after/bbd'

export type TablePropsType = {
  thClasses: string
  tdClasses: string
  bbd: BbdType
}

export default function BbdTable({ thClasses, tdClasses, bbd }: TablePropsType) {
  return (
    <div className="grid gap-0 mt-4">
      <label className="text-gray-400">BBD Data</label>
      <table className="mt-2 w-full table-auto text-center text-sm">
        <thead className="bg-blue-400">
          <tr>
            <th className={`${thClasses}`}>#</th>
            <th className={`${thClasses}`}>Start Date</th>
            <th className={`${thClasses}`}>BBD X1</th>
            <th className={`${thClasses}`}>BBD Y1</th>
            <th className={`${thClasses}`}>BBD X5</th>
            <th className={`${thClasses}`}>BBD Y5</th>
            <th className={`${thClasses}`}>Judge</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {bbd ? (
              <>
                <td className={`${tdClasses} w-10`}>#</td>
                <td className={`${tdClasses}`}>
                  {DateTime.fromMillis(bbd.start_datetime).toUTC().toFormat('yyyy-MM-dd HH:mm:ss')}
                </td>
                <td className={`${tdClasses}`}>{bbd.bbd_measure_x1}</td>
                <td className={`${tdClasses}`}>{bbd.bbd_measure_y1}</td>
                <td className={`${tdClasses}`}>{bbd.bbd_measure_x5}</td>
                <td className={`${tdClasses}`}>{bbd.bbd_measure_y5}</td>
                <td
                  className={`font-semibold ${tdClasses} ${bbd.judgment === 1 ? 'text-green-600' : 'text-red-500'} w-10`}
                >
                  {bbd.judgment === 1 ? 'OK' : 'NG'}
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
