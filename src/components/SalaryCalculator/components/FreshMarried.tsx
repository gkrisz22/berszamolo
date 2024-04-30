import { Label } from '@/components/shadcn/ui/label'
import { Switch } from '@/components/shadcn/ui/switch'
import { Check, XIcon } from 'lucide-react';
import { useState } from 'react'
import MarriageDateDialog from './MarriageDateDialog';



const FreshMarried = ({ freshMarried, setFreshMarried, marriageDate, setMarriageDate }: { freshMarried: boolean, setFreshMarried: (value: boolean) => void, marriageDate: Date | undefined, setMarriageDate: (value: Date | undefined) => void }) => {
    
    const within2Years = (d: Date) => {
        const now = new Date();
        const diff = now.getFullYear() - d.getFullYear();
        if (diff > 2) return false;
        if (diff === 2) {
            if (now.getMonth() > d.getMonth()) return false;
            if (now.getMonth() === d.getMonth()) {
                if (now.getDate() > d.getDate()) return false;
            }
        }
        return true;
    }
    return (
        <>
            <div className='flex flex-col sm:flex-row items-center space-x-2'>
                <div className='flex items-center space-x-2 mb-2 md:mb-0 self-start'>
                    <Switch id="freshMarried" checked={freshMarried} onCheckedChange={() => setFreshMarried(!freshMarried)} />
                    <Label htmlFor='freshMarried'>Friss házasok kedvezménye</Label>
                </div>
                {freshMarried && <div className='flex items-center space-x-2 self-start'>

                    <MarriageDateDialog date={marriageDate} setDate={setMarriageDate} />
                    
                    {marriageDate && within2Years(marriageDate) ? 
                        <div className='bg-green-600 dark:bg-green-800 text-white text-xs rounded-full px-3 py-2 flex items-center space-x-1'>
                        <Check size={16} />
                        <p>Jogosult</p>
                    </div>
                    :
                    <div className='bg-red-600 dark:bg-red-800 text-white text-xs rounded-full px-3 py-2 flex items-center space-x-1'>
                        <XIcon size={16} />
                        <p>Nem jogosult</p>
                    </div>
                    }
                    
                </div>}
            </div>
        </>
    )
}

export default FreshMarried