import { Label } from '@/components/shadcn/ui/label'
import { Switch } from '@/components/shadcn/ui/switch'

const Eligibility = ({eligible, setEligible, id, label}: {eligible: boolean, setEligible: (eligible: boolean) => void, id: string, label:string}) => {
  return (
    <>
      <div className='flex items-center space-x-2'>
        <Switch id={id} name={id} checked={eligible} onCheckedChange={() => setEligible(!eligible)} />
        <Label htmlFor={id}>{label}</Label>
      </div>
    </>
  )
}

export default Eligibility;