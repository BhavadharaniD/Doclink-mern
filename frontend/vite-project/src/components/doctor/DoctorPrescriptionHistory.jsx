import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function DoctorPrescriptionHistory() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    api.get("/prescriptions/doctor").then((res) => {
      setPrescriptions(res.data);
    });
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">
        Prescription History
      </h2>

      {prescriptions.length === 0 && (
        <p className="text-sm text-gray-500">
          No prescriptions written yet
        </p>
      )}

      <div className="space-y-4">
        {prescriptions.map((p) => (
          <div
            key={p._id}
            className="border rounded p-4"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-bold">
                  {p.patient.name}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(p.appointment.date).toDateString()} • {p.appointment.time}
                </p>
                <p className="text-xs text-gray-500">
                  Reason: {p.appointment.reason}
                </p>
              </div>

              <span className="text-xs text-gray-400">
                {new Date(p.createdAt).toLocaleDateString()}
              </span>
            </div>

            <ul className="list-disc ml-5 mt-3 text-sm">
              {p.medicines.map((m, i) => (
                <li key={i}>
                  {m.name} — {m.dosage} ({m.duration})
                </li>
              ))}
            </ul>

            {p.notes && (
              <p className="text-sm mt-2 text-gray-700">
                📝 {p.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
