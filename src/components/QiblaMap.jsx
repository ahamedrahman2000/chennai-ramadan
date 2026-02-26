import { useEffect, useRef, useState } from "react";
import L from "leaflet";

export default function QiblaMapCompass() {
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const qiblaLineRef = useRef(null);
  const headingLineRef = useRef(null);

  const [userLocation, setUserLocation] = useState(null);

  // Kaaba coordinates
  const KAABA = { lat: 21.4225, lng: 39.8262 };

  // 1️⃣ Get User Location
  useEffect(() => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserLocation({ lat, lng });
      },
      () => alert("Location permission denied"),
      { enableHighAccuracy: true }
    );
  }, []);

  // 2️⃣ Initialize Leaflet Map
  useEffect(() => {
    if (!userLocation) return;

    mapRef.current = L.map("map", { zoomControl: false }).setView(
      [userLocation.lat, userLocation.lng],
      15
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapRef.current);

    // User marker
    userMarkerRef.current = L.circleMarker([userLocation.lat, userLocation.lng], {
      radius: 8,
      color: "blue",
      fillColor: "blue",
      fillOpacity: 1,
    }).addTo(mapRef.current);

    // Qibla line (fixed)
    qiblaLineRef.current = L.polyline(
      [
        [userLocation.lat, userLocation.lng],
        [KAABA.lat, KAABA.lng],
      ],
      { color: "yellow", weight: 3 }
    ).addTo(mapRef.current);

    // Heading line (dynamic)
    headingLineRef.current = L.polyline(
      [
        [userLocation.lat, userLocation.lng],
        [userLocation.lat, userLocation.lng],
      ],
      { color: "red", weight: 3 }
    ).addTo(mapRef.current);
  }, [userLocation, KAABA.lat, KAABA.lng]);

  // 3️⃣ Device Orientation for mobile
  useEffect(() => {
    if (!userLocation || !headingLineRef.current) return;

    const handleOrientation = (event) => {
      let compassHeading;

      if (event.webkitCompassHeading) {
        compassHeading = event.webkitCompassHeading;
      } else if (event.alpha !== null) {
        compassHeading = 360 - event.alpha;
      }

      if (compassHeading !== undefined) {
        // Compute end point for heading line
        const distance = 0.01; // ~1km line
        const rad = (compassHeading * Math.PI) / 180;

        const lat2 = userLocation.lat + distance * Math.cos(rad);
        const lng2 = userLocation.lng + distance * Math.sin(rad);

        headingLineRef.current.setLatLngs([
          [userLocation.lat, userLocation.lng],
          [lat2, lng2],
        ]);
      }
    };

    // iOS permission
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission().then((res) => {
        if (res === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
        }
      });
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, [userLocation]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h2 className="text-yellow-400 text-2xl mb-4 font-bold text-center">
        Qibla Map + Compass
      </h2>

      <div
        id="map"
        className="w-full h-[500px] md:h-[600px] rounded-xl shadow-lg"
      ></div>

      {userLocation && (
        <p className="mt-4 text-center">
          Rotate your phone to align <span className="text-red-500">red</span>{" "}
          line with <span className="text-yellow-400">yellow</span> Qibla line
        </p>
      )}
    </div>
  );
}