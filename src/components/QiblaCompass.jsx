// import { useEffect, useState, useCallback } from "react";

// export default function QiblaCompass() {
//   const [heading, setHeading] = useState(0);
//   const [qiblaDirection, setQiblaDirection] = useState(0);
//   const [error, setError] = useState("");

//   const kaabaLat = 21.4225;
//   const kaabaLng = 39.8262;

//   // Calculate Qibla angle
//   const calculateQibla = useCallback((lat, lng) => {
//     const toRadians = (deg) => (deg * Math.PI) / 180;
//     const toDegrees = (rad) => (rad * 180) / Math.PI;

//     const φ1 = toRadians(lat);
//     const φ2 = toRadians(kaabaLat);
//     const Δλ = toRadians(kaabaLng - lng);

//     const y = Math.sin(Δλ);
//     const x =
//       Math.cos(φ1) * Math.tan(φ2) -
//       Math.sin(φ1) * Math.cos(Δλ);

//     const θ = Math.atan2(y, x);
//     const bearing = (toDegrees(θ) + 360) % 360;

//     setQiblaDirection(bearing);
//   }, []);

//   // Get User Location
//   const getLocation = useCallback(() => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         calculateQibla(pos.coords.latitude, pos.coords.longitude);
//       },
//       () => setError("Location permission denied")
//     );
//   }, [calculateQibla]);

//   // Request Device Orientation
//   const requestOrientationPermission = useCallback(() => {
//     if (
//       typeof DeviceOrientationEvent !== "undefined" &&
//       typeof DeviceOrientationEvent.requestPermission === "function"
//     ) {
//       DeviceOrientationEvent.requestPermission()
//         .then((response) => {
//           if (response === "granted") {
//             window.addEventListener("deviceorientation", handleOrientation);
//           }
//         })
//         .catch(() => setError("Orientation permission denied"));
//     } else {
//       window.addEventListener("deviceorientationabsolute", handleOrientation);
//     }
//   }, []);

//   const handleOrientation = useCallback((event) => {
//     const alpha = event.alpha;
//     if (alpha !== null) {
//       setHeading(360 - alpha);
//     }
//   }, []);

//   useEffect(() => {
//     getLocation();
//     requestOrientationPermission();

//     return () => {
//       window.removeEventListener("deviceorientation", handleOrientation);
//       window.removeEventListener("deviceorientationabsolute", handleOrientation);
//     };
//   }, [getLocation, requestOrientationPermission, handleOrientation]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
//       <h2 className="text-2xl font-bold text-yellow-400 mb-6">
//         Qibla Direction
//       </h2>

//       {error && <p className="text-red-400">{error}</p>}

//       <div className="relative w-64 h-64 border-4 border-yellow-500 rounded-full flex items-center justify-center">
//         <div
//           className="absolute w-2 h-24 bg-red-500 origin-bottom"
//           style={{
//             transform: `rotate(${qiblaDirection - heading}deg)`,
//           }}
//         />
//         <div className="text-sm text-gray-400">N</div>
//       </div>

//       <p className="mt-6 text-yellow-300">
//         Angle: {Math.round(qiblaDirection)}°
//       </p>
//     </div>
//   );
// }