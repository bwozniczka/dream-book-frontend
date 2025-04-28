"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Announcement {
  id: number;
  title: string;
  address: string;
  description: string;
  pricePerNight: number;
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Przytulny apartament w centrum",
      address: "Warszawa, ul. Marszałkowska 10",
      description: "Idealne miejsce na weekendowy wypad do stolicy.",
      pricePerNight: 200,
    },
    {
      id: 2,
      title: "Domek nad morzem",
      address: "Gdańsk, ul. Plażowa 5",
      description: "Piękny domek z widokiem na morze.",
      pricePerNight: 300,
    },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState<Announcement>({
    id: 0,
    title: "",
    address: "",
    description: "",
    pricePerNight: 0,
  });

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.address) return;

    setAnnouncements((prev) => [
      ...prev,
      { ...newAnnouncement, id: prev.length + 1 },
    ]);
    setNewAnnouncement({ id: 0, title: "", address: "", description: "", pricePerNight: 0 });
  };

  return (
    <div className="container px-4 py-6 mx-auto md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Zarządzaj ogłoszeniami</h1>

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
            className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-black hover:to-gray-800 text-white font-medium py-2.5"
          >
            Dodaj ogłoszenie
          </Button>
        </div>
      </div>

      {/* Lista ogłoszeń */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="p-4 bg-white border rounded-lg shadow-md"
          >
            <h3 className="text-lg font-bold">{announcement.title}</h3>
            <p className="text-sm text-gray-600">{announcement.address}</p>
            <p className="mt-2 text-sm text-gray-800">{announcement.description}</p>
            <p className="mt-4 text-lg font-semibold">
              {announcement.pricePerNight} PLN / noc
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}