import { useState } from "react";
import { duas } from "../data/dua"; // your dua.js
import { Star } from "lucide-react";

export default function DuasPage() {
  const [search, setSearch] = useState("");

  // Filter duas based on search input
  const filteredDuas = duas.filter((dua) =>
    (dua.topic + dua.arabic + dua.english + dua.translation + dua.tamil)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#111111] text-white py-16 px-4 relative overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0 -z-10">
        {[...Array(25)].map((_, i) => (
          <Star
            key={i}
            size={10 + Math.random() * 20}
            className="absolute text-[#D4AF37] opacity-20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-center text-[#D4AF37] mb-6 animate-pulse">
        Duas – Chennai Ramadan
      </h1>
      <p className="text-center text-[#A1A1AA] mb-8 max-w-2xl mx-auto">
        Browse and learn powerful Duas in Arabic, Roman, Tamil, and English translations.
      </p>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search Duas by topic, Arabic, English, Tamil..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#2A2A2A] placeholder-gray-400 focus:outline-none border border-[#D4AF37]"
        />
      </div>

      {/* Duas Grid */}
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
        {filteredDuas.length === 0 && (
          <p className="text-center text-red-500 col-span-full">No Duas found.</p>
        )}

        {filteredDuas.map((dua) => (
          <div
            key={dua.id}
            className="bg-[#222222] p-6 rounded-2xl border border-[#D4AF37] shadow-lg transform transition hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.7)]"
          >
            {dua.topic && (
              <h3 className="text-[#D4AF37] font-bold text-lg mb-2 flex items-center">
                <Star className="mr-2" size={18} />
                {dua.topic}
              </h3>
            )}

            {dua.arabic && (
              <p className="text-xl md:text-2xl font-semibold mb-2 text-[#E5E7EB]">
                {dua.arabic}
              </p>
            )}

            {dua.english && (
              <p className="text-[#D4AF37] mb-1 italic">{dua.english}</p>
            )}

            {dua.tamil && (
              <p className="text-[#A1A1AA] mb-1 italic">{dua.tamil}</p>
            )}

            {dua.translation && (
              <p className="text-[#E5E7EB] mt-2">{dua.translation}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
