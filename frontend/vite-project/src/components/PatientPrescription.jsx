import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PatientPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    api.get("/prescriptions/my").then((res) =>
      setPrescriptions(res.data)
    );
  }, []);

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        Prescriptions
      </h2>

      {prescriptions.length === 0 && (
        <p className="text-sm text-gray-500">
          No prescriptions available.
        </p>
      )}

      <div className="space-y-5">
        {prescriptions.map((p) => (
          <div
            key={p._id}
            className="border-l-4 border-blue-600 bg-gray-50 p-4 rounded-md"
          >
            {/* Doctor Info */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {p.doctor.name.charAt(0)}
              </div>

              <div>
                <p className="font-semibold">
                  Dr. {p.doctor.name}
                </p>

                {p.doctorProfile && (
                  <p className="text-xs text-gray-500">
                    {p.doctorProfile.specialization} •{" "}
                    {p.doctorProfile.hospital}
                  </p>
                )}
              </div>
            </div>

            {/* Medicines */}
            <div className="mt-3">
              <p className="text-sm font-semibold mb-1">
                Medicines
              </p>

              <div className="space-y-2">
                {p.medicines.map((m, i) => (
                  <div
                    key={i}
                    className="bg-white border p-2 rounded text-sm"
                  >
                    💊 <span className="font-medium">{m.name}</span>
                    <div className="text-gray-600 text-xs">
                      {m.dosage} • {m.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            {p.notes && (
              <div className="mt-3 text-sm text-gray-700">
                <span className="font-semibold">
                  Doctor Notes:
                </span>{" "}
                {p.notes}
              </div>
            )}

            {/* Date */}
            <p className="text-xs text-gray-500 mt-2">
              Prescribed on{" "}
              {new Date(p.createdAt).toDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
