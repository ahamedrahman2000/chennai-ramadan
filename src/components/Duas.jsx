import { useEffect, useState } from "react";

export default function DuaPage() {
  const [duas, setDuas] = useState([]);
  const [filteredDuas, setFilteredDuas] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ramadan-sehri-backend.onrender.com/api/duas")
      .then((res) => res.json())
      .then((data) => {
        setDuas(data);
        setFilteredDuas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching duas:", err);
        setLoading(false);
      });
  }, []);

  // Filter by dua name
  useEffect(() => {
    const filtered = duas.filter((dua) =>
      dua.dua_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDuas(filtered);
  }, [search, duas]);

  return (
    <section className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-4 sm:px-6 py-6 sm:py-10">

  {/* Title */}
  <h1 className="text-2xl sm:text-4xl 
                 font-bold text-center 
                 text-[#D4AF37] mb-6 sm:mb-8">
    📖 Dua Collection
  </h1>

  {/* Search Box */}
  <div className="max-w-xl mx-auto mb-6 sm:mb-8">
    <input
      type="text"
      placeholder="Search Dua..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full 
                 text-sm sm:text-base
                 px-3 py-2 sm:py-3
                 rounded-lg 
                 bg-[#1A1A1A] 
                 border border-[#333] 
                 focus:outline-none 
                 focus:border-[#D4AF37]
                 transition"
    />
  </div>

  {loading && (
    <p className="text-center text-sm sm:text-base text-[#D4AF37]">
      Loading duas...
    </p>
  )}

  {/* Dua Cards */}
  <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
    {filteredDuas.map((dua) => (
      <div
        key={dua.id}
        className="bg-gradient-to-br 
                   from-[#1A1A1A] 
                   to-[#202020]
                   p-4 sm:p-6 
                   rounded-xl 
                   border border-[#333] 
                   shadow-[0_0_20px_rgba(212,175,55,0.08)] 
                   hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]
                   transition"
      >

        {/* Dua Name */}
        <h2 className="text-base sm:text-xl 
                       font-semibold 
                       text-[#D4AF37] mb-3">
          {dua.dua_name}
        </h2>

        {/* Arabic */}
        <p className="text-lg sm:text-2xl 
                      text-right 
                      leading-relaxed sm:leading-loose 
                      mb-3">
          {dua.arabic}
        </p>

        {/* Roman */}
        <p className="italic text-xs sm:text-sm text-gray-400 mb-3">
          {dua.roman}
        </p>

        {/* Tamil */}
        <p className="text-xs sm:text-sm mb-2">
          <span className="font-semibold text-[#D4AF37]">
            Tamil:
          </span>{" "}
          {dua.tamil}
        </p>

        {/* English */}
        <p className="text-xs sm:text-sm">
          <span className="font-semibold text-[#D4AF37]">
            English:
          </span>{" "}
          {dua.english}
        </p>

      </div>
    ))}

    {filteredDuas.length === 0 && !loading && (
      <p className="text-center text-sm text-gray-500">
        No duas found.
      </p>
    )}
  </div>

</section>

  );
}
