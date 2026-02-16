export function AboutUs() {
  return (
    <>
      <section className="bg-[#1A1A1A] text-[#E5E7EB] py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-[#D4AF37] mb-4 sm:mb-6">
            About & How It Works
          </h2>

          <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
            🌙 <strong>Why this project exists:</strong> Many students,
            hostellers, and employees in Chennai struggle to find Sehri during
            Ramadan. This platform helps them locate Sehri points quickly and
            easily.
          </p>

          <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
            🕌 <strong>Who can contribute:</strong> Any Masjid, organization, or
            individual providing Sehri can register or update their location to
            help the community.
          </p>

          <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
            🤝 <strong>How it helps:</strong> Users can see up-to-date Sehri
            locations, timings, and services (Free / Paid / Dine-in / Delivery),
            ensuring no one misses their Sehri. Contributors also get
            recognition for supporting the community.
          </p>
        </div>
      </section>
    </>
  );
}
