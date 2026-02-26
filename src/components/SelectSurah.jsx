import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SelectSurah() {
  const [surahs, setSurahs] = useState([]);
  const [progress, setProgress] = useState([]);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // ✅ Fetch Surahs
  useEffect(() => {
    const fetchSurahs = async () => {
      const { data } = await supabase
        .from("quran_surahs")
        .select("*")
        .order("surah_number", { ascending: true });

      if (data) setSurahs(data);
    };

    fetchSurahs();
  }, []);

  // ✅ Fetch Progress
  useEffect(() => {
    if (!currentUser) return;

    const fetchProgress = async () => {
      const { data } = await supabase
        .from("user_progress")
        .select("surah_number, completed")
        .eq("username", currentUser.username);

      setProgress(data || []);
    };

    fetchProgress();
  }, [currentUser]);

  const isCompleted = (surahNumber) => {
    return progress.find(
      (p) => p.surah_number === surahNumber && p.completed
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-bold text-yellow-400">
          Select Surah
        </h2>

       
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm md:text-base text-left border-collapse bg-#1A1A1A rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-yellow-300">
              <th className="px-3 py-2">No</th>
              <th className="px-3 py-2">Surah</th>
              <th className="px-3 py-2">Ayahs</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {surahs.map((surah) => (
              <tr
                key={surah.surah_number}
                className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
              >
                <td className="px-3 py-2">{surah.surah_number}</td>
                <td className="px-3 py-2">{surah.surah_name}</td>
                <td className="px-3 py-2">{surah.total_ayah}</td>
                <td className="px-3 py-2">
                  {isCompleted(surah.surah_number) ? (
                    <span className="text-green-400 font-semibold text-xs md:text-sm">
                      ✔ Completed
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        navigate(`/challenge/${surah.surah_number}`)
                      }
                      className="bg-yellow-500 text-black px-2 py-1 text-xs md:text-sm rounded hover:bg-yellow-400 transition-colors"
                    >
                      Start
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}