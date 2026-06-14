"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { LoginForm } from "@/components/auth/sign-in-form"
import { useAuth } from "@/hooks/use-auth"
import { deleteSession } from "@/lib/auth"

export default function Auth() {
  const {
    signUpData,
    loginData,
    loading,
    error,
    setSignUpField,
    handleUsernameChange,
    setLoginField,
    handleSignUp,
    handleLogin,
    sessionId,
  } = useAuth()

  return (
    <div className="flex h-full justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup" className="space-y-4">
            <SignUpForm
              data={signUpData}
              onSubmit={handleSignUp}
              onChange={setSignUpField}
              onUsernameChange={handleUsernameChange}
              loading={loading}
            />
          </TabsContent>
          <TabsContent value="login" className="space-y-4">
            <LoginForm
              data={loginData}
              onSubmit={handleLogin}
              onChange={setLoginField}
              loading={loading}
            />
          </TabsContent>
        </Tabs>
        {process.env.NODE_ENV === "development" && sessionId && (
          <Button variant="outline" className="w-full" onClick={deleteSession}>
            Delete Session ({sessionId})
          </Button>
        )}
      </div>
    </div>
  )
}
