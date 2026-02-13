import { providers } from "../data/providers";

export default function OrganizationList() {
  const sortedProviders = [...providers].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-4 py-20">
      
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#D4AF37] mb-12">
        Masjid / Organization List (A–Z)
      </h1>

      <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {sortedProviders.map((provider, index) => (
          <div
            key={provider.id}
            className="bg-[#222222] rounded-xl shadow-lg p-6 hover:shadow-[#D4AF37]/50 transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#A1A1AA] font-medium">#{index + 1}</span>
              <a
                href={`tel:${provider.contactNumber}`}
                className="text-[#D4AF37] font-semibold hover:text-yellow-400"
              >
                {provider.contactNumber}
              </a>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-[#FFD700] mb-1">
              {provider.name}
            </h2>

            <p className="text-[#E5E7EB]/80 text-sm md:text-base">
              {provider.area}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}
