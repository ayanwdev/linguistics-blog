"use client"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/form-field"

type Props = {
  data: { fullName: string; username: string; email: string; password: string }
  onSubmit: (e: React.SubmitEvent) => void
  onChange: (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => void
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  loading: boolean
}

export function SignUpForm({
  data,
  onSubmit,
  onChange,
  onUsernameChange,
  loading,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        id="fullName"
        label="Full Name"
        required
        placeholder="Enter your full name"
        value={data.fullName}
        onChange={onChange("fullName")}
      />
      <FormField
        id="username"
        label="Username"
        placeholder="Choose a unique username"
        value={data.username}
        onChange={onUsernameChange}
        hint="No spaces allowed, leave empty to auto-generate."
      />
      <FormField
        id="email"
        label="Email"
        required
        placeholder="Enter your email"
        value={data.email}
        onChange={onChange("email")}
        type="email"
      />
      <FormField
        id="password"
        label="Password"
        required
        placeholder="Choose a strong password"
        value={data.password}
        onChange={onChange("password")}
        type="password"
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  )
}
