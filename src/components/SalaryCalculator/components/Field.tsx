import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"
import { HTMLInputTypeAttribute } from "react";

const Field = ({label, name, placeholder, value, setValue, text, type} : { label: string, name: string, placeholder?: string, value: any, setValue: (value:any) => void, text?:string, type?: HTMLInputTypeAttribute }) => {
  return (
    <div className='mb-2 text-left'>
      <Label htmlFor={name} className='mb-1'>{label}</Label>
      <Input id={name} type={type} placeholder={placeholder} value={value} onChange={setValue} />
      <small className='text-xs text-gray-500'>{text}</small>
    </div>
  )
}

export default Field;