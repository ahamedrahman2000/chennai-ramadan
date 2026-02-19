import { useState, useEffect, useMemo } from "react";
import { MapPin, Phone, Clock } from "lucide-react";

export default function LadiesSehri() {
  const [providers, setProviders] = useState([]);
  const [displayProviders, setDisplayProviders] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [areaFilter, setAreaFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch providers
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(
          "https://ramadan-sehri-backend.onrender.com/api/providers",
        );
        const data = await response.json();

        const filtered = data.filter(
          (p) =>
            p.ladies === true && p.serviceType?.toLowerCase().includes("home"),
        );

        setProviders(filtered);
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Auto detect location on load
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.log("Location permission denied.");
      },
    );
  }, []);

  // Haversine Formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
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

  // Add distance when location available
  useEffect(() => {
    if (!userLocation) {
      setDisplayProviders(providers);
      return;
    }

    const withDistance = providers.map((p) => {
      if (p.lat && p.lng) {
        return {
          ...p,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            parseFloat(p.lat),
            parseFloat(p.lng),
          ),
        };
      }
      return p;
    });

    setDisplayProviders(withDistance);
  }, [userLocation, providers]);

  // Area Filter List
  const uniqueAreas = useMemo(() => {
    const areas = [
      ...new Set(providers.map((p) => p.area?.trim()).filter(Boolean)),
    ];

    areas.sort((a, b) => a.localeCompare(b)); // A-Z sorting

    return ["All", ...areas];
  }, [providers]);

  // Filtered Providers
  const filteredProviders = useMemo(() => {
    let list = displayProviders;

    if (areaFilter !== "All") {
      list = list.filter((p) => p.area === areaFilter);
    }

    return list;
  }, [displayProviders, areaFilter]);

  // Show Nearby Top 5
  const handleNearby = () => {
    if (!userLocation) {
      alert("Location not available");
      return;
    }

    const sorted = [...filteredProviders]
      .filter((p) => p.distance)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);

    setDisplayProviders(sorted);
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-yellow-500">
        Loading Ladies Sehri...
      </p>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0f0f0f] text-white px-3 sm:px-4 py-6 sm:py-10 overflow-hidden">
{/* 🌸 ULTRA PREMIUM RAMADAN BACKGROUND */}
<div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">

  {/* ✨ Divine Light Beam */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] 
                  bg-gradient-to-b from-pink-400/30 to-transparent 
                  blur-3xl opacity-40 animate-lightBeam"></div>

  {/* 🌙 Golden Crescent Corner */}
  <div className="absolute top-[-60px] right-[-60px] w-64 h-64 
                  rounded-full border-[18px] border-yellow-400/70 
                  opacity-40 rotate-12 blur-sm"></div>

  {/* 🌸 Parallax Floating Flowers */}
  <div className="absolute text-pink-400 text-3xl left-[10%] animate-floatSlow">🌸</div>
  <div className="absolute text-pink-300 text-2xl left-[35%] animate-floatMedium delay-1000">🌸</div>
  <div className="absolute text-pink-500 text-4xl left-[65%] animate-floatFast delay-2000">🌸</div>
  <div className="absolute text-pink-400 text-xl left-[85%] animate-floatMedium delay-3000">🌸</div>

  {/* ✨ Glitter Sparkles */}
  <div className="absolute w-1 h-1 bg-pink-300 rounded-full top-[15%] left-[20%] animate-twinkle"></div>
  <div className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full top-[65%] left-[70%] animate-twinkle delay-700"></div>
  <div className="absolute w-1 h-1 bg-white rounded-full top-[40%] left-[45%] animate-twinkle delay-1200"></div>

</div>

      
      {/* 🌸 Advice */}
      <div
       className="backdrop-blur-xl 
           bg-white/5 
           border border-pink-400/30 
           p-4 sm:p-5 
           rounded-2xl 
           shadow-[0_0_30px_rgba(236,72,153,0.2)] 
           hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] 
           transition-all duration-500"
      >
      <h1 className="text-xl sm:text-3xl font-bold text-center mb-5 sm:mb-6 shimmer-text">
          🌸 Ladies Sehri Support
        </h1>
        <p className="text-xs sm:text-sm">
          Please confirm availability before ordering and choose safe, verified
          providers. We only update location information and are not responsible
          for services. For your safety, please avoid traveling alone for Sehri
          at midnight. May Allah accept all your efforts and struggles.,
        </p>
      </div>

      {/* Title */}
      <h1 className="text-xl sm:text-3xl font-bold text-center mb-5 mt-5 sm:mb-6">
        Ladies Home Delivery Sehri
        <p className="mt-2 text-sm sm:text-base text-red-500 font-medium  inline-block px-4 py-1 rounded-full shadow-sm">
    ⚠️ After allowing location access, please refresh and click the button
  </p>
      </h1>

      {/* 🔍 Filter Section */}
      <div
        className="max-w-6xl mx-auto 
                  flex flex-col sm:flex-row 
                  gap-3 sm:gap-4 
                  mb-6 sm:mb-8"
      >
        <select
          value={areaFilter}
          onChange={(e) => setAreaFilter(e.target.value)}
          className="p-2 sm:p-3 
                 text-sm sm:text-base
                 rounded-lg 
                 bg-[#2A2A2A] 
                 border border-gray-600"
        >
          {uniqueAreas.map((area, i) => (
            <option key={i}>{area}</option>
          ))}
        </select>

        <button
          onClick={handleNearby}
          className="bg-pink-500 
                 text-sm sm:text-base
                 px-4 sm:px-6 
                 py-2 
                 rounded-lg 
                 font-semibold 
                 hover:bg-pink-600 transition"
        >
          Show Nearby (Top 5)
        </button>
      </div>

      {/* 🏠 Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            className="bg-[#222] 
                   p-4 sm:p-5 
                   rounded-xl 
                   border border-pink-500/40 
                   shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-bold text-pink-400">
              {provider.name}
            </h3>

            <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm text-gray-400">
              <MapPin size={14} />
              {provider.area}
            </div>

            <p className="mt-2 text-xs sm:text-sm text-yellow-400">
              {provider.sehriType}
            </p>

            <p className="mt-1 text-xs sm:text-sm text-gray-300">
              {provider.serviceType}
            </p>

            {provider.foodTime && (
              <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm">
                <Clock size={14} />
                {provider.foodTime}
              </div>
            )}

            <div className="flex items-center gap-2 mt-3 text-sm font-semibold">
              <Phone size={14} />
              <a
                href={`tel:${provider.contactNumber}`}
                className="hover:underline"
              >
                {provider.contactNumber}
              </a>
            </div>

            {provider.additionalInfo && (
              <p className="text-xs sm:text-sm mt-2 text-gray-400">
                {provider.additionalInfo}
              </p>
            )}

            {provider.distance && (
              <p className="text-xs sm:text-sm mt-2 text-green-400">
                {provider.distance.toFixed(2)} km away
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
