export default function ProviderModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-[#1A1A1A] w-full max-w-4xl rounded-xl overflow-hidden relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 bg-[#D4AF37] text-xl py-1 px-2 font-bold"
        >
          ✕
        </button>

        <iframe
          title="Provider Registration"
          src="https://docs.google.com/forms/d/e/1FAIpQLSdzZJZVcbSysfJdLF33ALRXzYx110dz5OOUygGfNALadVpgeg/viewform?embedded=true"
          width="100%"
          height="600"
          className="rounded-b-xl"
        >
          Loading…
        </iframe>

      </div>
    </div>
  );
}
