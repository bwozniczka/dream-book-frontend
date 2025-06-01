"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { fetchListings } from "@/lib/api";
import type { Listing } from "@/lib/types";

// Local interface for the form (different from API response)
interface AnnouncementForm {
  id: number;
  title: string;
  address: string;
  description: string;
  pricePerNight: number;
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getListings = async () => {
      try {
        setLoading(true);
        const data = await fetchListings();
        setAnnouncements(data);
      } catch (err) {
        setError("Failed to fetch listings. Please try again later.");
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };

    getListings();
  }, []);

  const [newAnnouncement, setNewAnnouncement] = useState<AnnouncementForm>({
    id: 0,
    title: "",
    address: "",
    description: "",
    pricePerNight: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleAddAnnouncement = async () => {
    if (!newAnnouncement.title || !newAnnouncement.address) return;
    
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      // Import the createListing function
      const { createListing } = await import('@/lib/api');
      
      // Make the API call to create a new listing
      const createdListing = await createListing({
        title: newAnnouncement.title,
        description: newAnnouncement.description || "",
        price_per_night: newAnnouncement.pricePerNight.toString(),
        location: newAnnouncement.address,
      });
      
      // Add the new listing to the state
      setAnnouncements((prev) => [...prev, createdListing]);
      
      // Reset form
      setNewAnnouncement({ id: 0, title: "", address: "", description: "", pricePerNight: 0 });
    } catch (error) {
      console.error("Error creating announcement:", error);
      setSubmitError("Failed to create announcement. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container px-4 py-6 mx-auto md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Zarządzaj ogłoszeniami</h1>

      {/* Loading and error states */}
      {loading && <p className="text-center py-4">Loading listings...</p>}
      {error && <p className="text-center py-4 text-red-600">{error}</p>}

      {/* Formularz dodawania ogłoszenia */}
      <div className="p-6 mb-8 bg-white border rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Dodaj nowe ogłoszenie</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Tytuł"
            value={newAnnouncement.title}
            onChange={(e) =>
              setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Adres"
            value={newAnnouncement.address}
            onChange={(e) =>
              setNewAnnouncement({ ...newAnnouncement, address: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg"
          />
          <textarea
            placeholder="Opis"
            value={newAnnouncement.description}
            onChange={(e) =>
              setNewAnnouncement({
                ...newAnnouncement,
                description: e.target.value,
              })
            }
            className="w-full px-4 py-2 border rounded-lg md:col-span-2"
          />
          <input
            type="number"
            placeholder="Cena za noc (PLN)"
            value={newAnnouncement.pricePerNight}
            onChange={(e) =>
              setNewAnnouncement({
                ...newAnnouncement,
                pricePerNight: parseFloat(e.target.value) || 0,
              })
            }
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mt-4">
          <Button
            onClick={handleAddAnnouncement}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-black hover:to-gray-800 text-white font-medium py-2.5"
          >
            {isSubmitting ? 'Dodawanie...' : 'Dodaj ogłoszenie'}
          </Button>
          {submitError && (
            <p className="mt-2 text-red-600 text-sm">{submitError}</p>
          )}
        </div>
      </div>

      {/* Lista ogłoszeń */}
      {!loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {announcements.map((listing) => (
            <div
              key={listing.id}
              className="p-4 bg-white border rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold">{listing.title}</h3>
              <p className="text-sm text-gray-600">{listing.location}</p>
              <p className="mt-2 text-sm text-gray-800">{listing.description}</p>
              <p className="mt-4 text-lg font-semibold">
                {listing.price_per_night} PLN / noc
              </p>
              <div className="mt-2 text-xs text-gray-500">
                <p>Added by: {listing.owner_username}</p>
                <p>Created: {new Date(listing.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}