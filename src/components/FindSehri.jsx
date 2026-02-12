import { useState, useMemo } from "react";
import { providers } from "../data/providers";
import { Phone, MapPin, Clock, Star, Share2 } from "lucide-react";
import UpdateSehri from "./UpdateSehri";

export default function FindSehri() {
  const [search, setSearch] = useState("");
  const [areaFilter, setAreaFilter] = useState("All");
  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  // Remove duplicates based on name + area
  const uniqueProviders = useMemo(() => {
    const map = new Map();
    (providers || []).forEach((p) => {
      const key = `${p.name}-${p.area}`;
      if (!map.has(key)) map.set(key, p);
    });
    return Array.from(map.values());
  }, []);

  const uniqueAreas = ["All", ...new Set(uniqueProviders.map((p) => p.area || ""))];

  const filtered = useMemo(() => {
    return uniqueProviders
      .filter((p) => {
        const matchesSearch =
          !search ||
          (p.name?.toLowerCase().includes(search.toLowerCase()) ||
            p.area?.toLowerCase().includes(search.toLowerCase()));
        const matchesArea = areaFilter === "All" || p.area === areaFilter;
        return matchesSearch && matchesArea;
      })
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }, [search, areaFilter, uniqueProviders]);

  const handleShare = (provider) => {
    const message = `
Sehri Location Details:
Name: ${provider.name || "N/A"}
Area: ${provider.area || "N/A"}
Full Address: ${provider.fullAddress || "N/A"}
Contact: ${provider.contactName || "N/A"} - ${provider.contactNumber || "N/A"}
Sehri Type: ${provider.sehriType || "N/A"}
Service: ${provider.serviceTypes?.join(", ") || "N/A"}
    `;
    window.open(`https://wa.me/919884680243?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-6 py-10">
      {/* Top info */}
      <div className="max-w-7xl mx-auto mb-6 p-4 bg-[#222] rounded-lg text-center text-[#D4AF37] font-semibold">
        Kindly click on Update if details are missing or incorrect. We will add/update within 15 mins. Anyone can contribute.
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">Sehri Locations – Chennai</h1>

      {/* FILTERS: Search + Area */}
      <div className="max-w-7xl mx-auto flex gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by name or area..."
          className="flex-1 p-3 rounded-lg bg-[#2A2A2A] placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-3 rounded-lg bg-[#2A2A2A]"
          value={areaFilter}
          onChange={(e) => setAreaFilter(e.target.value)}
        >
          {uniqueAreas.map((area, i) => (
            <option key={i}>{area}</option>
          ))}
        </select>
      </div>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((provider) => (
          <div
            key={provider.name + provider.area}
            className="bg-[#222222] p-6 rounded-2xl border border-[#D4AF37] shadow-lg flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-[#D4AF37]">
                  {provider.name || "Unknown Masjid / Organization"}
                </h3>
                {provider.featured && <Star className="text-yellow-400" size={18} />}
              </div>

              {/* Sehri Type */}
              <span
                className={`text-xs px-3 py-1 rounded-full mt-2 inline-block ${
                  provider.sehriType === "Free" ? "bg-green-600 text-white" : "bg-yellow-500 text-black"
                }`}
              >
                {provider.sehriType || "Not specified"}
              </span>

              {/* Area */}
              <div className={`flex items-center gap-2 mt-3 ${!provider.area ? "text-red-500" : "text-[#A1A1AA]"}`}>
                <MapPin size={16} />
                {provider.area || "Area missing"}
              </div>

              {/* Full Address */}
              <p className={`text-sm mt-1 ${!provider.fullAddress ? "text-red-500" : "text-[#A1A1AA]"}`}>
                {provider.fullAddress || "Address missing"}
              </p>

              {/* Services */}
              <div className="flex flex-wrap gap-2 mt-4">
                {(provider.serviceTypes && provider.serviceTypes.length > 0
                  ? provider.serviceTypes
                  : ["Service not specified"]
                ).map((service, i) => (
                  <span key={i} className="text-xs bg-[#2A2A2A] px-3 py-1 rounded-full">
                    {service}
                  </span>
                ))}
              </div>

              {/* Serving Time */}
              <div className="flex items-center gap-2 mt-4 text-sm">
                <Clock size={16} />
                {provider.servingTime || "Time not available"}
              </div>

              {/* Contact */}
              {provider.contactName || provider.contactNumber ? (
                <div className="flex items-center gap-2 mt-4 font-semibold">
                  <Phone size={16} />
                  <a href={`tel:${provider.contactNumber || ""}`}>
                    {provider.contactName || "-"} – {provider.contactNumber || "-"}
                  </a>
                </div>
              ) : null}
            </div>

            {/* Card Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleShare(provider)}
                className="flex-1 bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(212,175,55,0.7)] transition"
              >
                <Share2 size={16} /> Share
              </button>
           
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <p className="text-center text-red-500 mt-10 text-lg">No providers found.</p>
      )}

     
    </div>
  );
}
