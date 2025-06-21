"use client"

import { useState } from "react"
import { HostCard } from "@/components/host-card"
import { LocationSearch } from "@/components/location-search"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { GuestSelector } from "@/components/guest-selector"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

const initialHosts = [
  {
    id: 1,
    name: "Jan Kowalski",
    location: "Warszawa, Polska",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Anna Nowak",
    location: "Kraków, Polska",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Piotr Wiśniewski",
    location: "Gdańsk, Polska",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop",
  },
]

export default function Hosts() {
  const [location, setLocation] = useState("")
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  })
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 })
  const [filteredHosts, setFilteredHosts] = useState(initialHosts)
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    setLoading(true)

    setTimeout(() => {
      const filtered = initialHosts.filter((host) =>
        host.location.toLowerCase().includes(location.toLowerCase())
      )
      setFilteredHosts(filtered)
      setLoading(false)
    }, 500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="container px-4 py-6 mx-auto md:px-6 md:py-12">
        <div className="mb-6 md:mb-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Hosts
          </h1>
          <p className="mt-2 text-muted-foreground">
            Find the perfect host for your stay
          </p>
        </div>

        {/* Search Bar */}
        <div className="p-6 mb-8 bg-white border rounded-xl shadow-lg transition-shadow hover:shadow-xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Lokalizacja</p>
              <LocationSearch onChange={setLocation} />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Termin pobytu</p>
              <DatePickerWithRange className="w-full" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Goście i pokoje
              </p>
              <GuestSelector onChange={setGuests} />
            </div>
            <div className="flex items-end">
              <Button
                className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-black hover:to-gray-800 text-white font-medium py-2.5"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Wyszukiwanie...
                  </div>
                ) : (
                  <>Szukaj gospodarzy</>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Hosts Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg font-medium">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredHosts.map((host) => (
              <HostCard
                key={host.id}
                id={host.id}
                name={host.name}
                location={host.location}
                rating={host.rating}
                image={host.image}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredHosts.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg font-medium">
              No hosts found for your search
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try searching for a different city.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
