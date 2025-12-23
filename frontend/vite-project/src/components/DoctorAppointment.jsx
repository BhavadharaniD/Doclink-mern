import { useEffect, useState } from "react";
import api from "../api/axios";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = () => {
    api.get("/appointments/doctor")
      .then((res) => setAppointments(res.data))
      .catch(() => alert("Failed to load appointments"));
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/appointments/${id}/status`, { status });
    loadAppointments();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Appointment Requests
      </h2>

      {appointments.map((a) => (
        <div
          key={a._id}
          className="border p-3 rounded mb-3"
        >
          <p className="font-bold">
            Patient: {a.patient.name}
          </p>
          <p>Email: {a.patient.email}</p>
          <p>Date: {a.date}</p>
          <p>Time: {a.time}</p>
          <p>Reason: {a.reason}</p>

          <p className="mt-1">
            Status: <strong>{a.status}</strong>
          </p>

          {a.status === "PENDING" && (
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateStatus(a._id, "APPROVED")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(a._id, "REJECTED")}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
