import { useEffect, useState } from "react";
import HomeStatusPopup from "./HomeStatusPopup";

export default function OrganizationList() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ramadan-sehri-backend.onrender.com/api/providers")
      .then((res) => res.json())
      .then((data) => {
        setProviders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching providers:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] text-[#D4AF37]">
        Loading organizations...
      </div>
    );
  }

  return (
    <>
      {" "}
      <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-3 sm:px-6 py-10">
        {/* Heading */}
        <h1 className="text-xl sm:text-3xl font-bold text-center text-[#D4AF37] mb-8">
          Masjid / Organization List (A–Z)
        </h1>

        <div
          className="max-w-6xl mx-auto overflow-hidden rounded-2xl 
                  border border-[#D4AF37]/40 shadow-[0_0_25px_rgba(212,175,55,0.15)]"
        >
          <table className="w-full text-xs sm:text-sm">
            {/* Header */}
            <thead className="bg-gradient-to-r from-[#2A2A2A] to-[#1F1F1F] text-[#FFD700]">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Organization</th>
                <th className="p-3 text-left hidden sm:table-cell">Area</th>
                <th className="p-3 text-left hidden sm:table-cell">Address</th>
              </tr>
            </thead>

            <tbody>
              {providers.map((provider, index) => (
                <tr
                  key={provider.id}
                  className="border-t border-[#2A2A2A] 
                       hover:bg-[#242424] 
                       transition duration-200"
                >
                  {/* Number */}
                  <td className="p-3 text-[#A1A1AA]">{index + 1}</td>

                  {/* Organization */}
                  <td className="p-3">
                    <div className="font-semibold text-[#FFD700] text-sm">
                      {provider.name}
                    </div>

                    {/* Mobile Area */}
                    <div className="sm:hidden text-xs text-[#D4AF37] mt-1">
                      📍 {provider.area}
                    </div>

                    {/* Mobile Address */}
                    <div className="sm:hidden text-xs text-[#A1A1AA] mt-1">
                      {provider.address}
                    </div>
                  </td>

                  {/* Desktop Area */}
                  <td className="p-3 hidden sm:table-cell">{provider.area}</td>

                  {/* Desktop Address */}
                  <td className="p-3 hidden sm:table-cell">
                    {provider.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-[#A1A1AA] mt-6 text-xs sm:text-sm">
          Showing data directly from database.
        </p>
      </div>
      <HomeStatusPopup />
    </>
  );
}
