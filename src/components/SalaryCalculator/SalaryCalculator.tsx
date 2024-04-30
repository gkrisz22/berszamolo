import { Tabs, TabsContent, TabsList, TabsTrigger } from '../shadcn/ui/tabs';
import { Plus, Trash } from 'lucide-react';
import { Button } from '../shadcn/ui/button';
import { useContext, useEffect, useState } from 'react';
import { Slider } from '../shadcn/ui/slider';
import Unemployed from './components/Unemployed';
import FreshMarried from './components/FreshMarried';
import Eligibility from './components/Eligibility';
import Field from './components/Field';
import { calculateNetto, formatNumber, IPerson } from '@/lib/utils';
import HouseholdContext from '@/utils/context';


const SalaryCalculator = () => {
  const {people, setPeople}  = useContext(HouseholdContext);


  const addperson = () => {
    setPeople([...people, {
      id: people.length + 1,
      name: '',
      salary: 0,
      under25: false,
      freshMarried: false,
      marriageDate: undefined,
      taxReducted: false,
      familyDiscount: false,
      unemployed: 0,
      reducted: 0,
      nettoSalary: 0

    }]);


    console.log(people);
  }

  const handleDelete = (index:number) => {
    console.log("Deleting: ", index)
    setPeople(people.filter((p:IPerson) => p.id !== index));
  }

  const handleChange = (id:number, name: string, value: any) => {
    console.log("ID: ", id, "Name: ", name, "Value: ", value);
    const idx = people.findIndex((p:IPerson) => p.id === id)
    if(idx !== -1){
      setPeople(people.map((p:IPerson) => p.id === id ? {...p, [name]: value} : p));
    }
          
  }


  return (
    <Tabs defaultValue="" className=" ">
        <div className="flex items-center">
          {people.length > 0 &&
          <TabsList>
              {
                people.map((person:IPerson, i:number) => (
                  <TabsTrigger key={i} value={person.id.toString()}>{person.name || '[Add meg a családtag nevét]'}</TabsTrigger>
                ))  
              }
          </TabsList>
          }
          <Button variant="secondary" className='ml-2' onClick={addperson}>{people.length === 0 && "Új családtag"}<Plus /></Button>
        </div>

        { people.map((person:IPerson, i:number) => (
          <TabsContent key={i} value={person.id.toString()} className=' w-full min-h-[40vh] rounded-lg shadow p-6 bg-slate-100 dark:bg-slate-900 dark:text-gray-300'>
            <Person {...person} handleChange={handleChange} deletePerson={handleDelete} />
          </TabsContent>
        ))}

    </Tabs>
  )
};

const Person:React.FC<IPerson & {deletePerson: (id:number) => void, handleChange: (id:number, name:string, value:any) => void}> = (person) => {
  const [formState, setFormState] = useState<IPerson>(person);
  const [netto, setNetto] = useState<number>(0);
  const calculate = () => {
    setNetto(calculateNetto(formState));
    person.handleChange(person.id, 'nettoSalary', calculateNetto(formState));
  }

  useEffect(() => {
    calculate();
  }, [formState]);

  const handleSlider = (e:any) => {
    console.log(e[0]);
    setFormState({...formState, salary: e[0]});
  }

  const increaseByPercantage = (percantage:number) => {
    console.log(percantage);
    const newSalary = Math.round(formState.salary * (1 + percantage / 100));
    setFormState({...formState, salary: newSalary});
  }

  const handleChangeField = (e:any) => {
    const value = e.target.value;
    const name = e.target.id;
    setFormState({...formState, [name]: value});
    person.handleChange(person.id, name, value);
  }

  
  return (
    <div className="w-full flex flex-col pb-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className='text-gray-850 dark:text-gray-200 text-lg md:text-xl lg:text-2xl uppercase font-bold '>{formState.name} bérének kiszámítása</h3>
        <Button variant="destructive" size="sm" className='px-2.5 py-4 rounded-lg' onClick={() => person.deletePerson(person.id)}>
          <Trash size={18} />
        </Button>
      </div>
      <form>
        <div>
          <Field type='text' label='Családtag neve' name='name' placeholder={person.name} value={formState.name} setValue={handleChangeField} text="Add meg a családtag nevét!" />
          <Field type='number' label='Bruttó bér' name='salary' placeholder='250.000 Ft' value={formState.salary} setValue={handleChangeField} text="Add meg a bruttó béredet!" />

          <div className='w-full p-1'>
            
            <Slider defaultValue={[formState.salary]} min={0} max={1500000} step={5000} onValueChange={handleSlider} value={[formState.salary ]} className='shadow-xl border' />

          </div>

          <div className='flex items-center justify-center gap-2 mt-4'>
            <Button type='button' size="sm" className='py-6' variant={"outline"} onClick={() => increaseByPercantage(-1)}>-1%</Button>
            <Button type='button' size="sm" className='py-6' variant={"outline"} onClick={() => increaseByPercantage(-5)}>-5%</Button>
            <Button type='button' size="sm" className='py-6' variant={"outline"} onClick={() => increaseByPercantage(1)}>+1%</Button>
            <Button type='button' size="sm" className='py-6' variant={"outline"} onClick={() => increaseByPercantage(5)}>+5%</Button>
          </div>
        </div>

        <div className='mt-4 mb-16 text-left'>
          <h4 className='uppercase font-bold mb-4'>Kedvezmények</h4>

          <div className="flex flex-col space-y-4">
            {/* Switches */}

            <Eligibility eligible={formState.under25} setEligible={(value:boolean) => setFormState({...formState, under25: value})} id='under25' label='25 év alattiak SZJA mentessége' />

            <FreshMarried freshMarried={formState.freshMarried} setFreshMarried={(value:boolean) => setFormState({...formState, freshMarried: value})} marriageDate={formState.marriageDate} setMarriageDate={(value:Date | undefined) => setFormState({...formState, marriageDate: value})} />
            <Eligibility eligible={formState.taxReducted} setEligible={(value:boolean) => setFormState({...formState, taxReducted: value})} id='taxReducted' label='Személyi adókedvezmény' />
            <Unemployed csaladi={formState.familyDiscount} setCsaladi={(value:boolean) => setFormState({...formState, familyDiscount: value})} eltartott={formState.unemployed || 0} setEltartott={(value:number) => setFormState({...formState, unemployed: value})} kedvezmenyezett={formState.reducted || 0} setKedvezmenyezett={(value:number) => setFormState({...formState, reducted: value})} />
          </div>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <h5 className='mb-1'>Számított nettó bér:</h5>
          <div className='px-4 py-2.5 bg-slate-900 rounded-lg text-white dark:bg-slate-600'>
            <p>{formatNumber(netto)}</p>
          </div>
          <div className='bg-slate-200 text-slate-800 dark:bg-slate-950 dark:text-white rounded-xl  p-2 text-xs mt-4 italic'>
            {formatNumber(formState.salary - netto) + " adót fizetsz"}
          </div>
        </div>
      </form>
    </div>
  )
};


export default SalaryCalculator;