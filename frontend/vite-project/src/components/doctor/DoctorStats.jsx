import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function DoctorStats() {
  const [stats, setStats] = useState({
    today: 0,
    pending: 0,
    patients: 0
  });

  useEffect(() => {
    api.get("/appointments/doctor").then((res) => {
      const todayDate = new Date().toISOString().split("T")[0];

      const todayAppointments = res.data.filter(
        (a) => a.date === todayDate && a.status === "APPROVED"
      );

      const pendingRequests = res.data.filter(
        (a) => a.status === "PENDING"
      );

      const uniquePatients = new Set(
        res.data.map((a) => a.patient._id)
      );

      setStats({
        today: todayAppointments.length,
        pending: pendingRequests.length,
        patients: uniquePatients.size
      });
    });
  }, []);

  const cards = [
    { label: "Today Appointments", value: stats.today },
    { label: "Pending Requests", value: stats.pending },
    { label: "Total Patients", value: stats.patients }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((c, i) => (
        <div key={i} className="bg-white p-5 rounded shadow">
          <p className="text-sm text-gray-500">{c.label}</p>
          <p className="text-3xl font-bold mt-1">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
