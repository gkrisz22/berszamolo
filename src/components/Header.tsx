import { ThemeToggler } from './shadcn/ui/ThemeToggler'

const Header = () => {
  return (
    <header className='w-full'>
        <div className='max-w-[1240px] mx-auto p-4 flex items-center justify-between'>
            <h1 className='text-lg font-bold'>Háztartások jövedelem kalkulátor</h1>
            <div><ThemeToggler /></div>
        </div>
    </header>
  )
}

export default Header