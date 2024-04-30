import Header from './Header'
import SalaryCalculator from './SalaryCalculator/SalaryCalculator'
import HouseholdSummary from './HouseholdSummary/HouseholdSummary'

const HouseholdSalaryCalculator = () => {
  return (
    <div className=''>
        <Header />

        <div className="max-w-[1240px] mx-auto">
            <div className='grid lg:grid-cols-2 gap-4 p-4'>
                <SalaryCalculator />
                <HouseholdSummary />
            </div>
        </div>
    </div>
  )
}

export default HouseholdSalaryCalculator