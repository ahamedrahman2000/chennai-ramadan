import { providers } from "../data/providers";

export default function OrganizationList() {
 
  const sortedProviders = [...providers].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-6 py-20">
      
      <h1 className="text-3xl font-bold text-center mb-10">
        Masjid / Organization List (A–Z)
      </h1>

      <div className="max-w-6xl mx-auto overflow-x-auto">

        <table className="w-full border-collapse bg-[#222222] rounded-xl overflow-hidden">
          
          <thead className="bg-[#2A2A2A] text-[#D4AF37]">
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
                className="border-t border-[#2A2A2A] hover:bg-[#2C2C2C] transition"
              >
                <td className="p-4">{index + 1}</td>

                <td className="p-4 font-semibold">
                  {provider.name}
                </td>

                <td className="p-4">{provider.area}</td>

               

               
                <td className="p-4">
                  <a
                    href={`tel:${provider.contactNumber}`}
                    className="text-[#D4AF37]"
                  >
                    {provider.contactNumber}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}
