import type { Stay } from "@/lib/types"
import { mockLandlordStays, mockGuestStays } from "./mock-data"

// External API base URL - replace with your actual API endpoint
const API_BASE_URL = "https://api.example.com"

export async function fetchStays(mode: "landlord" | "guest"): Promise<Stay[]> {
    // Simulate API request
    try {
        // In a real application, this would be a fetch to your external API endpoint
        // const response = await fetch(`${API_BASE_URL}/stays?mode=${mode}`)
        // if (!response.ok) throw new Error('Failed to fetch stays')
        // const data = await response.json()
        // return data

        // For demo purposes, we'll simulate a network request with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Simulate API being offline randomly (1 in 4 chance)
        if (Math.random() < 0.25) {
            throw new Error("API is offline")
        }

        // Return mock data based on mode
        return mode === "landlord" ? mockLandlordStays : mockGuestStays
    } catch (error) {
        console.log("API is offline, using mock data")
        // Fallback to mock data when API is offline
        return mode === "landlord" ? mockLandlordStays : mockGuestStays
    }
}

export async function submitReview(
    stayId: string,
    reviewData: {
        overallRating: number
        cleanliness: number
        communication: number
        checkIn: number
        accuracy: number
        comment: string
    },
): Promise<void> {
    // Simulate API request
    try {
        // In a real application, this would be a POST request to your external API endpoint
        // const response = await fetch(`${API_BASE_URL}/reviews`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ stayId, ...reviewData })
        // })
        // if (!response.ok) throw new Error('Failed to submit review')
        // return await response.json()

        // For demo purposes, we'll simulate a network request with a delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Simulate API failure (1 in 10 chance)
        if (Math.random() < 0.1) {
            throw new Error("Failed to submit review")
        }

        console.log("Review submitted:", { stayId, ...reviewData })

        // Update mock data
        const stayIndex = mockGuestStays.findIndex((stay) => stay.id === stayId)
        if (stayIndex !== -1) {
            mockGuestStays[stayIndex].rating = reviewData.overallRating
            mockGuestStays[stayIndex].hasReviewed = true
        }

        return
    } catch (error) {
        console.error("Error submitting review:", error)
        throw error
    }
}
