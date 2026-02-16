import { useState, useEffect } from "react";
import HomeStatusPopup from "./HomeStatusPopup";

export default function MasjidMap2() {
  const [providers, setProviders] = useState([]);
  const [nearestProviders, setNearestProviders] = useState([]);
  const [locationRequested, setLocationRequested] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Haversine formula to calculate distance in KM
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    lat1 = Number(lat1);
    lon1 = Number(lon1);
    lat2 = Number(lat2);
    lon2 = Number(lon2);

    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Fetch providers from backend on mount
  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://ramadan-sehri-backend.onrender.com/api/providers",
        );
        if (!response.ok) throw new Error("Failed to fetch providers");
        const data = await response.json();
        setProviders(data);
      } catch (err) {
        console.error("Error fetching providers:", err);
        setError("Failed to load Sehri locations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  // Get user's location and compute nearest providers
  const getUserLocation = () => {
    setLocationRequested(true);
    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const sorted = providers
          .filter((p) => p.lat && p.lng) // only include providers with coordinates
          .map((p) => ({
            ...p,
            distance: calculateDistance(userLat, userLng, p.lat, p.lng),
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5); // top 5 nearest

        setNearestProviders(sorted);
        setLoading(false);
      },
      () => {
        alert("Location access denied. Cannot show nearby locations.");
        setLoading(false);
      },
    );
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg text-yellow-500">
        Loading Sehri locations...
      </p>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-lg text-red-500">{error}</p>;
  }

  return (<>
  <HomeStatusPopup />
    <section className="relative min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-4 sm:px-6 py-6 sm:py-">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#D4AF37] mb-4 sm:mb-6">
        Sehri Locations
      </h3>
      {/* Button to request location */}
      {!locationRequested && (
        <div className="text-center mb-6">
          <button
            type="button"
            onClick={getUserLocation}
            className="bg-[#D4AF37] text-black font-semibold py-2 px-6 rounded hover:bg-yellow-400 transition"
          >
            Show Nearby Sehri Locations
          </button>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center text-[#D4AF37] font-semibold mb-4">
          Loading nearby locations...
        </div>
      )}
      {nearestProviders.length > 0 && (
        <div className="max-w-4xl mx-auto mb-4 sm:mb-10 bg-[#222] p-4 sm:p-6 mt-4 sm:mt-2 rounded-xl border border-[#333]">
          <h3 className="text-lg sm:text-xl  font-bold text-[#D4AF37] mb-3 sm:mb-4">
            📍 Nearby Sehri Locations
          </h3>

          {nearestProviders.map((item) => {
            const walkMinutes = Math.round((item.distance / 5) * 60); // 5 km/h walking
            return (
              <div
                key={item.id}
                className="border-b border-[#333] py-3 last:border-none"
              >
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-400">
                  {item.area} • {item.distance.toFixed(2)} km
                  {walkMinutes ? ` (~${walkMinutes} min walk)` : ""}
                </p>
              </div>
            );
          })}
        </div>
      )}
      {/* Google My Map */}
      <div className="max-w-6xl mx-auto mb-6">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1w8sJbVcvXSBCEs8HrDN9_Mfy7iv5fEw"
          width="100%"
          height="500"
          className="rounded-xl border border-[#333]"
          loading="lazy"
          title="Masjid Location Map"
        />
      </div>

      {/* Nearby Locations */}
    </section>
  </>
      
  );
}
