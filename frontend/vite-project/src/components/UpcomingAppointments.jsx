import { useEffect, useState } from "react";
import api from "../api/axios";
import { Calendar, MapPin, Stethoscope, Clock } from "lucide-react"; // Optional: npm i lucide-react

export default function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/appointments/patient")
      .then((res) => {
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        const upcoming = res.data.filter((a) => {
          const appointmentDate = new Date(a.date);
          appointmentDate.setHours(0, 0, 0, 0);
          return a.status !== "REJECTED" && appointmentDate >= todayDate;
        });

        setAppointments(upcoming);
      })
      .finally(() => setLoading(false));
  }, []);

  const getStatusStyles = (status) => {
    const styles = {
      APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
      PENDING: "bg-amber-50 text-amber-700 border-amber-200",
      REJECTED: "bg-rose-50 text-rose-700 border-rose-200",
    };
    return styles[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Upcoming Appointments
        </h2>
        <span className="text-xs font-medium px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
          {appointments.length} Total
        </span>
      </div>

      <div className="p-6 space-y-4">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2].map((i) => <div key={i} className="h-24 bg-gray-100 rounded-lg" />)}
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 italic">No upcoming appointments scheduled.</p>
          </div>
        ) : (
          appointments.map((a) => (
            <div
              key={a._id}
              className="group border border-gray-100 bg-white hover:border-blue-200 hover:shadow-md transition-all duration-200 p-4 rounded-xl flex gap-4"
            >
              {/* Doctor Avatar */}
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-inner">
                  {a.doctor.name.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Dr. {a.doctor.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-blue-600 font-medium uppercase tracking-wider">
                      <Stethoscope className="w-3 h-3" />
                      {a.doctorProfile?.specialization}
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${getStatusStyles(a.status)}`}>
                    {a.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {a.time}
                  </div>
                  <div className="flex items-center gap-2 md:col-span-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{a.doctorProfile?.hospital}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}