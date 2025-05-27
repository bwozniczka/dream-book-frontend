"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserProfile } from "@/components/user-profile"
import { fetchUserProfile } from "@/lib/api"
import type { UserData } from "@/lib/types"

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true)
        const userData = await fetchUserProfile()
        setUser(userData)
      } catch (error) {
        console.error("Błąd podczas ładowania profilu użytkownika:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">DreamBook</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/hotels"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Hotele
            </Link>
            <Link
              href="/hosts"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Gospodarze
            </Link>
            <Link
              href="/profile"
              className="text-sm font-medium transition-colors text-primary"
            >
              My profil
            </Link>
          </nav>
        </div>
      </header>

      <main className="container px-4 py-6 mx-auto md:px-6 md:py-12">
        <div className="mb-6 md:mb-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Mój profil
          </h1>
          <p className="mt-2 text-muted-foreground">
            Zarządzaj swoim kontem i rezerwacjami
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg font-medium">Ładowanie...</p>
          </div>
        ) : user ? (
          <UserProfile user={user} />
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg font-medium">Nie jesteś zalogowany</p>
            <div className="flex gap-4 mt-4">
              <Button asChild>
                <Link href="/signin">Zaloguj się</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/signup">Zarejestruj się</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
