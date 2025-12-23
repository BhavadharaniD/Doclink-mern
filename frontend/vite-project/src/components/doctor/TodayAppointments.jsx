import { useEffect, useState } from "react";
import api from "../../api/axios";
import WritePrescriptionModal from "./WritePrescriptionModal";
import ChatBox from "../ChatBox"; // ✅ ADD

export default function TodayAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    api.get("/appointments/doctor").then((res) => {
      const today = new Date().toDateString();

      const todays = res.data.filter(
        (a) =>
          new Date(a.date).toDateString() === today &&
          a.status === "APPROVED"
      );

      setAppointments(todays);
    });
  }, []);

  const openPrescriptionModal = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
  };

  return (
    <div className="bg-white p-5 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">
        Today’s Appointments
      </h2>

      {appointments.length === 0 && (
        <p className="text-sm text-gray-500">
          No appointments today
        </p>
      )}

      {appointments.map((a) => (
        <div key={a._id} className="border p-4 rounded mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold">{a.patient.name}</p>
              <p className="text-sm text-gray-600">
                {a.time} • {a.reason || "—"}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  setActiveChatId(
                    activeChatId === a._id ? null : a._id
                  )
                }
                className="text-sm bg-green-600 text-white px-3 py-1 rounded"
              >
                {activeChatId === a._id ? "Close Chat" : "Open Chat"}
              </button>

              <button
                onClick={() => openPrescriptionModal(a)}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
              >
                Write Prescription
              </button>
            </div>
          </div>

          {/* 💬 CHAT */}
          {activeChatId === a._id && (
            <div className="mt-4">
              <ChatBox appointmentId={a._id} />
            </div>
          )}
        </div>
      ))}

      {/* PRESCRIPTION MODAL */}
      {selectedAppointment && (
        <WritePrescriptionModal
          appointment={selectedAppointment}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
