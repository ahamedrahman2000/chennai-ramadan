import { HandHeart } from "lucide-react";

export default function OurMission() {
  return (
    <section className="py-10 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#1A1A1A] text-[#E5E7EB] relative overflow-hidden">
      
      {/* Subtle golden glow background */}
      <div className="absolute inset-0  "></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Heading */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-[#D4AF37] mb-6 sm:mb-8">
          <HandHeart size={22} className="sm:size-7 md:size-8" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
            Our Mission & Purpose
          </h2>
        </div>

        {/* Card */}
        <div
          className="bg-gradient-to-br from-[#1A1A1A] to-[#222222] 
                     rounded-xl sm:rounded-2xl 
                     p-5 sm:p-8 md:p-10 
                     shadow-[0_0_20px_rgba(212,175,55,0.12)]"
        >
          <p className="text-[#D1D5DB] leading-relaxed text-sm sm:text-base md:text-lg text-center">
            Ramadan is a month of compassion, unity, and generosity.
            While Iftar is often communal, Sehri can be challenging for 
            students, workers, travelers, and hostel residents across Chennai.
          </p>

          <p className="text-[#A1A1AA] leading-relaxed text-sm sm:text-base md:text-lg text-center mt-4 sm:mt-6">
            Our mission is to connect seekers with Masjids, organizations, 
            and food providers offering Sehri & Iftar — ensuring no one 
            begins their fast alone or without food.
          </p>
        </div>

      </div>
    </section>
  );
}
