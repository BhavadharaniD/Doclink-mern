import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("/appointments/doctor").then((res) => {
      setAppointments(res.data);
    });
  }, []);

  const filteredAppointments = appointments.filter((a) => {
    const today = new Date();
    const appDate = new Date(a.date);

    if (filter === "today") {
      return appDate.toDateString() === today.toDateString();
    }

    if (filter === "upcoming") {
      return appDate > today && a.status === "APPROVED";
    }

    if (filter === "past") {
      return appDate < today;
    }

    if (filter === "pending") {
      return a.status === "PENDING";
    }

    return true; // all
  });

  const badgeStyle = (status) => {
    if (status === "APPROVED") return "bg-green-100 text-green-700";
    if (status === "PENDING") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Appointment History
      </h2>

      {/* FILTER TABS */}
      <div className="flex gap-2 mb-4">
        {["all", "today", "upcoming", "past", "pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-sm font-medium ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <p className="text-sm text-gray-500">No appointments found</p>
      )}

      <div className="space-y-3">
        {filteredAppointments.map((a) => (
          <div
            key={a._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{a.patient.name}</p>
              <p className="text-sm text-gray-600">
                {new Date(a.date).toDateString()} • {a.time}
              </p>
              <p className="text-xs text-gray-500">
                Reason: {a.reason || "—"}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded text-xs font-semibold ${badgeStyle(
                a.status
              )}`}
            >
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
