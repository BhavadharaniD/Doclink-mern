export default function DoctorSidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "today", label: "Today" },
    { key: "pending", label: "Requests" },
    { key: "appointments", label: "Appointments" },
    { key: "profile", label: "Profile" },
    { key: "prescriptions", label: "Prescriptions" },
     { key: "notifications", label: "Notifications" }

  ];

  return (
    <div className="w-56 bg-blue-600 text-white min-h-screen p-4 space-y-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`w-full text-left px-4 py-2 rounded-md font-medium transition ${
            activeTab === tab.key
              ? "bg-blue-800"
              : "hover:bg-blue-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
