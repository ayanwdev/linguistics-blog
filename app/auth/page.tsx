"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/form-field"

type SignUpData = {
  fullName: string
  username: string
  email: string
  password: string
  institution: string
}
type LoginData = { email: string; password: string }

const generateUsername = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]/g, "")

export default function Auth() {
  const [signUp, setSignUp] = useState<SignUpData>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    institution: "",
  })
  const [login, setLogin] = useState<LoginData>({ email: "", password: "" })

  const setSignUpField =
    (field: keyof SignUpData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSignUp((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "fullName" && { username: generateUsername(value) }),
      }))
    }

  const setLoginField =
    (field: keyof LoginData) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setLogin((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(signUp)
  }
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(login)
  }

  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <FormField
                id="fullName"
                label="Full Name"
                required
                placeholder="Enter your full name"
                value={signUp.fullName}
                onChange={setSignUpField("fullName")}
              />
              <FormField
                id="username"
                label="Username"
                required
                placeholder="Choose a unique username"
                value={signUp.username}
                onChange={setSignUpField("username")}
                hint="No spaces allowed"
              />
              <FormField
                id="email"
                label="Email"
                required
                placeholder="Enter your email"
                value={signUp.email}
                onChange={setSignUpField("email")}
                type="email"
              />
              <FormField
                id="password"
                label="Password"
                required
                placeholder="Enter your password"
                value={signUp.password}
                onChange={setSignUpField("password")}
                type="password"
              />
              <FormField
                id="institution"
                label="Institution"
                placeholder="Your institution (optional)"
                value={signUp.institution}
                onChange={setSignUpField("institution")}
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <FormField
                id="login-email"
                label="Email or Username"
                required
                placeholder="Enter your email or username"
                value={login.email}
                onChange={setLoginField("email")}
              />
              <FormField
                id="login-password"
                label="Password"
                required
                placeholder="Enter your password"
                value={login.password}
                onChange={setLoginField("password")}
                type="password"
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
