import { useEffect, useRef, useState } from "react";
import L from "leaflet";

export default function QiblaMap() {
  const mapRef = useRef(null);
  const headingLineRef = useRef(null);
  const qiblaLineRef = useRef(null);

  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState("");

  // Kaaba coordinates
  const KAABA = { lat: 21.4225, lng: 39.8262 };

  // Calculate Qibla angle from user location
  const calculateQibla = (lat, lng) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

    const φ1 = toRad(lat);
    const φ2 = toRad(KAABA.lat);
    const Δλ = toRad(KAABA.lng - lng);

    const y = Math.sin(Δλ);
    const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ);
    const θ = Math.atan2(y, x);
    return (toDeg(θ) + 360) % 360;
  };

  // Get user location
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserLocation({ lat, lng });
      },
      () => setError("Location permission denied")
    );
  };

  // Initialize map
  useEffect(() => {
    if (!userLocation) return;

    mapRef.current = L.map("map", {
      center: [userLocation.lat, userLocation.lng],
      zoom: 17,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    // Qibla line (yellow)
    const qiblaAngle = calculateQibla(userLocation.lat, userLocation.lng);
    const distance = 0.01; // small distance to draw line
    const rad = (qiblaAngle * Math.PI) / 180;
    const qiblaLat = userLocation.lat + distance * Math.cos(rad);
    const qiblaLng = userLocation.lng + distance * Math.sin(rad);

    qiblaLineRef.current = L.polyline(
      [
        [userLocation.lat, userLocation.lng],
        [qiblaLat, qiblaLng],
      ],
      { color: "yellow", weight: 3 }
    ).addTo(mapRef.current);

    // Heading line (red)
    headingLineRef.current = L.polyline(
      [
        [userLocation.lat, userLocation.lng],
        [userLocation.lat, userLocation.lng], // temporary, will update
      ],
      { color: "red", weight: 3 }
    ).addTo(mapRef.current);

    // Marker for user
    L.circleMarker([userLocation.lat, userLocation.lng], {
      radius: 6,
      color: "cyan",
      fillColor: "cyan",
      fillOpacity: 1,
    }).addTo(mapRef.current);

  }, [userLocation]);

  // Device orientation handler
  const handleOrientation = (event) => {
    if (!userLocation || !headingLineRef.current) return;

    let alpha = event.alpha;
    let beta = event.beta;
    let gamma = event.gamma;

    if (alpha === null) return;

    // Correct heading for phone flat (top/front as needle)
    const heading = (alpha - gamma * Math.cos((beta * Math.PI) / 180) + 360) % 360;

    // Update heading line
    const distance = 0.01;
    const rad = (heading * Math.PI) / 180;
    const lat2 = userLocation.lat + distance * Math.cos(rad);
    const lng2 = userLocation.lng + distance * Math.sin(rad);

    headingLineRef.current.setLatLngs([
      [userLocation.lat, userLocation.lng],
      [lat2, lng2],
    ]);
  };

  // Request orientation permission
  useEffect(() => {
    getLocation();

    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          } else setError("Orientation permission denied");
        })
        .catch(() => setError("Orientation permission denied"));
    } else {
      window.addEventListener("deviceorientationabsolute", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("deviceorientationabsolute", handleOrientation);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Qibla Compass</h2>
      {error && <p className="text-red-400 mb-2">{error}</p>}
      <div
        id="map"
        className="w-full max-w-md h-96 border-2 border-yellow-500 rounded-lg"
      ></div>
      <p className="mt-2 text-yellow-300 text-sm">
        Align the <span className="font-bold">top of your phone</span> with the red line to match the yellow Qibla line.
      </p>
    </div>
  );
}