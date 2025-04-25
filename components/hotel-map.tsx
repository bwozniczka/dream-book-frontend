import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet
(delete (L.Icon.Default.prototype as any)._getIconUrl);
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Hotel {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
}

interface HotelMapProps {
  hotels: Hotel[];
  className?: string; // Opcjonalna klasa CSS
}

export default function HotelMap({ hotels, className }: HotelMapProps) {
    return (
      <MapContainer
        center={[52.2297, 21.0122]} // Współrzędne Polski (Warszawa)
        zoom={6} // Powiększenie mapy
        className={`rounded-lg shadow-md mx-auto ${className || ""}`} // Dodano `mx-auto` dla wycentrowania
        style={{ width: "500px", height: "500px" }} // Rozmiar mapy 500x500 pikseli
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {hotels.map((hotel) => (
          <Marker key={hotel.id} position={[hotel.latitude, hotel.longitude]}>
            <Popup>
              <strong>{hotel.name}</strong>
              <br />
              {hotel.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }