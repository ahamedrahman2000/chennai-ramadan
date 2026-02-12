
import { prayerTimes } from "../data/prayerTimes";

export default function PrayerTimes() {
 

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-6 py-20">
      <h1 className="text-3xl font-bold text-center mb-10">
        Prayer Times – Chennai
      </h1>

      <div className="max-w-4xl mx-auto bg-[#222222] p-8 rounded-xl">
        <table className="w-full text-center">
          <thead className="bg-black sticky top-0 text-[#D4AF37] text-lg">
            <tr>
              <th className="p-4">Date</th>
              <th>Sehri</th>
              <th>Zuhar</th>
              <th>Asar</th>
              <th>Iftar</th>
              <th>Isha</th>
            </tr>
          </thead>
          <tbody>
            {prayerTimes.map((item, index) => (
              <tr key={index} className="border-t border-[#333]">
                <td className="py-4">{item.day}</td>
                <td>{item.sehar}</td>
                <td>{item.dhuhr}</td>
                <td>{item.asr}</td>
                <td>{item.iftar}</td>
                <td>{item.isha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
