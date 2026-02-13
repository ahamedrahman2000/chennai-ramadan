import { HandHeart, Moon  } from "lucide-react";
import { prayerTimes } from "../data/prayerTimes";

export default function MissionSection() {
  return (
    <section className="py-24 px-6 bg-[#1A1A1A] text-[#E5E7EB]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-1 gap-16">

        {/* =======================
            SEHRI / IFTAR TABLE
        ======================== */}
        <div className="bg-[#222222] p-6 rounded-2xl border border-[#2A2A2A] shadow-lg">
          <div className="flex items-center justify-center gap-2 text-[#D4AF37] mb-4">
            <Moon size={20} />
            <h3 className="text-xl font-semibold">
              Sehri & Iftar Time <br />
              <span className="text-sm text-[#A1A1AA]">
                Feb / March 2026 – Chennai
              </span>
            </h3>
          </div>

          <p className="text-xs text-red-500 text-center mb-4">
            Fiqh Jafria: Suhoor -10min | Iftar +10min
          </p>

          <div className="overflow-y-auto max-h-[500px]">
            <table className="w-full text-sm text-center">
              <thead className="sticky top-0 bg-[#1A1A1A] text-[#D4AF37]">
                <tr>
                  <th className="py-2">Day</th>
                  <th>Sehar</th>
                  <th>Iftar</th>
                </tr>
              </thead>
              <tbody>
                {prayerTimes.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#2A2A2A] hover:bg-[#2A2A2A] transition"
                  >
                    <td className="py-2">{item.day}</td>
                    <td>{item.sehar}</td>
                    <td className="text-[#D4AF37] font-medium">
                      {item.iftar}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =======================
            MISSION
        ======================== */}
        <div>
          <div className="flex items-center gap-3 text-[#D4AF37] mb-4">
            <HandHeart size={24} />
            <h2 className="text-3xl font-bold">Our Mission & Purpose</h2>
          </div>

          <p className="text-[#A1A1AA] leading-relaxed text-lg mb-6">
            Ramadan is a month of compassion, unity, and generosity.
            While Iftar is often communal, Sehri can be challenging for
            students, workers, travelers, and hostel residents across Chennai.
          </p>

          <p className="text-[#A1A1AA] leading-relaxed text-lg mb-6">
            Our mission is to connect seekers with Masjids, organizations,
            and food providers offering Sehri & Iftar — ensuring no one
            begins their fast alone or without food.
          </p>
        </div>

        {/* =======================
            HOW YOU CAN HELP
        ======================== */}
       
      </div>
    </section>
  );
}
