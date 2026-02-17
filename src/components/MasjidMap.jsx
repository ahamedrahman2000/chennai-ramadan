// import { useState } from "react";
// import { providers } from "../data/providers";

// export default function MasjidMap() {
//   const [nearestProviders, setNearestProviders] = useState([]);
//   const [locationRequested, setLocationRequested] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Haversine formula to calculate distance in KM
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     lat1 = Number(lat1);
//     lon1 = Number(lon1);
//     lat2 = Number(lat2);
//     lon2 = Number(lon2);

//     const R = 6371; // km
//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;

//     const a =
//       Math.sin(dLat / 2) ** 2 +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLon / 2) ** 2;

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // km
//   };

//   // Get user's current location when button is clicked
//   const getUserLocation = () => {
//     setLocationRequested(true);
//     setLoading(true);

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLat = position.coords.latitude;
//           const userLng = position.coords.longitude;

//           // Calculate distance for each provider
//           const sorted = providers
//             .map((provider) => ({
//               ...provider,
//               distance: calculateDistance(
//                 userLat,
//                 userLng,
//                 provider.lat,
//                 provider.lng,
//               ),
//             }))
//             .sort((a, b) => a.distance - b.distance)
//             .slice(0, 5); // top 5 nearest

//           setNearestProviders(sorted);
//           setLoading(false);
//         },
//         () => {
//           setLoading(false);
//           alert("Location access denied. Cannot show nearby locations.");
//         },
//       );
//     } else {
//       setLoading(false);
//       alert("Geolocation not supported by your browser.");
//     }
//   };

//   return (
//     <section className="relative min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-6 py-8">
//       <h2 className="text-4xl font-bold text-center text-[#D4AF37] mb-6">
//         Sehri Locations
//       </h2>

//       {/* Button to request location */}
//       {!locationRequested && (
//         <div className="text-center mb-6">
//           <button
//             type="button"
//             onClick={getUserLocation}
//             className="bg-[#D4AF37] text-black font-semibold py-2 px-6 rounded hover:bg-yellow-400 transition"
//           >
//             Show Nearby Sehri Locations
//           </button>
//         </div>
//       )}

//       {/* Loading Indicator */}
//       {loading && (
//         <div className="text-center text-[#D4AF37] font-semibold mb-4">
//           Loading nearby locations...
//         </div>
//       )}

//       {/* Nearby Locations */}

//       {/* Google My Map */}
//       <div className="max-w-6xl mx-auto">
//         <iframe
//           src="https://www.google.com/maps/d/embed?mid=1w8sJbVcvXSBCEs8HrDN9_Mfy7iv5fEw"
//           width="100%"
//           height="500"
//           className="rounded-xl border border-[#333]"
//           loading="lazy"
//           title="Masjid Location Map"
//         />
//       </div>

//       {nearestProviders.length > 0 && (
//         <div className="max-w-4xl mx-auto mb-10 bg-[#222] p-6 mt-5 rounded-xl border border-[#333]">
//           <h3 className="text-[#D4AF37] text-xl font-bold mb-4">
//             📍 Nearby Sehri Locations
//           </h3>

//           {nearestProviders.map((item) => {
//             const walkMinutes = Math.round((item.distance / 5) * 60); // 5 km/h walking
//             return (
//               <div
//                 key={item.id}
//                 className="border-b border-[#333] py-3 last:border-none"
//               >
//                 <p className="font-semibold">{item.name}</p>
//                 <p className="text-sm text-gray-400">
//                   {item.area} • {item.distance.toFixed(2)} km
//                   {walkMinutes ? ` (~${walkMinutes} min walk)` : ""}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </section>
//   );
// }
