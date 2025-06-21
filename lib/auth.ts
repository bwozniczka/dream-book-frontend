// Authentication utilities for Flask backend integration

export interface User {
  id: string
  email: string
  name: string
  role: "guest" | "landlord" | "admin"
  isActive: boolean
  joinedAt: string
  avatarUrl?: string
  properties?: number
  bookings?: number
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  user: User
  expires_in: number
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  role?: "guest" | "landlord"
}

export interface LoginRequest {
  email: string
  password: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

// Token management
export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("access_token")
}

export const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("refresh_token")
}

export const setTokens = (accessToken: string, refreshToken: string): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("access_token", accessToken)
  localStorage.setItem("refresh_token", refreshToken)
}

export const clearTokens = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  localStorage.removeItem("user")
}

export const setUser = (user: User): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("user", JSON.stringify(user))
}

export const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

// API calls
export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Login failed")
  }

  return response.json()
}

export const register = async (
  userData: RegisterRequest
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Registration failed")
  }

  return response.json()
}

export const refreshAccessToken = async (): Promise<{
  access_token: string
}> => {
  const refreshToken = getRefreshToken()

  if (!refreshToken) {
    throw new Error("No refresh token available")
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Token refresh failed")
  }

  return response.json()
}

export const logout = async (): Promise<void> => {
  const refreshToken = getRefreshToken()

  if (refreshToken) {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  clearTokens()
}

export const getCurrentUser = async (): Promise<User> => {
  const token = getAccessToken()

  if (!token) {
    throw new Error("No access token available")
  }

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to get current user")
  }

  return response.json()
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}
