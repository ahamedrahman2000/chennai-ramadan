import { useEffect, useState } from "react";
import { Users, MapPin, Coffee, DollarSign } from "lucide-react";

export default function SehriStats() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ramadan-sehri-backend.onrender.com/api/providers/all")
      .then((res) => res.json())
      .then((data) => {
        setProviders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching providers:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-white">Loading stats...</p>;

  const totalRegistrations = providers.length;
  const totalAreas = new Set(providers.map((p) => p.area)).size;
const totalFree = providers.filter((p) => p.sehriType?.toLowerCase() === "free").length;
const totalPaid = providers.filter((p) => p.sehriType?.toLowerCase() === "paid").length;


  const stats = [
    { label: "Total Registrations", value: totalRegistrations, icon: <Users size={20} /> },
    { label: "Total Areas", value: totalAreas, icon: <MapPin size={20} /> },
    { label: "Free Sehri", value: totalFree, icon: <Coffee size={20} /> },
    { label: "Paid Sehri", value: totalPaid, icon: <DollarSign size={20} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto my-6 sm:my-8 md:my-10 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#111] border border-[#D4AF37]/40 
                       rounded-xl sm:rounded-2xl 
                       p-3 sm:p-4 md:p-6 
                       flex flex-col items-center justify-center 
                       shadow-[0_0_15px_rgba(212,175,55,0.25)] 
                       hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-[#222] p-2 sm:p-3 rounded-full mb-2 sm:mb-3 text-[#D4AF37]">
              {stat.icon}
            </div>

            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#D4AF37]">
              {stat.value}
            </div>

            <div className="text-xs sm:text-sm md:text-base text-[#E5E7EB] text-center mt-1 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
