import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ChatPage({ isAdmin }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Fetch all messages on load
    supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data }) => setMessages(data));

    // Listen for new messages
    const subscription = supabase
      .from("chat_messages")
      .on("INSERT", (payload) => {
        setMessages((prev) => [...prev, payload.new]);
        // Optional: trigger browser notification
        if (Notification.permission === "granted") {
          new Notification("New Message", {
            body: payload.new.message.slice(0, 50),
          });
        }
      })
      .subscribe();

    return () => supabase.removeSubscription(subscription);
  }, []);

  const handleSend = async () => {
    if (!input) return;

    // User message validation
    if (!isAdmin && /[^a-zA-Z\s]/.test(input)) {
      alert("Only letters are allowed for users!");
      return;
    }

    if (!isAdmin && input.length > 20) {
      alert("Maximum 20 characters for users!");
      return;
    }

    await supabase.from("chat_messages").insert({
      message: input,
      is_admin: isAdmin || false,
    });

    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-[#111] text-white rounded-xl">
      <div className="space-y-2 h-80 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded ${
              msg.is_admin ? "bg-yellow-500 text-black" : "bg-gray-700"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 rounded text-black"
        placeholder="Type message..."
      />
      <button
        onClick={handleSend}
        className="mt-2 w-full py-2 bg-[#D4AF37] rounded font-bold text-black"
      >
        Send
      </button>
    </div>
  );
}
