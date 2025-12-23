import { useEffect, useState } from "react";
import api from "../api/axios";
import ChatBox from "./ChatBox"; // ✅ ADD

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    api
      .get("/appointments/patient")
      .then((res) => setAppointments(res.data))
      .catch(() => alert("Failed to load appointments"));
  }, []);

  const statusBadge = (status) => {
    if (status === "APPROVED")
      return "bg-green-100 text-green-700";
    if (status === "PENDING")
      return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        My Appointments
      </h2>

      {appointments.length === 0 && (
        <p className="text-sm text-gray-500">
          No appointments found.
        </p>
      )}

      <div className="space-y-4">
        {appointments.map((a) => (
          <div key={a._id} className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-start">
              <p className="font-semibold text-gray-800">
                Dr. {a.doctor.name}
              </p>

              <span
                className={`text-xs px-3 py-1 rounded ${statusBadge(
                  a.status
                )}`}
              >
                {a.status}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              {new Date(a.date).toDateString()} • {a.time}
            </p>

            <p className="text-sm text-gray-700 mt-1">
              🏥 {a.doctorProfile?.hospital || "Hospital not available"}
            </p>

            <p className="text-xs text-gray-500">
              {a.doctorProfile?.specialization}
            </p>

            {/* 💬 CHAT BUTTON */}
            {a.status === "APPROVED" && (
              <button
                onClick={() =>
                  setActiveChatId(
                    activeChatId === a._id ? null : a._id
                  )
                }
                className="mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded"
              >
                {activeChatId === a._id
                  ? "Close Chat"
                  : "Chat with Doctor"}
              </button>
            )}

            {/* 💬 CHAT BOX */}
            {activeChatId === a._id && (
              <div className="mt-3">
                <ChatBox appointmentId={a._id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
