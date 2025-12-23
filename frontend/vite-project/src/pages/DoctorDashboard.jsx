import { useEffect, useState } from "react";
import { requireAuth } from "../utils/requiredAuth";

import DoctorSidebar from "../components/doctor/DoctorSidebar";
import DoctorStats from "../components/doctor/DoctorStats";
import TodayAppointments from "../components/doctor/TodayAppointments";
import PendingRequests from "../components/doctor/PendingRequests";
import DoctorProfileCard from "../components/doctor/DoctorProfileCard";
import DoctorAppointments from "../components/doctor/DoctorAppointments";
import DoctorPrescriptionHistory from "../components/doctor/DoctorPrescriptionHistory";
import DoctorNotifications from "../components/doctor/DoctorNotifications";
import RecentChats from "../components/RecentChats";

import DoctorAppointmentsChart from "../components/doctor/DoctorAppointmentsChart";
import AppointmentStatusChart from "../components/doctor/AppointmentStatusChart";

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    requireAuth("DOCTOR");
  }, []);

  /* 📊 MOCK DATA (Interview friendly – can be API driven later) */
  const appointmentTrend = [
    { date: "Mon", count: 3 },
    { date: "Tue", count: 5 },
    { date: "Wed", count: 2 },
    { date: "Thu", count: 6 },
    { date: "Fri", count: 4 }
  ];

  const statusData = [
    { status: "Approved", value: 12 },
    { status: "Pending", value: 4 },
    { status: "Rejected", value: 2 }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <DoctorStats />

            {/* 📊 ANALYTICS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DoctorAppointmentsChart data={appointmentTrend} />
              <AppointmentStatusChart data={statusData} />
            </div>

            {/* 📋 DAILY WORK */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TodayAppointments />
              <RecentChats />
            </div>
          </>
        );

      case "today":
        return <TodayAppointments />;

      case "pending":
        return <PendingRequests />;

      case "appointments":
        return <DoctorAppointments />;

      case "profile":
        return <DoctorProfileCard />;

      case "prescriptions":
        return <DoctorPrescriptionHistory />;

      case "notifications":
        return <DoctorNotifications />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen  bg-slate-50 flex">
      {/* SIDEBAR */}
      <DoctorSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 space-y-6">
        {renderContent()}
      </div>
    </div>
  );
}
 