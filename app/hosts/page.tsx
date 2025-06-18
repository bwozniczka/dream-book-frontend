"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { HostCard } from "@/components/host-card"
import { DynamicLocationSearch } from "@/components/dynamic-location-search"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { GuestSelector } from "@/components/guest-selector"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { fetchHosts } from "@/lib/api"
import type { Host } from "@/lib/types"

export default function Hosts() {
  const [location, setLocation] = useState("")
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  })
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 })
  const [hosts, setHosts] = useState<Host[]>([])
  const [filteredHosts, setFilteredHosts] = useState<Host[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Store unique locations from API data
  const [uniqueLocations, setUniqueLocations] = useState<{value: string, label: string}[]>([])
  
  // Fetch hosts from API on component mount
  useEffect(() => {
    const getHosts = async () => {
      try {
        setLoading(true);
        const data = await fetchHosts();
        setHosts(data);
        setFilteredHosts(data);
        
        // Extract unique locations for the LocationSearch component
        const locations = data
          .map(host => host.location)
          .filter((location): location is string => 
            typeof location === 'string' && location.trim() !== '')
          .reduce<string[]>((unique, location) => {
            const trimmed = location.trim();
            if (trimmed && !unique.includes(trimmed)) {
              unique.push(trimmed);
            }
            return unique;
          }, [])
          .sort((a, b) => a.localeCompare(b))
          .map(loc => ({
            value: loc.toLowerCase().replace(/\s+/g, '-'),
            label: loc
          }));
          
        setUniqueLocations(locations);
      } catch (err) {
        setError("Failed to fetch hosts. Please try again later.");
        console.error("Error fetching hosts:", err);
      } finally {
        setLoading(false);
      }
    };

    getHosts();
  }, []);

  const handleSearch = () => {
    setLoading(true)

    setTimeout(() => {
      let filtered = [...hosts];
      
      // Filter by location if provided
      if (location) {
        filtered = filtered.filter(host =>
          host.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      setFilteredHosts(filtered)
      setLoading(false)
    }, 500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
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
              href="/hosts"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Hosts
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
              <DynamicLocationSearch 
                locations={uniqueLocations} 
                onChange={(value: string) => {
                  setLocation(value);
                  
                  // Filter hosts when location changes
                  setLoading(true);
                  setTimeout(() => {
                    if (hosts.length === 0) {
                      setLoading(false);
                      return;
                    }
                    
                    let filtered = [...hosts];
                    
                    if (value) {
                      filtered = filtered.filter(host =>
                        host.location === value
                      );
                    }
                    
                    setFilteredHosts(filtered);
                    setLoading(false);
                  }, 300);
              }} />
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

        {/* Results Count */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-medium">
              {filteredHosts.length} {location ? `host(s) w lokalizacji "${location}"` : "host(s)"}
            </p>
            {location && (
              <button 
                onClick={() => {
                  setLocation("");
                  setFilteredHosts(hosts);
                }}
                className="text-blue-600 hover:underline text-sm"
              >
                Pokaż wszystkie lokalizacje
              </button>
            )}
          </div>
        </div>

        {/* Hosts Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-8 w-8 text-gray-700 mb-4"
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
              <p className="text-lg font-medium">Loading hosts...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg font-medium text-red-600">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Please try again later or contact support.
            </p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-gray-700 hover:bg-gray-800"
            >
              Refresh
            </Button>
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
        {filteredHosts.length === 0 && !loading && !error && (
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
