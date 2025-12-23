import { useEffect, useState } from "react";
import api from "../api/axios";
import { History, CheckCircle2, User, Calendar, ClipboardList } from "lucide-react";

export default function PastConsultations() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/appointments/patient")
      .then((res) => {
        const now = new Date();
        const past = res.data.filter((a) => {
          const appointmentDate = new Date(a.date);
          // Only show approved appointments that have already happened
          return a.status === "APPROVED" && appointmentDate < now;
        });
        
        // Sort by most recent first
        past.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAppointments(past);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <History className="w-5 h-5 text-slate-600" />
          Past Consultations
        </h2>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          History
        </span>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 w-full bg-gray-50 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No past consultations found.</p>
            <p className="text-xs text-gray-400 mt-1">Your completed visits will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((a) => (
              <div
                key={a._id}
                className="group relative border border-gray-100 bg-white p-5 rounded-xl transition-all hover:shadow-md hover:border-slate-200"
              >
                <div className="flex gap-4">
                  {/* Doctor Profile Pic / Icon */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold border border-slate-200">
                      {a.doctor.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-white" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                          Dr. {a.doctor.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5 uppercase tracking-wide">
                          {a.doctorProfile?.specialization || "General Physician"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-700">
                          {new Date(a.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                        <p className="text-xs text-gray-400">{a.time}</p>
                      </div>
                    </div>

                    {/* Footer Info / Diagnosis Placeholder */}
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <span className="text-xs font-medium text-gray-400">Diagnosis:</span>
                         <span className="text-xs text-gray-500 italic">No notes added</span>
                      </div>
                      
                      <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors underline-offset-4 hover:underline">
                        View Summary
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}