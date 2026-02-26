import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";

export default function QiblaMap() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const redLineRef = useRef(null);
  const qiblaLineRef = useRef(null);

  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);

  // Kaaba coordinates
  const KAABA = { lat: 21.4225, lng: 39.8262 };

  // Calculate Qibla bearing from user's location
  const calculateQibla = useCallback(
    (lat, lng) => {
      const toRadians = (deg) => (deg * Math.PI) / 180;
      const toDegrees = (rad) => (rad * 180) / Math.PI;

      const φ1 = toRadians(lat);
      const φ2 = toRadians(KAABA.lat);
      const Δλ = toRadians(KAABA.lng - lng);

      const y = Math.sin(Δλ);
      const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ);

      const θ = Math.atan2(y, x);
      const bearing = (toDegrees(θ) + 360) % 360;
      setQiblaDirection(bearing);
    },
    [KAABA.lat, KAABA.lng] // include constants to satisfy ESLint
  );

  // Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        calculateQibla(loc.lat, loc.lng);
      },
      () => setError("Location permission denied")
    );
  }, [calculateQibla]);

  // Handle device orientation
  const handleOrientation = useCallback((event) => {
    const alpha = event.alpha;
    if (alpha !== null) {
      setHeading(360 - alpha);
    }
  }, []);

  useEffect(() => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(() => setError("Orientation permission denied"));
    } else {
      window.addEventListener("deviceorientationabsolute", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener(
        "deviceorientationabsolute",
        handleOrientation
      );
    };
  }, [handleOrientation]);

  // Initialize Leaflet map
  useEffect(() => {
    if (!userLocation || !mapContainerRef.current) return;
    if (mapRef.current) return;

    mapRef.current = L.map(mapContainerRef.current).setView(
      [userLocation.lat, userLocation.lng],
      17
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    // Add user marker
    userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng]).addTo(
      mapRef.current
    );

    // Add lines
    redLineRef.current = L.polyline(
      [
        [userLocation.lat, userLocation.lng],
        [userLocation.lat, userLocation.lng],
      ],
      { color: "red", weight: 4 }
    ).addTo(mapRef.current);

    qiblaLineRef.current = L.polyline(
      [
        [userLocation.lat, userLocation.lng],
        [KAABA.lat, KAABA.lng],
      ],
      { color: "yellow", weight: 4 }
    ).addTo(mapRef.current);
  }, [userLocation, KAABA.lat, KAABA.lng]);

  // Update red line based on heading
  useEffect(() => {
    if (!userLocation || !redLineRef.current) return;

    const distance = 0.01; // ~1 km line
    const headingRad = (heading * Math.PI) / 180;

    const newLat = userLocation.lat + distance * Math.cos(headingRad);
    const newLng = userLocation.lng + distance * Math.sin(headingRad);

    redLineRef.current.setLatLngs([
      [userLocation.lat, userLocation.lng],
      [newLat, newLng],
    ]);
  }, [heading, userLocation]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Qibla Map & Compass</h2>
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div
        ref={mapContainerRef}
        className="w-full max-w-md h-96 border-2 border-yellow-500 rounded-lg"
      ></div>

      <p className="mt-4 text-yellow-300">
        Qibla Angle: {Math.round(qiblaDirection)}° | Your Heading: {Math.round(heading)}°
      </p>
      <p className="mt-2 text-gray-400 text-sm text-center">
        Rotate your phone to align the red line (device direction) with the yellow line (Qibla)
      </p>
    </div>
  );
}