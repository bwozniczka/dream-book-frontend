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

export interface Listing {
    id: number;
    title: string;
    description: string;
    price_per_night: string;
    location: string;
    created_at: string;
    owner: number;
    owner_username: string;
}

export interface Hotel {
    id: number;
    title: string;
    description: string;
    price_per_night: string;
    location: string;
    latitude: string;
    longitude: string;
    image_url: string;
    created_at: string;
    owner: number;
    owner_username: string;
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
