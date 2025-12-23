export default function PatientNavbar({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white border-b px-6 py-3 flex gap-4">
      <button
        onClick={() => setActiveTab("dashboard")}
        className={`px-4 py-2 rounded ${
          activeTab === "dashboard"
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-100"
        }`}
      >
        Dashboard
      </button>

      <button
        onClick={() => setActiveTab("doctors")}
        className={`px-4 py-2 rounded ${
          activeTab === "doctors"
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-100"
        }`}
      >
        Find Doctor
      </button>

      <button
        onClick={() => setActiveTab("appointments")}
        className={`px-4 py-2 rounded ${
          activeTab === "appointments"
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-100"
        }`}
      >
        My Appointments
      </button>
      <button
  onClick={() => setActiveTab("records")}
  className={`px-4 py-2 rounded ${
    activeTab === "records"
      ? "bg-blue-600 text-white"
      : "hover:bg-gray-100"
  }`}
>
  Prescriptions & Records
</button>
 <button
  onClick={() => setActiveTab("notifications")}
  className={`px-4 py-2 rounded-md font-medium transition ${
    activeTab === "notifications"
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-gray-100"
  }`}
>
  Notifications
</button>

    </div>
  );
}
