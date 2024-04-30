import { useEffect, useState } from 'react'
import './App.css'

import HouseholdSalaryCalculator from './components/HouseholdSalaryCalculator'
import HouseholdContext from './utils/context'
import { IPerson } from './lib/utils'
import { useStorage } from './utils/useStorage'

function App() {
  const [people, setPeople] = useState<IPerson[]>([])
  // useStorage hook
  const [storedPeople, setStoredPeople] = useStorage(people);
  useEffect(() => {
    setPeople(storedPeople);
  }, []);

  useEffect(() => {
    setStoredPeople(people);
  }, [people]);

  return (
      <HouseholdContext.Provider value={{people, setPeople}}>
        <HouseholdSalaryCalculator />
      </HouseholdContext.Provider>
  )
}

export default App
