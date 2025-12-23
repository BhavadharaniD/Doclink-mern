import { useEffect, useState } from "react";
import socket from "../socket";
import api from "../api/axios";

export default function ChatBox({ appointmentId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // 1️⃣ JOIN ROOM
    socket.emit("joinRoom", appointmentId);

    // 2️⃣ LOAD OLD MESSAGES
    api.get(`/messages/${appointmentId}`).then((res) => {
      setMessages(res.data);
    });

    // 3️⃣ LISTEN FOR NEW MESSAGES
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [appointmentId]);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      appointmentId,
      content: text
    });

    setText("");
  };

  return (
    <div className="border rounded p-3 mt-2">
      <div className="h-52 overflow-y-auto space-y-2 mb-2">
        {messages.map((m) => (
          <div key={m._id} className="bg-gray-100 p-2 rounded">
            <span className="font-semibold">
              {m.sender?.name}:
            </span>{" "}
            {m.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border flex-1 p-2 rounded"
          placeholder="Type message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
