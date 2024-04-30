import { formatNumber, IPerson } from '@/lib/utils'
import HouseholdContext from '@/utils/context';
import { useContext } from 'react'


const HouseholdSummary = () => {
  const { people } = useContext(HouseholdContext);
  return (
    <div className='bg-slate-100 dark:bg-slate-900 dark:text-gray-300 w-full min-h-[40vh] rounded-lg shadow p-6 mt-12'>

      <div className="flex flex-col py-6">
        <h2 className='text-lg md:text-xl font-bold text-center'>Háztartás összesített jövedelme</h2>
      </div>

      <div className="overflow-auto">
        <table className='border bg-white w-full border-collapse rounded-lg text-left'>
          <thead className='text-slate-700  bg-slate-50 dark:bg-slate-800 dark:text-slate-400'>
            <tr className='border text-left'>
              <th className='border p-2'>Családtag</th>
              <th className='border p-2'>Nettó bér</th>
            </tr>
          </thead>
          <tbody className='dark:bg-slate-700 dark:text-slate-300 text-slate-950 text-sm'>
            {
              people.map((user, i) => (
                <tr key={i} className='border  hover:bg-slate-100 dark:hover:bg-slate-700 duration-300 ease-in-out'>
                  <td className='border p-2'>{user.name}</td>
                  <td className='border p-2'>{user.nettoSalary && formatNumber(user.nettoSalary)}</td>
                </tr>
              ))
            }
            <tr className='border text-slate-950 bg-slate-50  hover:bg-slate-100 dark:text-slate-300 dark:bg-slate-800 duration-300 ease-in-out'>
              <td className='border p-2 font-bold'>Összesen</td>
              <td className='border p-2 font-bold '>{formatNumber(people.filter((p:IPerson) => p.nettoSalary).reduce((acc, user) => acc + Number(user.nettoSalary), 0))}</td>
            </tr>
          </tbody>
        </table>
      </div>




    </div>
  )
}

export default HouseholdSummary;