import { providers } from "../data/providers";
import { Users, MapPin, Coffee, DollarSign } from "lucide-react";

export default function SehriStats() {
  const totalRegistrations = providers.length;
  const totalAreas = new Set(providers.map((p) => p.area)).size;
  const totalFree = providers.filter((p) => p.sehriType === "Free").length;
  const totalPaid = providers.filter((p) => p.sehriType === "Paid").length;

  const stats = [
    { label: "Total Registrations", value: totalRegistrations, icon: <Users size={28} /> },
    { label: "Total Areas", value: totalAreas, icon: <MapPin size={28} /> },
    { label: "Free Sehri", value: totalFree, icon: <Coffee size={28} /> },
    { label: "Paid Sehri", value: totalPaid, icon: <DollarSign size={28} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#111] border-2 border-gradient-to-r border-[#D4AF37] rounded-2xl p-6 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-[#222] p-4 rounded-full mb-4 shadow-lg flex items-center justify-center text-[#D4AF37]">
              {stat.icon}
            </div>
            <div className="text-3xl font-extrabold text-[#D4AF37]">{stat.value}</div>
            <div className="text-[#E5E7EB] text-center mt-1 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
