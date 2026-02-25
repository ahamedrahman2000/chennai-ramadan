import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SelectSurah() {
  const [surahs, setSurahs] = useState([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSurahs();
  }, []);

  const fetchSurahs = async () => {
    try {
      const { data, error } = await supabase
        .from("quran_surahs")
        .select("*")
        .order("surah_number", { ascending: true });

      if (error) {
        setError("Failed to fetch Surahs. Please check your connection or Supabase config.");
        console.error("Supabase error:", error);
      } else if (!data || data.length === 0) {
        setError("No Surahs found in database.");
      } else {
        setSurahs(data);
      }
    } catch (e) {
      console.error("Network error:", e);
      setError("Network error. Could not connect to Supabase.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-300 p-5">
        Loading Surahs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-5">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-5 text-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-lg font-semibold">Select Surah</h3>

        <select
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            if (e.target.value)
              navigate(`/challenge/${e.target.value}`);
          }}
          className="bg-zinc-900 border border-zinc-700 text-sm rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-teal-400"
        >
          <option value="">Quick Select</option>
          {surahs.map((s) => (
            <option key={s.surah_number} value={s.surah_number}>
              {s.surah_number}. {s.surah_name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-zinc-900 text-sm">
          <thead>
            <tr className="bg-zinc-800 text-left">
              <th className="p-2 border-b border-zinc-700">#</th>
              <th className="p-2 border-b border-zinc-700">Surah</th>
              <th className="p-2 border-b border-zinc-700">Ayahs</th>
              <th className="p-2 border-b border-zinc-700"></th>
            </tr>
          </thead>

          <tbody>
            {surahs.map((s) => (
              <tr
                key={s.surah_number}
                className="hover:bg-zinc-800 transition"
              >
                <td className="p-2 border-b border-zinc-800">{s.surah_number}</td>
                <td className="p-2 border-b border-zinc-800">{s.surah_name}</td>
                <td className="p-2 border-b border-zinc-800">{s.total_ayah}</td>
                <td className="p-2 border-b border-zinc-800">
                  <button
                    onClick={() =>
                      navigate(`/challenge/${s.surah_number}`)
                    }
                    className="bg-teal-400 text-black text-xs font-semibold px-3 py-1 rounded hover:bg-teal-300 transition"
                  >
                    Start
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}