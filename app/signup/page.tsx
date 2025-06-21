"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Header } from "@/components/header"
import { useAuth } from "@/contexts/auth-context"
import { register } from "@/lib/auth"
import { z } from "zod"

const signUpSchema = z
  .object({
    email: z.string().email("Email is invalid"),
    name: z.string().min(2, "Name must be at least 2 characters long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUp() {
  const router = useRouter()
  const { login: authLogin } = useAuth()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof SignUpFormData, string>>
  >({})

  const validateForm = (): boolean => {
    try {
      signUpSchema.parse({ email, name, password, confirmPassword })
      setValidationErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<Record<keyof SignUpFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof SignUpFormData] = err.message
          }
        })
        setValidationErrors(errors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await register({
        email,
        password,
        name,
        role: "guest",
      })

      // Store authentication data
      authLogin(response.user, response.access_token, response.refresh_token)

      // Redirect to profile
      router.push("/profile")
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Wystąpił nieznany błąd podczas rejestracji"
      )
      console.error("Registration error", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 bg-gradient-to-b from-blue-50 to-white">
        <div className="flex flex-col items-center justify-center w-full p-4 md:p-8">
          <div className="w-full max-w-md">
            <Card className="border shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold text-center">
                  Create an account
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={`w-full ${
                        validationErrors.name ? "border-red-500" : ""
                      }`}
                    />
                    {validationErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`w-full ${
                        validationErrors.email ? "border-red-500" : ""
                      }`}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={`w-full ${
                        validationErrors.password ? "border-red-500" : ""
                      }`}
                    />
                    {validationErrors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.password}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="confirmPassword">Confirm password</Label>
                    </div>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className={`w-full ${
                        validationErrors.confirmPassword ? "border-red-500" : ""
                      }`}
                    />
                    {validationErrors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.confirmPassword}
                      </p>
                    )}
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white cursor-pointer"
                    disabled={isLoading}
                    size="lg"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        Loading....
                      </span>
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </form>
              </CardContent>

              <Separator className="my-2" />

              <CardFooter className="flex flex-col space-y-4 p-6 pt-2">
                <div className="text-center text-sm text-gray-600">
                  You already have an account?{" "}
                  <Link
                    href="/signin"
                    className="font-medium text-black hover:text-gray-800 hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
