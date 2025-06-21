import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PressPage() {
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
              href="/hosts"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Hosts
            </Link>
            <Link
              href="/listings"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Listings
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
              href="/profile"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              My Profile
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Help
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Sign In
            </Link>
            <Button className="cursor-pointer">
              <Link href="/signup">Register</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-12 md:px-6 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Press & Media</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Media Inquiries</h2>
          <p className="mb-4 text-muted-foreground">
            For press inquiries, interview requests, or media resources, please
            contact our PR team at{" "}
            <a
              href="mailto:press@dreambook.com"
              className="text-primary hover:underline"
            >
              press@dreambook.com
            </a>{" "}
            or call +1 (415) 555-0123.
          </p>
          <p className="mb-4 text-muted-foreground">
            Our team is available Monday through Friday, 9 AM to 5 PM PT. We
            strive to respond to all inquiries within 24 business hours.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Recent Press Releases</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <time className="text-sm text-muted-foreground">
                  May 15, 2025
                </time>
                <h3 className="font-bold text-lg my-2">
                  DreamBook Expands to Asian Markets with 10,000 New Property
                  Listings
                </h3>
                <p className="text-muted-foreground">
                  DreamBook announces its expansion into key Asian markets,
                  adding over 10,000 new properties in Japan, South Korea, and
                  Thailand to its platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <time className="text-sm text-muted-foreground">
                  April 2, 2025
                </time>
                <h3 className="font-bold text-lg my-2">
                  DreamBook Introduces New Sustainability Initiative for
                  Eco-Friendly Accommodations
                </h3>
                <p className="text-muted-foreground">
                  DreamBook launches a new certification program for
                  environmentally sustainable properties, making it easier for
                  travelers to find and book eco-friendly accommodations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <time className="text-sm text-muted-foreground">
                  March 10, 2025
                </time>
                <h3 className="font-bold text-lg my-2">
                  DreamBook Reaches 5 Million User Milestone
                </h3>
                <p className="text-muted-foreground">
                  DreamBook celebrates reaching 5 million registered users
                  worldwide, marking a significant growth milestone for the
                  travel booking platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">DreamBook in the News</h2>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="font-bold mb-1">
                "How DreamBook is Disrupting the Hotel Booking Industry" - Tech
                Insider
              </h3>
              <time className="text-sm text-muted-foreground">
                February 25, 2025
              </time>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-bold mb-1">
                "Top 10 Travel Apps of 2025: DreamBook Takes #1 Spot" - Travel
                Weekly
              </h3>
              <time className="text-sm text-muted-foreground">
                January 15, 2025
              </time>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-bold mb-1">
                "The Future of Travel: Interview with DreamBook's CEO" -
                Business Journal
              </h3>
              <time className="text-sm text-muted-foreground">
                December 5, 2024
              </time>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Media Resources</h2>
          <p className="mb-4 text-muted-foreground">
            Download our press kit, which includes company logos, executive
            headshots, product screenshots, and fact sheets.
          </p>
          <div className="bg-muted p-4 rounded flex justify-between items-center">
            <span>DreamBook Press Kit (ZIP, 25MB)</span>
            <button className="text-primary hover:underline">Download</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
