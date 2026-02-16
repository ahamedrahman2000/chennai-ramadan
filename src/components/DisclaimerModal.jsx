export default function Disclaimer() {
  return (
    <div className="bg-[#1A1A1A] text-[#E5E7EB] px-4 py-10 sm:py-14 md:py-20">
      <div className="max-w-4xl mx-auto bg-[#222222] 
                      p-5 sm:p-7 md:p-10 
                      rounded-xl sm:rounded-2xl 
                      shadow-xl">

        {/* Centered Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl 
                       font-bold text-[#D4AF37] 
                       mb-6 sm:mb-8 md:mb-10 
                       text-center">
          Disclaimer
        </h1>

        <div className="space-y-4 sm:space-y-5 md:space-y-6 
                        text-[#A1A1AA] 
                        leading-relaxed 
                        text-xs sm:text-sm md:text-base">

          <p>
            RamadanChennai.in is a{" "}
            <span className="text-red-500 font-semibold">
              not-for-profit community initiative
            </span>{" "}
            created solely to help connect{" "}
            <span className="text-red-500 font-semibold">
              Masjids, Organizations, Food Providers, and Individuals
            </span>{" "}
            with those seeking Sehri and Iftar support during Ramadan.
          </p>

          <p>
            The primary purpose of this platform is to ensure that{" "}
            <span className="text-red-500 font-semibold">
              no one misses their Sehri or Iftar
            </span>{" "}
            due to lack of awareness or access to food resources.
          </p>

          <p>
            We are{" "}
            <span className="text-red-500 font-semibold">
              NOT a commercial platform
            </span>
            , agency, broker, delivery service, or food supplier.
          </p>

          <p>
            All Providers listed register voluntarily and are solely responsible
            for the accuracy and legality of their information.
          </p>

          <p>
            RamadanChennai.in{" "}
            <span className="text-red-500 font-semibold">
              does NOT verify, guarantee, endorse, or certify
            </span>{" "}
            any Provider, Masjid, Organization, or individual listed.
          </p>

          <p>We do not guarantee:</p>

          <ul className="list-disc list-inside space-y-1 ml-2 text-xs sm:text-sm md:text-base">
            <li>Food availability</li>
            <li>Quality or hygiene standards</li>
            <li>Timeliness of service</li>
            <li>Accuracy of listed details</li>
            <li>Safety of interactions</li>
          </ul>

          <p>
            Any interaction is done at the user's{" "}
            <span className="text-red-500 font-semibold">
              own discretion and risk.
            </span>
          </p>

          <p>
            RamadanChennai.in{" "}
            <span className="text-red-500 font-semibold">
              shall not be held liable
            </span>{" "}
            for:
          </p>

          <ul className="list-disc list-inside space-y-1 ml-2 text-xs sm:text-sm md:text-base">
            <li>Disputes between parties</li>
            <li>Financial transactions</li>
            <li>Damages or losses</li>
            <li>Misconduct or negligence</li>
            <li>Food safety or health issues</li>
          </ul>

          <p>
            Users are advised to conduct their own{" "}
            <span className="text-red-500 font-semibold">
              due diligence and verification
            </span>{" "}
            before engaging with any provider.
          </p>

          <p>
            By using this website, you acknowledge that we function strictly as a{" "}
            <span className="text-red-500 font-semibold">
              facilitator of connections only.
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
