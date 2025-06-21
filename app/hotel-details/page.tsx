import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { GuestSelector } from "@/components/guest-selector"
import { Header } from "@/components/header"
import {
  CheckIcon,
  MapPinIcon,
  StarIcon,
  WifiIcon,
  UtensilsIcon,
  ParkingMeterIcon as ParkingIcon,
  TvIcon,
  ShowerHeadIcon as SwimmingPoolIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HotelDetails() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto md:px-6 md:py-8">
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <span className="text-sm text-muted-foreground">/</span>
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                New York
              </Link>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm">Grand Plaza Hotel</span>
            </div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Grand Plaza Hotel
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <StarIcon className="w-4 h-4 fill-primary text-primary" />
                <StarIcon className="w-4 h-4 fill-primary text-primary" />
                <StarIcon className="w-4 h-4 fill-primary text-primary" />
                <StarIcon className="w-4 h-4 fill-primary text-primary" />
                <StarIcon className="w-4 h-4 fill-primary text-primary" />
                <span className="ml-2 text-sm font-medium">
                  4.8 (245 reviews)
                </span>
              </div>
              <span className="text-sm text-muted-foreground">•</span>
              <div className="flex items-center gap-1">
                <MapPinIcon className="w-4 h-4" />
                <span className="text-sm">Central Park, New York</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative col-span-1 overflow-hidden rounded-lg md:col-span-2 lg:col-span-2 aspect-video">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                alt="Hotel main image"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Hotel image"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Hotel image"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Hotel image"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <Button
                  variant="secondary"
                  className="absolute inset-0 w-full h-full"
                >
                  +12 more
                </Button>
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Hotel image"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="rooms">Rooms</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        About Grand Plaza Hotel
                      </h2>
                      <p className="text-muted-foreground">
                        Located in the heart of New York City, Grand Plaza Hotel
                        offers luxury accommodations with stunning views of
                        Central Park. Our hotel features spacious rooms, a
                        rooftop pool, fine dining restaurants, and a
                        state-of-the-art fitness center.
                      </p>
                      <p className="mt-4 text-muted-foreground">
                        With its prime location, guests can easily access famous
                        attractions like Times Square, Broadway theaters, and
                        Fifth Avenue shopping. Our dedicated staff provides
                        exceptional service to ensure a memorable stay for all
                        our guests.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        Hotel Highlights
                      </h2>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-start gap-2">
                          <CheckIcon className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Central Location</h3>
                            <p className="text-sm text-muted-foreground">
                              Steps away from Central Park and major attractions
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckIcon className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Luxury Rooms</h3>
                            <p className="text-sm text-muted-foreground">
                              Spacious accommodations with premium amenities
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckIcon className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Fine Dining</h3>
                            <p className="text-sm text-muted-foreground">
                              Award-winning restaurants and 24-hour room service
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckIcon className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Wellness Facilities</h3>
                            <p className="text-sm text-muted-foreground">
                              Spa, fitness center, and rooftop swimming pool
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="rooms" className="pt-6">
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Available Rooms
                    </h2>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-0">
                          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
                            <div className="relative h-48 md:h-full">
                              <Image
                                src="/placeholder.svg?height=300&width=300"
                                alt="Deluxe Room"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-6">
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold">
                                    Deluxe King Room
                                  </h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline">King Bed</Badge>
                                    <Badge variant="outline">City View</Badge>
                                    <Badge variant="outline">400 sq ft</Badge>
                                  </div>
                                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                                    <li className="flex items-center gap-2 text-sm">
                                      <WifiIcon className="w-4 h-4" /> Free WiFi
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                      <UtensilsIcon className="w-4 h-4" />{" "}
                                      Breakfast included
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                      <TvIcon className="w-4 h-4" /> Smart TV
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                      <ParkingIcon className="w-4 h-4" /> Free
                                      parking
                                    </li>
                                  </ul>
                                </div>
                                <div className="mt-4 md:mt-0 md:text-right">
                                  <div className="text-2xl font-bold">$199</div>
                                  <div className="text-sm text-muted-foreground">
                                    per night
                                  </div>
                                  <Button className="mt-4 w-full md:w-auto">
                                    Book Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-0">
                          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
                            <div className="relative h-48 md:h-full">
                              <Image
                                src="/placeholder.svg?height=300&width=300"
                                alt="Suite"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-6">
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold">
                                    Executive Suite
                                  </h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline">King Bed</Badge>
                                    <Badge variant="outline">Park View</Badge>
                                    <Badge variant="outline">650 sq ft</Badge>
                                  </div>
                                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                                    <li className="flex items-center gap-2 text-sm">
                                      <WifiIcon className="w-4 h-4" /> Free WiFi
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                      <UtensilsIcon className="w-4 h-4" />{" "}
                                      Breakfast included
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                      <TvIcon className="w-4 h-4" /> Smart TV
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                      <SwimmingPoolIcon className="w-4 h-4" />{" "}
                                      Pool access
                                    </li>
                                  </ul>
                                </div>
                                <div className="mt-4 md:mt-0 md:text-right">
                                  <div className="text-2xl font-bold">$349</div>
                                  <div className="text-sm text-muted-foreground">
                                    per night
                                  </div>
                                  <Button className="mt-4 w-full md:w-auto">
                                    Book Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="amenities" className="pt-6">
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Hotel Amenities
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <SwimmingPoolIcon className="w-5 h-5" />
                            Swimming Pool
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Enjoy our rooftop swimming pool with panoramic views
                            of the city skyline.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <UtensilsIcon className="w-5 h-5" />
                            Restaurants
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Multiple dining options including fine dining,
                            casual café, and 24-hour room service.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <WifiIcon className="w-5 h-5" />
                            Free WiFi
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            High-speed internet access available throughout the
                            hotel.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Guest Reviews</h2>
                      <Button>Write a Review</Button>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <span className="font-medium">JD</span>
                          </div>
                          <div>
                            <div className="font-medium">John Doe</div>
                            <div className="text-sm text-muted-foreground">
                              Stayed in May 2023
                            </div>
                          </div>
                          <div className="flex items-center gap-1 ml-auto">
                            <StarIcon className="w-4 h-4 fill-primary text-primary" />
                            <span className="font-medium">5.0</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          Excellent location and service. The room was spacious
                          and clean with a beautiful view of Central Park. Staff
                          was very friendly and helpful. Would definitely stay
                          here again!
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <span className="font-medium">JS</span>
                          </div>
                          <div>
                            <div className="font-medium">Jane Smith</div>
                            <div className="text-sm text-muted-foreground">
                              Stayed in April 2023
                            </div>
                          </div>
                          <div className="flex items-center gap-1 ml-auto">
                            <StarIcon className="w-4 h-4 fill-primary text-primary" />
                            <span className="font-medium">4.5</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          Great hotel in a perfect location. The room was
                          comfortable and the staff was attentive. The only
                          minor issue was the noise from the street, but that's
                          expected in NYC.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Book Your Stay</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DatePickerWithRange />
                  <GuestSelector />
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between">
                      <span>$199 x 7 nights</span>
                      <span>$1,393</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & fees</span>
                      <span>$209</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>$1,602</span>
                    </div>
                  </div>
                  <Button className="w-full">Reserve Now</Button>
                  <p className="text-xs text-center text-muted-foreground">
                    You won't be charged yet
                  </p>
                </CardContent>
              </Card>

              <div className="mt-6 p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Location</h3>
                <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Map"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <MapPinIcon className="w-4 h-4 inline mr-1" />
                  123 Central Park West, New York, NY 10023
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View on Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-6 py-8 px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Help</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Newsletter</h3>
              <form className="flex space-x-2">
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="max-w-[160px] sm:max-w-[200px]"
                />
                <Button type="submit" size="sm">
                  Join
                </Button>
              </form>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              © 2025 HotelBooker. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
