import { useState } from "react";
import { providers } from "../data/providers";
import { Phone, MapPin, Clock } from "lucide-react";

export default function ProviderCard() {
  const [search, setSearch] = useState("");

  const filtered = providers.filter(
    (p) =>
      p.organizationName.toLowerCase().includes(search.toLowerCase()) ||
      p.area.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-6 py-20">
      <h1 className="text-3xl font-bold text-center mb-10">
        Sehri Locations – Chennai
      </h1>

      <div className="max-w-6xl mx-auto">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by Masjid name or area..."
          className="w-full mb-8 p-4 rounded-lg bg-[#2A2A2A] text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((provider) => (
            <div
              key={provider.id}
              className="bg-[#222222] p-6 rounded-2xl border border-[#2A2A2A] shadow-lg hover:border-[#D4AF37] transition"
            >
              {/* Title + Badge */}
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-[#D4AF37]">
                  {provider.organizationName}
                </h3>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    provider.sehriType === "Free"
                      ? "bg-green-600 text-white"
                      : "bg-yellow-600 text-black"
                  }`}
                >
                  {provider.sehriType}
                </span>
              </div>

              {/* Area */}
              <div className="flex items-center gap-2 mt-2 text-[#A1A1AA]">
                <MapPin size={16} />
                <p>{provider.area}</p>
              </div>

              {/* Address */}
              <p className="text-sm text-[#A1A1AA] mt-2">
                {provider.fullAddress}
              </p>

              {/* Services */}
              <div className="mt-4 flex flex-wrap gap-2">
                {provider.serviceTypes.map((service, index) => (
                  <span
                    key={index}
                    className="text-xs bg-[#2A2A2A] px-3 py-1 rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Serving Time */}
              <div className="flex items-center gap-2 mt-4 text-sm text-[#A1A1AA]">
                <Clock size={16} />
                <p>{provider.servingTime}</p>
              </div>

              {/* Contact */}
              <div className="flex items-center gap-2 mt-3 font-semibold">
                <Phone size={16} />
                <a
                  href={`tel:${provider.contactNumber}`}
                  className="hover:text-[#D4AF37]"
                >
                  {provider.contactName} – {provider.contactNumber}
                </a>
              </div>

              {/* Optional Second Number */}
              {provider.secondNumber && (
                <div className="mt-1 text-sm text-[#A1A1AA]">
                  Alt:{" "}
                  <a
                    href={`tel:${provider.secondNumber}`}
                    className="hover:text-[#D4AF37]"
                  >
                    {provider.secondNumber}
                  </a>
                </div>
              )}

              {/* Additional Info */}
              {provider.additionalInfo && (
                <p className="text-xs text-[#A1A1AA] mt-4 border-t border-[#2A2A2A] pt-3">
                  {provider.additionalInfo}
                </p>
              )}

              {/* WhatsApp Share */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${provider.organizationName}
Area: ${provider.area}
Sehri Type: ${provider.sehriType}
Contact: ${provider.contactNumber}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-5 bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Share on WhatsApp
              </a>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filtered.length === 0 && (
          <p className="text-center text-[#A1A1AA] mt-10">
            No providers found.
          </p>
        )}
      </div>
    </div>
  );
}
