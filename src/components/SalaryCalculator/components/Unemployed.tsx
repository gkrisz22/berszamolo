import { Button } from '@/components/shadcn/ui/button';
import { Label } from '@/components/shadcn/ui/label'
import { Switch } from '@/components/shadcn/ui/switch'

const Unemployed = ({csaladi, setCsaladi, eltartott, setEltartott, kedvezmenyezett, setKedvezmenyezett} : {csaladi:boolean, setCsaladi: (value:boolean) => void, eltartott:number, setEltartott: (value:number) => void, kedvezmenyezett:number, setKedvezmenyezett: (value:number) => void}) => {

    const handleKedvezmenyezettChange = (value: number) => {
        if( value < 0 || value > eltartott || value > 3) {
            return;
        }
        setKedvezmenyezett(value);
    }

    const handleEltartottChange = (value: number) => {
        if(value < 0) {
            return;
        }
        setEltartott(value);
    }
    return (
        <>
        <div className='flex items-center space-x-2'>
            <Switch id="csaladi" checked={csaladi} onCheckedChange={() => setCsaladi(!csaladi)} />
            <Label htmlFor='csaladi'>Családi adókedvezmény</Label>
        </div>

        { csaladi && <div className='flex items-center space-x-2'>
            <div className="flex items-center space-x-1">
                <Button type="button" onClick={() => handleEltartottChange(eltartott - 1)} variant={"outline"} size={"sm"} className='rounded-full text-[10px] px-1 h-fit w-fit'>-</Button>
                <p className='text-xs text-slate-700 dark:text-slate-400'>{eltartott}</p>
                <Button type="button" onClick={() =>  handleEltartottChange(eltartott + 1)} variant={"outline"} size={"sm"} className='rounded-full text-[10px] px-1 h-fit w-fit'>+</Button>
            </div>
            <div className='text-sm'>
                <p>Eltartott, ebből kedvezményezett</p>
            </div>

            <div className="flex items-center space-x-1">
                <Button type="button" onClick={() => handleKedvezmenyezettChange(kedvezmenyezett - 1)} variant={"outline"} size={"sm"} className='rounded-full text-[10px] px-1 h-fit w-fit'>-</Button>
                <p className='text-xs text-slate-700 dark:text-slate-400'>{kedvezmenyezett}</p>
                <Button type="button" onClick={() => handleKedvezmenyezettChange(kedvezmenyezett + 1)} variant={"outline"} size={"sm"} className='rounded-full text-[10px] px-1 h-fit w-fit'>+</Button>
            </div>

        </div>}
        </>
    )
}

export default Unemployed