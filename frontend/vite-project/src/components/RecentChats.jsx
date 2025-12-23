import { useEffect, useState } from "react";
import api from "../api/axios";
import ChatBox from "./ChatBox";

export default function RecentChats() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    api.get("/messages/recent").then(res => {
      setChats(res.data);
    });
  }, []);

  return (
    <div className="bg-white p-5 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">
        Recent Chats
      </h2>

      {chats.length === 0 && (
        <p className="text-sm text-gray-500">
          No recent conversations
        </p>
      )}

      {chats.map(chat => (
        <div
          key={chat._id}
          className="border-b py-2 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-sm">
              Appointment Chat
            </p>
            <p className="text-xs text-gray-500 truncate max-w-[180px]">
              {chat.lastMessage}
            </p>
          </div>

          <button
            onClick={() =>
              setActiveChatId(
                activeChatId === chat._id ? null : chat._id
              )
            }
            className="text-sm text-blue-600"
          >
            {activeChatId === chat._id ? "Close" : "Open"}
          </button>
        </div>
      ))}

      {activeChatId && (
        <div className="mt-4">
          <ChatBox appointmentId={activeChatId} />
        </div>
      )}
    </div>
  );
}
