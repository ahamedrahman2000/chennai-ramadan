import { useState, useEffect, useMemo } from "react";
import { Phone, MapPin, Clock, Star, Share2 } from "lucide-react";

export default function FindSehri() {
  const [areaFilter, setAreaFilter] = useState("All Areas");
  const [serviceFilter, setServiceFilter] = useState("All Service Types");
  const [sehriTypeFilter, setSehriTypeFilter] = useState("All Sehri Types");
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch providers
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(
          "https://ramadan-sehri-backend.onrender.com/api/providers",
        );
        const data = await response.json();
        setProviders(data);
      } catch (err) {
        console.error("Failed to fetch providers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  // Remove duplicates
  const uniqueProviders = useMemo(() => {
    const map = new Map();
    (providers || []).forEach((p) => {
      const key = `${p.name}-${p.area}`;
      if (!map.has(key)) map.set(key, p);
    });
    return Array.from(map.values());
  }, [providers]);

  // Unique Areas
  const uniqueAreas = useMemo(() => {
    const areas = [
      ...new Set(providers.map((p) => p.area?.trim()).filter(Boolean)),
    ];
    areas.sort((a, b) => a.localeCompare(b));
    return ["All Areas", ...areas];
  }, [providers]);

  // Unique Service Types
  const uniqueServiceTypes = useMemo(() => {
    const services = [
      ...new Set(providers.map((p) => p.serviceType?.trim()).filter(Boolean)),
    ];
    services.sort((a, b) => a.localeCompare(b));
    return ["All Service Types", ...services];
  }, [providers]);

  // Unique Sehri Types
  const uniqueSehriTypes = useMemo(() => {
    const types = [
      ...new Set(providers.map((p) => p.sehriType?.trim()).filter(Boolean)),
    ];
    types.sort((a, b) => a.localeCompare(b));
    return ["All Sehri Types", ...types];
  }, [providers]);

  // Filtering
  const filtered = useMemo(() => {
    return uniqueProviders
      .filter((p) => {
        const matchesArea = areaFilter === "All Areas" || p.area === areaFilter;

        const matchesService =
          serviceFilter === "All Service Types" ||
          p.serviceType === serviceFilter;

        const matchesSehriType =
          sehriTypeFilter === "All Sehri Types" ||
          p.sehriType === sehriTypeFilter;

        return matchesArea && matchesService && matchesSehriType;
      })
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }, [areaFilter, serviceFilter, sehriTypeFilter, uniqueProviders]);

  const handleShare = (provider) => {
    const message = `
Sehri Location Details:
Name: ${provider.name || "N/A"}
Area: ${provider.area || "N/A"}
Address: ${provider.address || "N/A"}
Contact: ${provider.contactName || "N/A"} - ${provider.contactNumber || "N/A"}
Sehri Type: ${provider.sehriType || "N/A"}
Service: ${provider.serviceType || "N/A"}
Serving Time: ${provider.foodTime || "N/A"}
Additional Info: ${provider.additionalInfo || "N/A"}
    `;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg text-yellow-500">
        Loading Sehri locations...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-4 sm:px-6 py-5">
      {/* Header */}
      <h1 className="text-xl font-bold text-center mb-8">
        Sehri Locations – Chennai
      </h1>

      {/* FILTER SECTION */}
      <div className="max-w-7xl mx-auto bg-[#222] p-6 rounded-2xl mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Area */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-[#D4AF37] font-semibold">
              Filter by Area
            </label>
            <select
              className="p-3 rounded-lg bg-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
            >
              {uniqueAreas.map((area, i) => (
                <option key={i} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Service Type */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-[#D4AF37] font-semibold">
              Filter by Service Type
            </label>
            <select
              className="p-3 rounded-lg bg-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
            >
              {uniqueServiceTypes.map((service, i) => (
                <option key={i} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Sehri Type */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-[#D4AF37] font-semibold">
              Filter by Sehri Type
            </label>
            <select
              className="p-3 rounded-lg bg-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              value={sehriTypeFilter}
              onChange={(e) => setSehriTypeFilter(e.target.value)}
            >
              {uniqueSehriTypes.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RESULT COUNT */}
      <div className="max-w-7xl mx-auto mb-6 text-[#D4AF37] font-semibold text-sm">
        Showing {filtered.length} Sehri Location
        {filtered.length !== 1 && "s"}
      </div>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.length === 0 && (
          <p className="text-center text-red-500 mt-10 text-lg">
            No providers found.
          </p>
        )}

        {filtered.map((provider) => (
          <div
            key={provider.name + provider.area}
            className="bg-[#222222] p-6 rounded-2xl border border-[#D4AF37] shadow-lg flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-[#D4AF37]">
                  {provider.name || "Unknown"}
                </h3>
                {provider.featured && (
                  <Star className="text-yellow-400" size={18} />
                )}
              </div>

              {/* Sehri Type Badge */}
              <div className="mt-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    provider.sehriType === "Free"
                      ? "bg-green-600 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {provider.sehriType || "Sehri Type Not Specified"}
                </span>
              </div>

              {/* Area */}
              <div className="flex items-center gap-2 mt-3 text-[#A1A1AA]">
                <MapPin size={16} />
                {provider.area || "Area missing"}
              </div>

              {/* Service Type */}
              <div className="mt-3">
                <span className="text-xs bg-[#2A2A2A] px-3 py-1 rounded-full text-[#E5E7EB]">
                  {provider.serviceType || "Service Type Not Specified"}
                </span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2 mt-4 text-sm text-[#A1A1AA]">
                <Clock size={16} />
                {provider.foodTime || "Time not available"}
              </div>

              {/* Contact */}
              {provider.contactNumber && (
                <div className="flex items-center gap-2 mt-4 font-semibold">
                  <Phone size={16} />
                  <a href={`tel:${provider.contactNumber}`}>
                    {provider.contactName || "-"} – {provider.contactNumber}
                  </a>
                </div>
              )}

              {/* Additional Info */}
              {provider.additionalInfo && (
                <div className="mt-4 bg-[#1F1F1F] p-3 rounded-lg text-sm text-[#D1D5DB] border border-[#2A2A2A]">
                  {provider.additionalInfo}
                </div>
              )}
            </div>

            {/* Share Button */}
            <div className="mt-6">
              <button
                onClick={() => handleShare(provider)}
                className="w-full bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(212,175,55,0.7)] transition"
              >
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
