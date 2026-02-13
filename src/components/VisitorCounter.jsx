import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("https://api.countapi.xyz/get/chennairamadan.org/visits")

      .then((res) => res.json())
      .then((data) => setCount(data.value))
      .catch(console.error);
  }, []);

  return (
    <div className="text-center mt-6 text-[#D4AF37] font-bold">
      Total Visitors: {count}
    </div>
  );
}
