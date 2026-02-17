import { useState, useEffect } from "react";

export function useLinkClicks(linkId) {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    fetch(`https://ramadan-sehri-backend.onrender.com/api/link-clicks/${linkId}`)
      .then((res) => res.json())
      .then((data) => setClicks(data.clicks))
      .catch(console.error);
  }, [linkId]);

  const trackClick = () => {
    fetch(`https://ramadan-sehri-backend.onrender.com/api/track-link/${linkId}`, {
      method: "POST",
    })
      .then(() => setClicks((prev) => prev + 1))
      .catch(console.error);
  };

  return [clicks, trackClick];
}
