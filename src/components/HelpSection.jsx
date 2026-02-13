import { MapPin, ShieldCheck } from "lucide-react";
export const HelpSection = () => {
  return (
    <>
      <div className="bg-[#222222] p-8 rounded-2xl border border-[#2A2A2A] shadow-lg">
        <div className="flex items-center gap-3 text-[#D4AF37] mb-4">
          <MapPin size={22} />
          <h3 className="text-2xl font-semibold">
            Know a Place Providing Sehri?
          </h3>
        </div>

        <p className="text-[#A1A1AA] mb-6 leading-relaxed">
          If you are aware of a Masjid, organization, hostel, or food provider
          offering Sehri or Iftar, we encourage you to register them on this
          platform with accurate and verified information.
        </p>

        <ul className="list-disc list-inside text-[#A1A1AA] space-y-2 mb-6">
          <li>Provide correct location details</li>
          <li>Mention contact person (if available)</li>
          <li>Specify whether it is for Brothers, Sisters, or Families</li>
          <li>Ensure timing accuracy</li>
        </ul>

        <div className="flex items-start gap-3 text-sm text-red-400">
          <ShieldCheck size={18} />
          <p>
            Please ensure that all submitted information is truthful and
            verified. Misleading or false entries may cause inconvenience to
            those relying on this service.
          </p>
        </div>
      </div>
    </>
  );
};
