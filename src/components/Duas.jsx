import { useEffect, useState, useMemo } from "react";

export default function DuaPage() {
  const [duas, setDuas] = useState([]);
  const [filteredDuas, setFilteredDuas] = useState([]);
  const [selectedDua, setSelectedDua] = useState("All Duas");
  const [loading, setLoading] = useState(true);

  // Fetch all duas
  useEffect(() => {
    fetch("https://ramadan-sehri-backend.onrender.com/api/duas")
      .then((res) => res.json())
      .then((data) => {
        setDuas(data);
        setFilteredDuas(data); // show all initially
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching duas:", err);
        setLoading(false);
      });
  }, []);

  // Unique dua names for dropdown
  const uniqueDuas = useMemo(() => {
    const names = [...new Set(duas.map((d) => d.dua_name?.trim()).filter(Boolean))];
    names.sort((a, b) => a.localeCompare(b));
    return ["All Duas", ...names];
  }, [duas]);

  // Filter duas based on selected dropdown
  useEffect(() => {
    if (selectedDua === "All Duas") {
      setFilteredDuas(duas); // show all initially
    } else {
      setFilteredDuas(duas.filter((d) => d.dua_name === selectedDua));
    }
  }, [selectedDua, duas]);

  return (
    <section className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-4 sm:px-6 py-6 sm:py-10">

      {/* Title */}
      <h1 className="text-2xl sm:text-4xl font-bold text-center text-[#D4AF37] mb-6 sm:mb-8">
        📖 Dua Collection
      </h1>

      {/* Dropdown + Counter */}
      <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-3">
        <select
          value={selectedDua}
          onChange={(e) => setSelectedDua(e.target.value)}
          className="p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-[#2A2A2A] border border-gray-600"
        >
          {uniqueDuas.map((dua, i) => (
            <option key={i} value={dua}>
              {dua}
            </option>
          ))}
        </select>

        <p className="text-sm sm:text-base text-[#D4AF37] font-semibold">
          Showing {filteredDuas.length} dua{filteredDuas.length !== 1 ? "s" : ""}
        </p>
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
            className="bg-gradient-to-br from-[#1A1A1A] to-[#202020] p-4 sm:p-6 rounded-xl border border-[#333] shadow-[0_0_20px_rgba(212,175,55,0.08)] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition"
          >
            <h2 className="text-base sm:text-xl font-semibold text-[#D4AF37] mb-3">
              {dua.dua_name}
            </h2>
            <p className="text-lg sm:text-2xl text-right leading-relaxed sm:leading-loose mb-3">
              {dua.arabic}
            </p>
            <p className="italic text-xs sm:text-sm text-gray-400 mb-3">
              {dua.roman}
            </p>
            <p className="text-xs sm:text-sm mb-2">
              <span className="font-semibold text-[#D4AF37]">Tamil:</span>{" "}
              {dua.tamil}
            </p>
            <p className="text-xs sm:text-sm">
              <span className="font-semibold text-[#D4AF37]">English:</span>{" "}
              {dua.english}
            </p>
          </div>
        ))}

        {filteredDuas.length === 0 && !loading && (
          <p className="text-center text-sm text-gray-500">No duas found.</p>
        )}
      </div>
    </section>
  );
}
