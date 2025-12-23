export default function PatientSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-56 bg-white border-l p-4 space-y-3">

      <button
        onClick={() => setActiveTab("doctors")}
        className={`w-full text-left p-2 rounded ${
          activeTab === "doctors"
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-100"
        }`}
      >
        Doctors List
      </button>

      <button
        onClick={() => setActiveTab("appointments")}
        className={`w-full text-left p-2 rounded ${
          activeTab === "appointments"
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-100"
        }`}
      >
        My Appointments
      </button>

      {/* 🔔 NEW */}
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
