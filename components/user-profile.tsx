"use client"
import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import type { UserData } from "@/lib/types"
import { updateUserProfile } from "@/lib/api"

interface UserProfileProps {
  user: UserData
}

export function UserProfile({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await updateUserProfile(user.id, formData)
      setIsEditing(false)
    } catch (error) {
      console.error("Błąd podczas aktualizacji profilu:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const joinedDate = new Date(user.joinedAt)
  const formattedJoinedDate = format(joinedDate, "d MMMM yyyy", { locale: pl })

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <Avatar className="h-24 w-24 border-2 border-gray-200">
              <img
                src={
                  user.avatarUrl ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.name
                }
                alt={user.name}
                className="object-cover"
              />
            </Avatar>
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <Badge variant="outline" className="rounded-md px-2 py-1">
                  {user.role === "guest"
                    ? "Gość"
                    : user.role === "landlord"
                    ? "Gospodarz"
                    : "Administrator"}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Z nami od {formattedJoinedDate}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  Edytuj profil
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={() => setIsEditing(false)} variant="outline">
                    Anuluj
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSaving}>
                    {isSaving ? "Zapisywanie..." : "Zapisz zmiany"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>Edytuj dane osobowe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Imię i nazwisko
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="reservations" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="reservations">Rezerwacje</TabsTrigger>
            <TabsTrigger value="reviews">Opinie</TabsTrigger>
            <TabsTrigger value="settings">Ustawienia</TabsTrigger>
          </TabsList>
          <TabsContent value="reservations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Twoje rezerwacje</CardTitle>
              </CardHeader>
              <CardContent>
                {user.bookings && user.bookings > 0 ? (
                  <div className="space-y-4">
                    <p>Masz {user.bookings} rezerwacji</p>
                    <Button asChild>
                      <a href="/stays">Zobacz wszystkie</a>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Nie masz jeszcze żadnych rezerwacji
                    </p>
                    <Button asChild>
                      <a href="/hotels">Znajdź miejsce na pobyt</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Twoje opinie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Nie dodałeś jeszcze żadnych opinii
                  </p>
                  <Button asChild variant="outline">
                    <a href="/stays">Oceń swój pobyt</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ustawienia konta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Powiadomienia email</h3>
                      <p className="text-sm text-muted-foreground">
                        Otrzymuj powiadomienia o rezerwacjach i promocjach
                      </p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Zarządzaj
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Zmień hasło</h3>
                      <p className="text-sm text-muted-foreground">
                        Aktualizuj swoje hasło regularnie dla bezpieczeństwa
                      </p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Zmień
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Usuń konto</h3>
                      <p className="text-sm text-muted-foreground">
                        Trwale usuń swoje konto i wszystkie dane
                      </p>
                    </div>
                    <div>
                      <Button variant="destructive" size="sm">
                        Usuń konto
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {user.role === "landlord" && (
        <Card>
          <CardHeader>
            <CardTitle>Zarządzanie obiektami</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Zarządzasz {user.properties || 0}{" "}
                {user.properties === 1
                  ? "obiektem"
                  : user.properties && user.properties < 5
                  ? "obiektami"
                  : "obiektami"}
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="/listings">Moje obiekty</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/listings/new">Dodaj nowy obiekt</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
