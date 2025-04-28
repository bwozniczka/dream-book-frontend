import { mockUsers } from "./mock-data"
import type { UserData } from "./types"

// External API base URL - replace with your actual API endpoint
const API_BASE_URL = "https://api.example.com"

export async function fetchUsers(): Promise<UserData[]> {
    try {
        // In a real application, this would be a fetch to your external API endpoint
        // const response = await fetch(`${API_BASE_URL}/admin/users`)
        // if (!response.ok) throw new Error('Failed to fetch users')
        // return await response.json()

        // For demo purposes, we'll simulate a network request with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Return mock data
        return mockUsers
    } catch (error) {
        console.error("Error fetching users:", error)
        throw error
    }
}

export async function updateUserRole(userId: string, role: string): Promise<void> {
    try {
        // In a real application, this would be a PUT request to your external API endpoint
        // const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/role`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ role })
        // })
        // if (!response.ok) throw new Error('Failed to update user role')

        // For demo purposes, we'll simulate a network request with a delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Update mock data
        const userIndex = mockUsers.findIndex((user) => user.id === userId)
        if (userIndex !== -1) {
            mockUsers[userIndex].role = role as "guest" | "landlord" | "admin"
        }
    } catch (error) {
        console.error("Error updating user role:", error)
        throw error
    }
}

export async function updateUserStatus(userId: string, isActive: boolean): Promise<void> {
    try {
        // In a real application, this would be a PUT request to your external API endpoint
        // const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ isActive })
        // })
        // if (!response.ok) throw new Error('Failed to update user status')

        // For demo purposes, we'll simulate a network request with a delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Update mock data
        const userIndex = mockUsers.findIndex((user) => user.id === userId)
        if (userIndex !== -1) {
            mockUsers[userIndex].isActive = isActive
        }
    } catch (error) {
        console.error("Error updating user status:", error)
        throw error
    }
}
