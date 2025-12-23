import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("/appointments/doctor").then((res) => {
      setAppointments(res.data);
    });
  }, []);

  const statusBadge = (status) => {
    if (status === "APPROVED")
      return "bg-green-100 text-green-700";
    if (status === "PENDING")
      return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="bg-white p-5 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Appointment History
      </h2>

      {appointments.length === 0 && (
        <p className="text-sm text-gray-500">
          No appointments found
        </p>
      )}

      <div className="space-y-3">
        {appointments.map((a) => (
          <div
            key={a._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{a.patient.name}</p>
              <p className="text-sm text-gray-600">
                {a.date} • {a.time}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Reason: {a.reason || "—"}
              </p>
            </div>

            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${statusBadge(
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
