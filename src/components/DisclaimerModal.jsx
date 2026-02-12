export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-6 py-20">
      <div className="max-w-4xl mx-auto bg-[#222222] p-10 rounded-2xl shadow-xl">

        {/* Centered Title */}
        <h1 className="text-4xl font-bold text-[#D4AF37] mb-10 text-center">
          Disclaimer
        </h1>

        <div className="space-y-6 text-[#A1A1AA] leading-relaxed text-sm md:text-base">

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
            All Providers listed on this platform register voluntarily and are
            solely responsible for the accuracy, authenticity, and legality of
            the information they provide.
          </p>

          <p>
            RamadanChennai.in{" "}
            <span className="text-red-500 font-semibold">
              does NOT verify, guarantee, endorse, or certify
            </span>{" "}
            any Provider, Masjid, Organization, or individual listed.
          </p>

          <p>
            We do not guarantee:
          </p>

          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Food availability</li>
            <li>Quality or hygiene standards</li>
            <li>Timeliness of service</li>
            <li>Accuracy of listed details</li>
            <li>Safety of interactions</li>
          </ul>

          <p>
            Any interaction, visit, communication, or arrangement made between
            users and providers is done at the user's{" "}
            <span className="text-red-500 font-semibold">
              own discretion and risk.
            </span>
          </p>

          <p>
            RamadanChennai.in shall{" "}
            <span className="text-red-500 font-semibold">
              not be held liable
            </span>{" "}
            for:
          </p>

          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Disputes between parties</li>
            <li>Financial transactions</li>
            <li>Damages or losses</li>
            <li>Misconduct or negligence</li>
            <li>Food safety or health issues</li>
          </ul>

          <p>
            If any activity occurs beyond the stated purpose of this platform,
            including misuse, fraudulent activity, or unrelated services,{" "}
            <span className="text-red-500 font-semibold">
              we are not responsible.
            </span>
          </p>

          <p>
            Users are strongly advised to conduct their own{" "}
            <span className="text-red-500 font-semibold">
              due diligence and verification
            </span>{" "}
            before engaging with any provider.
          </p>

          <p>
            By using this website, you acknowledge and agree that we function
            strictly as a{" "}
            <span className="text-red-500 font-semibold">
              facilitator of connections only
            </span>{" "}
            and accept all associated risks.
          </p>

        </div>
      </div>
    </div>
  );
}
