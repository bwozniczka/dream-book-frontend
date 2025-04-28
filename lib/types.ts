export interface Stay {
    id: string
    propertyName: string
    propertyType: string
    location: string
    checkIn: string
    checkOut: string
    nights: number
    guestName?: string
    hostName?: string
    guestImageUrl?: string
    hostImageUrl?: string
    imageUrl: string
    rating?: number
    status: "completed" | "upcoming"
    hasReviewed?: boolean
}

export interface Review {
    id: string
    stayId: string
    overallRating: number
    cleanliness: number
    communication: number
    checkIn: number
    accuracy: number
    comment: string
    createdAt: string
}

export interface UserData {
    id: string
    name: string
    email: string
    role: "guest" | "landlord" | "admin"
    isActive: boolean
    joinedAt: string
    avatarUrl?: string
    properties?: number
    bookings?: number
}
