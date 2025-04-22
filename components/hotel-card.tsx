import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface HotelCardProps {
  name: string
  location: string
  price: number
  rating: number
  image: string
}

export function HotelCard({ name, location, price, rating, image }: HotelCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Link href="/hotel-details">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={600}
            height={400}
            className="object-cover w-full h-48 transition-transform hover:scale-105"
          />
        </Link>
        <div className="p-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-bold">{name}</h3>
              <p className="text-sm text-muted-foreground">{location}</p>
            </div>
            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-xl font-bold">${price}</span>
              <span className="text-sm text-muted-foreground"> / night</span>
            </div>
            <Button size="sm" asChild>
              <Link href="/hotel-details">View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

