"use client"

import { Input } from "@/components/ui/input"

// Reusable FormField
export const FormField = ({
  id,
  label,
  required,
  hint,
  ...inputProps
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
} & React.ComponentProps<typeof Input>) => {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Input id={id} required={required} className="mt-1" {...inputProps} />
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

// Types
type SignUpData = {
  fullName: string
  username: string
  email: string
  password: string
  institution: string
}
type LoginData = { email: string; password: string }
