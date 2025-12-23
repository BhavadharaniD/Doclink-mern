export default function DoctorNavbar({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "today", label: "Today" },
    { key: "pending", label: "Requests" },
    { key: "appointments", label: "Appointments" }, 
    { key: "profile", label: "Profile" }
  ];

  return (
    <div className="bg-white border-b px-6 py-3 flex gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-4 py-2 rounded-md font-medium transition ${
            activeTab === tab.key
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
