import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"
import Image from "next/image"
import { HotelCard } from "@/components/hotel-card"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { GuestSelector } from "@/components/guest-selector"
import { LocationSearch } from "@/components/location-search"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Find Your Perfect Stay
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover amazing hotels at the best prices. Book your dream
                    vacation today.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <div className="flex space-x-2">
                    <Button className="w-full">Book Now</Button>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
              <Card className="overflow-hidden border-0 shadow-lg">
                <CardContent className="p-0">
                  <Tabs defaultValue="hotels" className="w-full">
                    <TabsList className="grid w-full rounded-none font-bold text-white bg-black">
                      Hotel
                    </TabsList>
                    <TabsContent value="hotels" className="p-6 space-y-4">
                      <div className="space-y-4">
                        <LocationSearch />
                        <DatePickerWithRange />
                        <GuestSelector />
                        <Button className="w-full">Search Hotels</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Popular Destinations
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our most booked destinations and find your next
                  adventure.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              <HotelCard
                name="Grand Plaza Hotel"
                location="New York"
                price={199}
                rating={4.8}
                image="/placeholder.svg?height=400&width=600"
              />
              <HotelCard
                name="Seaside Resort & Spa"
                location="Miami"
                price={249}
                rating={4.9}
                image="/placeholder.svg?height=400&width=600"
              />
              <HotelCard
                name="Mountain View Lodge"
                location="Denver"
                price={179}
                rating={4.7}
                image="/placeholder.svg?height=400&width=600"
              />
              <HotelCard
                name="City Center Suites"
                location="Chicago"
                price={159}
                rating={4.6}
                image="/placeholder.svg?height=400&width=600"
              />
              <HotelCard
                name="Palm Paradise Resort"
                location="Los Angeles"
                price={289}
                rating={4.9}
                image="/placeholder.svg?height=400&width=600"
              />
              <HotelCard
                name="Harbor View Hotel"
                location="San Francisco"
                price={229}
                rating={4.8}
                image="/placeholder.svg?height=400&width=600"
              />
            </div>
          </div>
        </section>
        <section className="py-12 bg-muted md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Special Offers
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take advantage of our limited-time deals and save on your next
                  stay.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Special offer"
                    width={600}
                    height={400}
                    className="object-cover w-full h-48"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">Weekend Getaway</h3>
                    <p className="text-muted-foreground">
                      Save 20% on weekend stays
                    </p>
                    <Button className="mt-4 w-full">Book Now</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Special offer"
                    width={600}
                    height={400}
                    className="object-cover w-full h-48"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">Extended Stay</h3>
                    <p className="text-muted-foreground">
                      30% off for stays of 7+ nights
                    </p>
                    <Button className="mt-4 w-full">Book Now</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Special offer"
                    width={600}
                    height={400}
                    className="object-cover w-full h-48"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">Family Package</h3>
                    <p className="text-muted-foreground">
                      Kids stay free + free breakfast
                    </p>
                    <Button className="mt-4 w-full">Book Now</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
