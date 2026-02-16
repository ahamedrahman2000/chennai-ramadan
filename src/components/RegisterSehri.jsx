import { useState } from "react";

export default function RegistrationPage() {
  const [showThanks, setShowThanks] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showOptionalNote, setShowOptionalNote] = useState(false);

  const [formData, setFormData] = useState({
    organization: "",
    serviceType: "",
    sehriType: "",
    servingTime: "",
    area: "",
    fullAddress: "",
    locationLink: "",
    contactName: "",
    contactNumber: "",
    secondNumber: "",
    audience: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState({});
  const whatsappNumber = "919884680243";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactNumber" || name === "secondNumber") {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Organization required
    if (!formData.organization.trim()) {
      newErrors.organization = "Organization is required";
    } else if (!/^[a-zA-Z0-9 ]{1,30}$/.test(formData.organization)) {
      newErrors.organization =
        "Only letters and numbers allowed (max 30 characters)";
    }

    // Area required
    if (!formData.area.trim()) {
      newErrors.area = "Area is required";
    } else if (!/^[a-zA-Z0-9 ]{1,30}$/.test(formData.area)) {
      newErrors.area = "Only letters and numbers allowed (max 30 characters)";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setAlertMessage("Please fill the required fields correctly.");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const optionalFields = [
      "serviceType",
      "sehriType",
      "servingTime",
      "fullAddress",
      "locationLink",
      "contactName",
      "contactNumber",
      "secondNumber",
      "additionalInfo",
    ];

    const hasMissingOptional = optionalFields.some((field) => !formData[field]);

    // Show optional note ONLY before sending
    setShowOptionalNote(hasMissingOptional);

    setShowThanks(true);
  };

  const handleSend = () => {
    const message = `
*Sehri / Iftar Registration*

*Organization:* ${formData.organization}
*Service Type:* ${formData.serviceType}
*Sehri Type:* ${formData.sehriType}
*Serving Time:* ${formData.servingTime}
*Area:* ${formData.area}
*Address:* ${formData.fullAddress}
*Location Link:* ${formData.locationLink}
*Contact Name:* ${formData.contactName}
*Contact Number:* ${formData.contactNumber}
*Second Number:* ${formData.secondNumber}
*Additional Info:* ${formData.additionalInfo}
*Availability:* ${formData.audience}
  `;

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappLink, "_blank");

    // Hide optional note permanently after sending
    setShowOptionalNote(false);
  };

  const resetForm = () => {
    setShowThanks(false);
    setShowOptionalNote(false);
    setFormData({
      organization: "",
      serviceType: "",
      sehriType: "",
      servingTime: "",
      area: "",
      fullAddress: "",
      locationLink: "",
      contactName: "",
      contactNumber: "",
      secondNumber: "",
      additionalInfo: "",
      audience: "",
    });
    setErrors({});
  };

  const renderInput = (label, name, placeholder, type = "text", rows) => (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>

      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          rows={rows || 3}
          className={`w-full p-3 rounded ${
            errors[name]
              ? "border-2 border-red-500"
              : "border-2 border-[#D4AF37]"
          } bg-[#2A2A2A]`}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full p-3 rounded ${
            errors[name]
              ? "border-2 border-red-500"
              : "border-2 border-[#D4AF37]"
          } bg-[#2A2A2A]`}
        >
          <option value="">Select {label}</option>
          {name === "serviceType" && (
            <>
              <option>Masjid (Dine-in)</option>
              <option>Home Delivery</option>
              <option>Parcel (Tiffin)</option>
              <option>Hotel</option>
            </>
          )}
          {name === "sehriType" && (
            <>
              <option>Free Sehri</option>
              <option>Paid Sehri</option>
            </>
          )}
          {name === "servingTime" && (
            <>
              <option>2:30 AM onwards</option>
              <option>3:00 AM – 4:00 AM</option>
              <option>3:30 AM – 4:30 AM</option>
            </>
          )}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full p-3 rounded ${
            errors[name]
              ? "border-2 border-red-500"
              : "border-2 border-[#D4AF37]"
          } bg-[#2A2A2A]`}
        />
      )}

      {errors[name] && (
        <p className="text-red-500 mt-1 text-sm">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white py-6 sm:py-16 px-3 sm:px-4">
      <div
        className="max-w-2xl mx-auto 
                    bg-[#1A1A1A] 
                    p-3 sm:p-8 
                    rounded-xl sm:rounded-2xl 
                    shadow-xl 
                    border border-[#D4AF37]/30"
      >
        <h2
          className="text-lg sm:text-3xl 
             font-bold mb-2 sm:mb-4 
             text-[#D4AF37] text-center"
        >
          Sehri / Iftar Registration
        </h2>

        <p className="text-xs sm:text-sm text-center text-gray-400 mb-4 sm:mb-6">
          If you need Sehri food,
          <span className="text-[#D4AF37] font-semibold cursor-pointer hover:underline ml-1">
            click Find Sehri
          </span>
          .
          <br className="sm:hidden" />
          If you are a provider, please register below.
        </p>

        {/* ===== FORM GRID ===== */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Organization Full Width */}
          <div className="col-span-2">
            {renderInput(
              "Organization / Masjid Name *",
              "organization",
              "e.g. Masjid-e-Noor",
            )}
          </div>

          {renderInput("Type of Service", "serviceType", "", "select")}
          {renderInput("Sehri Type", "sehriType", "", "select")}

          {renderInput("Serving Time", "servingTime", "", "select")}
          {renderInput("Area *", "area", "e.g. Adyar, T. Nagar")}
          <div className="col-span-2 mb-4">
            <label className="block mb-2 font-semibold">Availability</label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="audience"
                  value="Only for Ladies"
                  checked={formData.audience === "Only for Ladies"}
                  onChange={handleChange}
                  className="accent-[#D4AF37]"
                />
                Only for Ladies
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="audience"
                  value="Open for All"
                  checked={formData.audience === "Open for All"}
                  onChange={handleChange}
                  className="accent-[#D4AF37]"
                />
                Open for All
              </label>
            </div>
          </div>

          {renderInput(
            "Google Maps Link",
            "locationLink",
            "Paste Google Maps link",
          )}
          {renderInput("Contact Name", "contactName", "Full name")}

          {renderInput(
            "Contact Number",
            "contactNumber",
            "10 digit number only",
          )}
          {renderInput("Second Number", "secondNumber", "10 digit number only")}

          {/* Full Address - Full Width */}
          <div className="col-span-2">
            {renderInput(
              "Full Address",
              "fullAddress",
              "Enter complete address",
              "textarea",
            )}
          </div>

          {/* Additional Info - Full Width */}
          <div className="col-span-2">
            {renderInput(
              "Additional Info",
              "additionalInfo",
              "Extra details",
              "textarea",
            )}
          </div>

          {/* Register Button Full Width */}
          <div className="col-span-2">
            <button
              onClick={handleSubmit}
              className="w-full 
                       bg-[#D4AF37] text-black 
                       py-2 sm:py-3 
                       rounded-lg 
                       text-sm sm:text-base 
                       font-bold 
                       shadow-[0_0_20px_rgba(212,175,55,0.6)] 
                       hover:scale-105 transition"
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* ===== ALERT MODAL ===== */}
      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 px-4">
          <div
            className="bg-[#1A1A1A] 
                        border-2 border-red-500 
                        rounded-xl 
                        p-4 sm:p-6 
                        max-w-xs sm:max-w-sm 
                        text-center"
          >
            <h3 className="text-lg sm:text-xl font-bold text-red-500 mb-3">
              Alert
            </h3>

            <p className="text-white text-sm sm:text-base mb-4">
              {alertMessage}
            </p>

            <button
              onClick={() => setAlertMessage("")}
              className="bg-red-500 text-white py-2 px-6 rounded-lg text-sm font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ===== THANK YOU MODAL ===== */}
      {showThanks && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 px-4">
          <div
            className="bg-[#1A1A1A] 
                        border-2 border-[#D4AF37] 
                        rounded-xl 
                        p-5 sm:p-8 
                        max-w-xs sm:max-w-sm 
                        text-center"
          >
            <h3 className="text-lg sm:text-2xl font-bold text-[#D4AF37] mb-3">
              Thank You!
            </h3>

            <p className="text-white text-sm sm:text-base mb-3">
              May Allah reward you for your contribution.
            </p>

            {showOptionalNote && (
              <p className="text-yellow-400 text-xs sm:text-sm mb-4">
                If you get details about missed fields, come back and fill.
              </p>
            )}

            <button
              onClick={handleSend}
              className="bg-[#D4AF37] text-black 
                       py-2 px-6 
                       rounded-lg 
                       text-sm font-semibold 
                       animate-pulse"
            >
              Send to WhatsApp
            </button>

            <div className="mt-3">
              <button
                onClick={resetForm}
                className="text-xs sm:text-sm text-gray-400 underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
