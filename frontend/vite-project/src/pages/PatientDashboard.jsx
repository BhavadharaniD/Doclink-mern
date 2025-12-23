import { useEffect, useState } from "react";
import { requireAuth } from "../utils/requiredAuth";

import PatientNavbar from "../components/PatientNavbar";
import DoctorsList from "../components/DoctorsList";
import MyAppointments from "../components/MyAppointments";
import UpcomingAppointments from "../components/UpcomingAppointments";
import PastConsultations from "../components/PastConsultations";
import PatientPrescriptions from "../components/PatientPrescription";
import PatientRecords from "../components/PatientRecords";
import PatientNotifications from "../components/patient/PatientNotifications";
import RecentChats from "../components/RecentChats";

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    requireAuth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* TOP NAVBAR */}
      <PatientNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* MAIN CONTENT */}
      <div className="p-6 space-y-6 max-w-7xl mx-auto">

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <UpcomingAppointments />
              <RecentChats />
              <PastConsultations />
            </div>
          </>
        )}

        {/* FIND DOCTOR */}
        {activeTab === "doctors" && (
          <DoctorsList />
        )}

        {/* MY APPOINTMENTS */}
        {activeTab === "appointments" && (
          <MyAppointments />
        )}

        {/* PRESCRIPTIONS & RECORDS */}
        {activeTab === "records" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PatientPrescriptions />
            <PatientRecords />
          </div>
        )}

        {/* NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <PatientNotifications />
        )}

      </div>
    </div>
  );
}
