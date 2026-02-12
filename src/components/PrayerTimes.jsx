import { prayerTimes } from "../data/prayerTimes";

export default function PrayerTimes() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-4 sm:px-6 py-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#D4AF37]">
        Prayer Times – Chennai
      </h1>

      <div className="max-w-6xl mx-auto bg-[#222222] p-4 sm:p-8 rounded-xl shadow-lg">
        
        {/* Scroll Wrapper for Mobile */}
        <div className="overflow-x-auto">
          <table className="min-w-[650px] w-full text-center border-collapse">
            
            <thead className="bg-black text-[#D4AF37] text-sm sm:text-base">
              <tr>
                <th className="p-3 sm:p-4">Date</th>
                <th>Sehri</th>
                <th>Zuhar</th>
                <th>Asar</th>
                <th>Iftar</th>
                <th>Isha</th>
              </tr>
            </thead>

            <tbody className="text-sm sm:text-base">
              {prayerTimes.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-[#333] hover:bg-[#2A2A2A] transition"
                >
                  <td className="py-3 sm:py-4 font-medium">
                    {item.day}
                  </td>
                  <td>{item.sehar}</td>
                  <td>{item.dhuhr}</td>
                  <td>{item.asr}</td>
                  <td className="text-[#D4AF37] font-semibold">
                    {item.iftar}
                  </td>
                  <td>{item.isha}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}
