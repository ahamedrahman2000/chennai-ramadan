import { HandHeart } from "lucide-react";

export default function OurMission() {
  return (
    <section className="py-24 px-6 bg-[#111111] text-[#E5E7EB] relative overflow-hidden">
      
      {/* Subtle golden glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.08),_transparent_60%)]"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Heading */}
        <div className="flex items-center justify-center gap-3 text-[#D4AF37] mb-8">
          <HandHeart size={30} />
          <h2 className="text-4xl font-bold text-center">
            Our Mission & Purpose
          </h2>
        </div>

        {/* Card */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#222222] 
                         
                        rounded-2xl 
                        p-10 
                        shadow-[0_0_40px_rgba(212,175,55,0.15)]">

          <p className="text-[#D1D5DB] leading-relaxed text-lg text-center">
            Ramadan is a month of compassion, unity, and generosity.
            While Iftar is often communal, Sehri can be challenging for 
            students, workers, travelers, and hostel residents across Chennai.
          </p>

          <p className="text-[#A1A1AA] leading-relaxed text-lg text-center mt-6">
            Our mission is to connect seekers with Masjids, organizations, 
            and food providers offering Sehri & Iftar — ensuring no one 
            begins their fast alone or without food.
          </p>

        </div>

      </div>
    </section>
  );
}
