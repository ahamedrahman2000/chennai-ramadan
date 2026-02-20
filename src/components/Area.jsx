import { useEffect, useState } from "react"; 

export default function AreaPage() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ramadan-sehri-backend.onrender.com/api/areas-status")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching areas:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10 text-[#D4AF37]">Loading areas...</p>;

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-4 py-6">
  
         
  <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#D4AF37] mb-6">
    🗺️ Areas
  </h1>

  <div className="max-w-4xl mx-auto grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3">
    {areas.map((area) => (
      <div
        key={area.id}
        className={`p-2 text-xs sm:text-sm rounded-md text-center border ${
          area.has_updated
            ? "bg-green-600 text-black border-green-500"
            : "bg-[#222] text-[#E5E7EB] border-gray-700"
        }`}
      >
        {area.area_name}
      </div>
    ))}
  </div>

</div>

  );
}
