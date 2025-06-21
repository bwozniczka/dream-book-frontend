import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
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
  )
}
