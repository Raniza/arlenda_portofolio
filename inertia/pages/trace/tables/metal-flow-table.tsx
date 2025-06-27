import { DateTime } from 'luxon'
import { MetalFlowType } from '../after/metal-flow'

export type TablePropsType = {
  thClasses: string
  tdClasses: string
  metal: MetalFlowType
}

export default function MetalFlowTable({ thClasses, tdClasses, metal }: TablePropsType) {
  return (
    <div className="grid gap-0 mt-4">
      <label className="text-gray-400">Metal FLow Data</label>
      <table className="mt-2 w-full table-auto text-center text-sm">
        <thead className="bg-blue-400">
          <tr>
            <th className={`${thClasses}`}>#</th>
            <th className={`${thClasses}`}>Start Date</th>
            <th className={`${thClasses}`}>Peak Pressure</th>
            <th className={`${thClasses}`}>Peak Pressure Load Cell</th>
            <th className={`${thClasses}`}>Judge</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {metal ? (
              <>
                <td className={`${tdClasses} w-10`}>#</td>
                <td className={`${tdClasses}`}>
                  {DateTime.fromMillis(metal.start_datetime)
                    .toUTC()
                    .toFormat('yyyy-MM-dd HH:mm:ss')}
                </td>
                <td className={`${tdClasses}`}>{metal.peak_pressure}</td>
                <td className={`${tdClasses}`}>{metal.peak_pressure_load_cell}</td>
                <td
                  className={`font-semibold ${tdClasses} ${metal.judgment === 1 ? 'text-green-600' : 'text-red-500'} w-10`}
                >
                  {metal.judgment === 1 ? 'OK' : 'NG'}
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
