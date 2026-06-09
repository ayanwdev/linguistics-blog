"use client"

import { Input } from "@/components/ui/input"

export const FormField = ({
  id,
  label,
  required,
  hint,
  className,
  ...inputProps
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
} & React.ComponentProps<typeof Input>) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">{"*"}</span>}
      </label>
      <Input id={id} required={required} className="mt-1" {...inputProps} />
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
