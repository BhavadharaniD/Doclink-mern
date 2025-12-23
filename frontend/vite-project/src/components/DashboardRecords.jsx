import { useEffect, useState } from "react";
import api from "../api/axios";
import { FileText, ChevronRight, ExternalLink } from "lucide-react";

export default function DashboardRecords({ setActiveTab }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/records/my")
      .then((res) => {
        // Sort by newest first then take top 2
        const latest = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 2);
        setRecords(latest);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 rounded-lg">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="font-bold text-gray-800">Recent Records</h2>
        </div>

        <button
          onClick={() => setActiveTab("records")}
          className="group text-xs font-bold text-blue-600 flex items-center hover:text-blue-700 transition-colors"
        >
          View All
          <ChevronRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 flex-1">
        {loading ? (
          <div className="space-y-3">
            <div className="h-14 bg-gray-50 animate-pulse rounded-lg" />
            <div className="h-14 bg-gray-50 animate-pulse rounded-lg" />
          </div>
        ) : records.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-gray-400 italic">No records found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {records.map((r) => (
              <div
                key={r._id}
                className="group flex items-center justify-between p-3 rounded-xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 flex-shrink-0 bg-white rounded-lg border border-gray-100 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-semibold text-sm text-gray-800 truncate">
                      {r.title}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tight">
                      {new Date(r.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <a
                  href={r.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  title="Open Document"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer hint (Optional) */}
      <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-50">
        <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-medium">
          Secure Medical Storage
        </p>
      </div>
    </div>
  );
}