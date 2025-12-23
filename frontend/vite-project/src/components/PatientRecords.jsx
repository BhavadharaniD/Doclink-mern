import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PatientRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("/records/my").then((res) => setRecords(res.data));
  }, []);

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        Medical Records
      </h2>

      {records.length === 0 && (
        <p className="text-sm text-gray-500">
          No medical records uploaded yet.
        </p>
      )}

      <div className="space-y-4">
        {records.map((r) => (
          <div
            key={r._id}
            className="border-l-4 border-blue-600 bg-gray-50 p-4 rounded-md flex justify-between items-center"
          >
            {/* Left info */}
            <div>
              <p className="font-semibold text-gray-800">
                📄 {r.title}
              </p>

              <p className="text-sm text-gray-600">
                Uploaded on{" "}
                {new Date(r.createdAt).toDateString()}
              </p>

              {r.uploadedBy?.name && (
                <p className="text-xs text-gray-500">
                  Uploaded by Dr. {r.uploadedBy.name}
                </p>
              )}
            </div>

            {/* Action */}
            <a
              href={r.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View / Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
