import {
  Book,
  Scroll,
  MapPin,
  Clock,
  Star, 
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { title: "Duas", icon: <Book size={28} />, path: "/dua" },
  { title: "Hadith", icon: <Scroll size={28} />, path: "/coming-soon" },
  { title: "Quran", icon: <Book size={28} />, path: "/coming-soon" },
  { title: "Find Sehri", icon: <MapPin size={28} />, path: "/find-sehri" },
  { title: "Prayer Times", icon: <Clock size={28} />, path: "/prayer-times" },
  {
    title: "List",
    icon: <Star size={28} />,
    path: "/organization-list",
  },
   { title: "Ask to Scholar", icon: <Book size={28} />, path: "/ask-scholar" },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-[#111111] text-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-[#D4AF37] mb-10">
            Features of Our App
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Link
              key={idx}
              to={feature.path}
              className="group bg-[#1A1A1A] border border-[#D4AF37]/40 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition transform hover:scale-105"
            >
              <div className="text-[#D4AF37] mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-[#D4AF37] group-hover:text-white transition">
                {feature.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
