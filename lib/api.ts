// filepath: /Users/bartlomiejwozniczka/Desktop/dream-book-frontend/lib/api.ts
import type { Stay, UserData, Listing, Hotel, Host } from "@/lib/types"
import { mockLandlordStays, mockGuestStays, mockUserProfile } from "./mock-data"

// External API base URL - używany w rzeczywistej implementacji
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"

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
  } catch {
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
  }
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

export async function fetchUserProfile(): Promise<UserData> {
  // Symulacja żądania API
  try {
    // W rzeczywistej aplikacji, byłoby to zapytanie do zewnętrznego API
    // const response = await fetch(`${API_BASE_URL}/user/profile`)
    // if (!response.ok) throw new Error('Nie udało się pobrać profilu użytkownika')
    // const data = await response.json()
    // return data

    // Symulacja opóźnienia sieciowego
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Symulacja prawdopodobieństwa, że API jest offline (1 na 4 szanse)
    if (Math.random() < 0.25) {
      throw new Error("API jest offline")
    }

    // Zwróć zmockowane dane
    return mockUserProfile
  } catch {
    console.log("API jest offline, używam zmockowanych danych")
    // Powrót do zmockowanych danych, gdy API jest offline
    return mockUserProfile
  }
}

export async function updateUserProfile(
  userId: string,
  userData: {
    name?: string
    email?: string
  }
): Promise<UserData> {
  // Symulacja żądania API
  try {
    // W rzeczywistej aplikacji, byłoby to zapytanie PUT do zewnętrznego API
    // const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // })
    // if (!response.ok) throw new Error('Nie udało się zaktualizować profilu użytkownika')
    // const data = await response.json()
    // return data

    // Symulacja opóźnienia sieciowego
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Zwróć zaktualizowane dane
    return {
      ...mockUserProfile,
      ...userData,
    }
  } catch (error) {
    console.error("Błąd podczas aktualizacji profilu:", error)
    throw new Error("Nie udało się zaktualizować profilu")
  }
}

export async function fetchListings(): Promise<Listing[]> {
  try {
    // Set a timeout for the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
    
    const response = await fetch("http://127.0.0.1:8000/api/listings/", {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch listings: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching listings:", error);
    // You could add more sophisticated fallback logic here if needed
    // For example, returning mock data when the API is unavailable
    return [];
  }
}

export async function createListing(listingData: {
  title: string;
  description: string;
  price_per_night: string;
  location: string;
}): Promise<Listing> {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/listings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add authorization headers if required by your API
        // "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(listingData)
    });

    if (!response.ok) {
      throw new Error(`Failed to create listing: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
}

export async function fetchHotels(): Promise<Hotel[]> {
  try {
    // Set a timeout for the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
    
    const response = await fetch("http://127.0.0.1:8000/api/listings/", {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch hotels: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching hotels:", error);
    // Return empty array in case of error
    return [];
  }
}

export async function fetchHosts(): Promise<Host[]> {
  try {
    // Set a timeout for the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
    
    const response = await fetch("http://127.0.0.1:8000/api/hosts/", {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch hosts: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching hosts:", error);
    // Return empty array in case of error
    return [];
  }
}
