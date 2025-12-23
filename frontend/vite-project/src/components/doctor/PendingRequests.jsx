import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    const res = await api.get("/appointments/doctor");
    const pending = res.data.filter(a => a.status === "PENDING");
    setRequests(pending);
    setLoading(false);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      await loadRequests(); // 🔥 re-fetch after update
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="bg-white p-5 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">
        Pending Requests
      </h2>

      {loading && (
        <p className="text-sm text-gray-500">Loading...</p>
      )}

      {!loading && requests.length === 0 && (
        <p className="text-sm text-gray-500">
          No pending requests
        </p>
      )}

      <div className="space-y-3">
        {requests.map((r) => (
          <div
            key={r._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{r.patient.name}</p>
              <p className="text-sm text-gray-600">
                {r.date} • {r.time}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Reason: {r.reason || "—"}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(r._id, "APPROVED")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(r._id, "REJECTED")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
