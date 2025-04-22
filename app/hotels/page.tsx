"use client"

import { useState } from "react"
import Link from "next/link"
import { HotelCard } from "@/components/hotel-card"
import { LocationSearch } from "@/components/location-search"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { GuestSelector } from "@/components/guest-selector"
import { SortSelector } from "@/components/sort-selector"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

const initialHotels = [
  {
    id: 1,
    name: "Grand Hotel Warszawa",
    location: "Warszawa, Polska",
    price: 150,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Seaside Resort",
    location: "Gdańsk, Polska",
    price: 120,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Mountain Lodge",
    location: "Zakopane, Polska",
    price: 180,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "City View Hotel",
    location: "Kraków, Polska",
    price: 140,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop",
  },
]

export default function Hotels() {
  const [location, setLocation] = useState("")
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  })
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 })
  const [sortOption, setSortOption] = useState("rating_desc")
  const [hotels, setHotels] = useState(initialHotels)
  const [loading, setLoading] = useState(false)

  const prepareQueryParams = () => {
    return {
      location,
      checkIn: dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "",
      checkOut: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : "",
      guests: {
        adults: guests.adults,
        children: guests.children,
        rooms: guests.rooms,
      },
      sort: sortOption,
    }
  }

  const searchHotels = () => {
    setLoading(true)

    const queryParams = prepareQueryParams()
    console.log("Parametry zapytania do backendu:", queryParams)

    // Symulacja zapytania do backendu
    setTimeout(() => {
      let sortedHotels = [...initialHotels]

      switch (sortOption) {
        case "price_asc":
          sortedHotels.sort((a, b) => a.price - b.price)
          break
        case "price_desc":
          sortedHotels.sort((a, b) => b.price - a.price)
          break
        case "rating_desc":
          sortedHotels.sort((a, b) => b.rating - a.rating)
          break
        case "rating_asc":
          sortedHotels.sort((a, b) => a.rating - b.rating)
          break
        case "name_asc":
          sortedHotels.sort((a, b) => a.name.localeCompare(b.name))
          break
        case "name_desc":
          sortedHotels.sort((a, b) => b.name.localeCompare(a.name))
          break
        default:
          break
      }

      if (location) {
        sortedHotels = sortedHotels.filter((hotel) =>
          hotel.location.toLowerCase().includes(location.toLowerCase())
        )
      }

      setHotels(sortedHotels)
      setLoading(false)
    }, 500)
  }

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
              Hotels
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Deals
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Rewards
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Help
            </Link>
          </nav>
        </div>
      </header>

      <main className="container px-4 py-6 mx-auto md:px-6 md:py-12">
        <div className="mb-6 md:mb-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Hotels
          </h1>
          <p className="mt-2 text-muted-foreground">
            Find the perfect hotel for your stay
          </p>
        </div>

        <div className="p-4 mb-8 bg-white border rounded-lg shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <p className="mb-2 text-sm font-medium">Localization</p>
              <LocationSearch onChange={setLocation} />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Date Range</p>
              <DatePickerWithRange className="w-full" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Guests and rooms</p>
              <GuestSelector onChange={setGuests} />
            </div>
            <div className="flex items-end">
              <Button
                className="w-full"
                onClick={searchHotels}
                disabled={loading}
              >
                {loading ? "Searching" : "Find"}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-medium">{hotels.length}</p>
            <p className="text-sm text-muted-foreground">
              Find {format(new Date(), "d MMMM yyyy")}
            </p>
          </div>
          <SortSelector value={sortOption} onChange={setSortOption} />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg font-medium">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                name={hotel.name}
                location={hotel.location}
                price={hotel.price}
                rating={hotel.rating}
                image={hotel.image}
              />
            ))}
          </div>
        )}

        {hotels.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg font-medium">
              No hotels found for your search
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try changing your search criteria or check back later.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
