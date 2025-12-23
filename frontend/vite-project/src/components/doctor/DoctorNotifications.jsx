import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function DoctorNotifications() {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = () => {
    api.get("/notifications/my").then((res) => {
      setNotifications(res.data);
    });
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markRead = async (id) => {
    await api.patch(`/notifications/${id}/read`);
    loadNotifications();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4 flex justify-between">
        Notifications
        {unreadCount > 0 && (
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </h2>

      {notifications.length === 0 && (
        <p className="text-sm text-gray-500">No notifications</p>
      )}

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n._id}
            onClick={() => markRead(n._id)}
            className={`border p-4 rounded cursor-pointer ${
              n.read ? "bg-gray-50" : "bg-blue-50"
            }`}
          >
            <p className="font-semibold">{n.title}</p>
            <p className="text-sm text-gray-600">{n.message}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
