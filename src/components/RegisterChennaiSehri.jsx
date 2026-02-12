import { useState } from "react";

export default function RegisterChennaiSehri() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    organization: "",
    serviceType: "",
    sehriType: "",
    area: "",
    fullAddress: "",
    locationLink: "",
    contactName: "",
    contactNumber: "",
    secondNumber: "",
    additionalInfo: "",
  });

//   // Replace this with your deployed Google Apps Script Web App URL
//   const googleSheetWebhook = "https://script.google.com/macros/s/AKfycbyK5gIvKUNWe5j6Jt6R7--z2a4RZZ6ld2VJfSACzlxfzA8qbAaDK5pgziVCiaXcQk2fgw/exec";
//   const whatsappNumber = "9884680243"; // your number

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: value });
  };


//   const handleSend = async () => {
//     // 1️⃣ Send to Google Sheets
//     try {
//       await fetch(googleSheetWebhook, {
//         method: "POST",
//         body: JSON.stringify(formData),
//         headers: { "Content-Type": "application/json" },
//       });
//     } catch (err) {
//       console.error("Error sending to Google Sheets:", err);
//     }

//     // 2️⃣ Optional: Open WhatsApp message
//     const message = `
// *Sehri Update / Registration*
// *Organization / Masjid Name:* ${formData.organization}
// *Type of Service:* ${formData.serviceType}
// *Sehri Type:* ${formData.sehriType}
// *Area:* ${formData.area}
// *Full Address:* ${formData.fullAddress}
// *Location Link (Optional):* ${formData.locationLink}
// *Point of Contact:* ${formData.contactName}
// *Contact Number:* ${formData.contactNumber}
// *Second Number (Optional):* ${formData.secondNumber}
// *Additional Information:* ${formData.additionalInfo}
//     `;
//     const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(whatsappLink, "_blank");

//     // Close modal and reset form
//     setOpen(false);
//     setFormData({
//       organization: "",
//       serviceType: "",
//       sehriType: "",
//       area: "",
//       fullAddress: "",
//       locationLink: "",
//       contactName: "",
//       contactNumber: "",
//       secondNumber: "",
//       additionalInfo: "",
//     });
//   };

const handleSend = async () => {
  const message = `
*Sehri Update / Registration:*
*Organization / Masjid Name:* ${formData.organization}
*Type of Service:* ${formData.serviceType}
*Sehri Type:* ${formData.sehriType}
*Area:* ${formData.area}
*Full Address:* ${formData.fullAddress}
*Location Link:* ${formData.locationLink || "-"}
*Point of Contact:* ${formData.contactName}
*Contact Number:* ${formData.contactNumber}
*Second Number:* ${formData.secondNumber || "-"}
*Additional Info:* ${formData.additionalInfo || "-"}
`;

  // 1️⃣ Send to WhatsApp
  const whatsappLink = `https://wa.me/919884680243?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, "_blank");

  // 2️⃣ Send to Google Sheet
  try {
    await fetch("https://script.google.com/macros/s/AKfycbyK5gIvKUNWe5j6Jt6R7--z2a4RZZ6ld2VJfSACzlxfzA8qbAaDK5pgziVCiaXcQk2fgw/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch (err) {
    console.error("Error sending to Google Sheet:", err);
  }

  // Reset and close form
  setOpen(false);
  setFormData({
    organization: "",
    serviceType: "",
    sehriType: "",
    area: "",
    fullAddress: "",
    locationLink: "",
    contactName: "",
    contactNumber: "",
    secondNumber: "",
    additionalInfo: "",
  });
};

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => setOpen(true)}
        className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold
        animate-pulse shadow-[0_0_30px_rgba(212,175,55,1)]"
      >
        Update Sehri Details
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] text-white p-6 rounded-lg w-full max-w-lg overflow-y-auto max-h-[90vh] relative">
            
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-[#D4AF37] font-bold text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-3 text-[#D4AF37]">
              Update Sehri Details
            </h2>
            <p className="mb-6 text-[#A1A1AA]">
              Help us keep Sehri distribution points updated. Fill in the details below.
            </p>

            {/* Organization / Masjid Name */}
            <label className="block mb-2 font-semibold">Organization / Masjid Name *</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="e.g. Masjid-e-Khair"
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            />

            {/* Type of Service as dropdown */}
            <label className="block mb-2 font-semibold">Type of Service *</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            >
              <option value="">Select Service Type</option>
              <option value="Masjid (Dine-in)">Masjid (Dine-in)</option>
              <option value="Home Delivery">Home Delivery</option>
              <option value="Parcel (Tiffin)">Parcel (Tiffin)</option>
              <option value="Hotel">Hotel</option>
            </select>

            {/* Sehri Type */}
            <label className="block mb-2 font-semibold">Sehri Type *</label>
            <select
              name="sehriType"
              value={formData.sehriType}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            >
              <option value="">Select Sehri Type</option>
              <option value="Free Sehri">Free Sehri</option>
              <option value="Paid Sehri">Paid Sehri</option>
            </select>

            {/* Area */}
            <label className="block mb-2 font-semibold">Area *</label>
            <input
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="e.g. Adyar, Nungambakkam"
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            />

            {/* Full Address */}
            <label className="block mb-2 font-semibold">Full Address *</label>
            <textarea
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              placeholder="Complete address for directions..."
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
              rows={3}
            />

            {/* Optional Google Maps Link */}
            <label className="block mb-2 font-semibold">Google Maps / Location Link (Optional)</label>
            <input
              name="locationLink"
              value={formData.locationLink}
              onChange={handleChange}
              placeholder="Paste location link"
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            />

            {/* Contact Name */}
            <label className="block mb-2 font-semibold">Point of Contact Name *</label>
            <input
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Full name of contact person"
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            />

            {/* Contact Numbers */}
            <label className="block mb-2 font-semibold">Contact Number *</label>
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            />

            <label className="block mb-2 font-semibold">Additional Contact Number (Optional)</label>
            <input
              name="secondNumber"
              value={formData.secondNumber}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            />

            {/* Additional Information */}
            <label className="block mb-2 font-semibold">Additional Information (Optional)</label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Any extra info you'd like to share..."
              className="w-full p-3 mb-6 rounded bg-[#2A2A2A] placeholder-gray-400"
              rows={3}
            />

            {/* Submit */}
            <button
              onClick={handleSend}
              className="w-full bg-[#D4AF37] text-black py-3 rounded-lg font-semibold animate-pulse shadow-[0_0_30px_rgba(212,175,55,1)]"
            >
              Send to WhatsApp & Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
