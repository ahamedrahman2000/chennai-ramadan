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

      <div className="max-w-6xl mx-auto overflow-x-auto rounded-xl shadow-lg border border-[#D4AF37]">
        <table className="w-full border-collapse">
          
          <thead className="bg-[#2A2A2A] text-[#FFD700] sticky top-0">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Organization Name</th>
              <th className="p-4 text-left">Area</th> 
              <th className="p-4 text-left">Contact</th>
            </tr>
          </thead>

          <tbody>
            {sortedProviders.map((provider, index) => (
              <tr
                key={provider.id}
                className={`border-t border-[#2A2A2A] transition hover:bg-[#2C2C2C] ${
                  index % 2 === 0 ? "bg-[#1F1F1F]" : "bg-[#222222]"
                }`}
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4 font-semibold text-[#FFD700]">{provider.name}</td>
                <td className="p-4">{provider.area}</td>
                <td className="p-4">
                  <a
                    href={`tel:${provider.contactNumber}`}
                    className="text-[#D4AF37] hover:text-yellow-400 transition"
                  >
                    {provider.contactNumber}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <p className="text-center text-[#A1A1AA] mt-6 text-sm">
        *Click the phone number to call the organization directly.
      </p>
    </div>
  );
}
