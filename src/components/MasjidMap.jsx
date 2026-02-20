import { useEffect, useState } from "react";

export default function MasjidMap() {
  const [providers, setProviders] = useState([]);
  const [nearestProviders, setNearestProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationBlocked, setLocationBlocked] = useState(false);

  // Fetch providers from backend
  useEffect(() => {
    fetch("https://ramadan-sehri-backend.onrender.com/api/providers/nearby")
      .then((res) => res.json())
      .then((data) => setProviders(data))
      .catch((err) => console.error("Error fetching providers:", err));
  }, []);

  // Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    lat1 = Number(lat1);
    lon1 = Number(lon1);
    lat2 = Number(lat2);
    lon2 = Number(lon2);

    const R = 6371; // km
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

  // Request user location
  const getUserLocation = async () => {
    setLoading(true);
    setLocationBlocked(false);

    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      setLoading(false);
      return;
    }

    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "denied") {
        setLocationBlocked(true);
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;

          const sorted = providers
            .filter(
              (p) =>
                p.lat !== null &&
                p.lng !== null &&
                !isNaN(p.lat) &&
                !isNaN(p.lng)
            )
            .map((p) => ({
              ...p,
              distance: calculateDistance(userLat, userLng, p.lat, p.lng),
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 5);

          setNearestProviders(sorted);
          setLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);

          if (error.code === 1) {
            // Permission denied
            setLocationBlocked(true);
          }

          setLoading(false);
        }
      );
    } catch (err) {
      console.error("Permission error:", err);
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-4 sm:px-6 py-6">
      
      {/* Title */}
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D4AF37] tracking-wide">
          Sehri Locations
        </h3>
      </div>

      {/* Location Button (Always Visible) */}
      <div className="text-center mb-6">
        <button
          onClick={getUserLocation}
          className="bg-[#D4AF37] text-black font-semibold py-2 px-6 rounded hover:bg-yellow-400 transition"
        >
          Show Nearby Sehri Locations
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-[#D4AF37] font-semibold mb-4">
          Loading nearby locations...
        </div>
      )}

      {/* Location Blocked Message */}
      {locationBlocked && (
        <div className="max-w-md mx-auto bg-red-900 text-white p-4 rounded-lg mt-4 text-sm">
          <p className="font-semibold mb-2">📍 Location Permission Disabled</p>
          <p className="mb-2">
            Please enable location in your device settings to see nearby Sehri
            locations.
          </p>
          <p className="text-xs text-gray-300">
            After enabling location, refresh this page and try again.
          </p>
        </div>
      )}

      {/* Nearby Providers */}
      {nearestProviders.length > 0 && (
        <div className="max-w-4xl mx-auto bg-[#222] p-6 mt-5 rounded-xl border border-[#333]">
          <h3 className="text-[#D4AF37] text-xl font-bold mb-4">
            📍 Nearby Sehri Locations
          </h3>

          {nearestProviders.map((item) => {
            const walkMinutes = item.distance
              ? Math.round((item.distance / 5) * 60)
              : null;

            return (
              <div
                key={item.id}
                className="border-b border-[#333] py-3 last:border-none"
              >
                <p className="font-semibold text-xs">{item.name}</p>
                <p className="text-xs text-gray-400">
                  {item.area}
                  {item.distance ? ` • ${item.distance.toFixed(2)} km` : ""}
                  {walkMinutes ? ` (~${walkMinutes} min walk)` : ""}
                </p>
                <p className="text-xs text-gray-300">{item.address}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Google My Map */}
      <div className="max-w-6xl mx-auto mb-6 mt-8">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1w8sJbVcvXSBCEs8HrDN9_Mfy7iv5fEw"
          width="100%"
          height="500"
          className="rounded-xl border border-[#333]"
          loading="lazy"
          title="Masjid Location Map"
        />
      </div>
    </section>
  );
}