"use client"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/form-field"

type Props = {
  data: { email: string; password: string }
  onSubmit: (e: React.SubmitEvent) => void
  onChange: (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => void
  loading: boolean
}

export function LoginForm({ data, onSubmit, onChange, loading }: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        id="login-email"
        label="Email"
        required
        placeholder="Enter your email"
        value={data.email}
        onChange={onChange("email")}
      />
      <FormField
        id="login-password"
        label="Password"
        required
        placeholder="Enter your password"
        value={data.password}
        onChange={onChange("password")}
        type="password"
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  )
}
