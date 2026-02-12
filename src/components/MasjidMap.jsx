import { Moon, Star } from "lucide-react";

export default function MasjidMap() {
  return (
    <div className="relative min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-6 py-20 overflow-hidden">

   

      {/* Glowing Moon */}
      <div className="absolute top-16 right-16 text-[#D4AF37] animate-pulse drop-shadow-[0_0_20px_rgba(212,175,55,0.9)]">
        <Moon size={60} />
      </div>

      {/* Floating Stars */}
      <Star className="absolute top-24 left-20 text-[#D4AF37] animate-ping opacity-70" size={20} />
      <Star className="absolute top-40 right-1/3 text-[#D4AF37] animate-pulse opacity-60" size={18} />
      <Star className="absolute bottom-32 left-1/4 text-[#D4AF37] animate-ping opacity-50" size={16} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-[#D4AF37] mb-4">
          Sehri Locations
        </h2>

        <p className="text-center text-[#A1A1AA] mb-10">
          Explore Masjids and Organizations across Chennai offering Sehri and Iftar support.
        </p>

        {/* Map Card */}
        <div className="bg-[#222222] p-6 rounded-2xl shadow-2xl border border-[#2A2A2A]">

          <iframe
            src="https://www.google.com/maps/d/embed?mid=1w8sJbVcvXSBCEs8HrDN9_Mfy7iv5fEw"
            width="100%"
            height="500"
            className="rounded-xl border border-[#333333]"
            loading="lazy"
          />

        </div>

      </div>
    </div>
  );
}
