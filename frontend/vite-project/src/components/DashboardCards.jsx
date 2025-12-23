export default function DashboardCards({ setActiveTab }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      
      <div
        onClick={() => setActiveTab("doctors")}
        className="cursor-pointer bg-blue-600 text-white p-6 rounded shadow text-center"
      >
        <h3 className="text-lg font-semibold">Book Appointment</h3>
      </div>

      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold">View Records</h3>
        <p className="text-sm text-gray-500">Coming soon</p>
      </div>

      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold">Pay Bills</h3>
        <p className="text-sm text-gray-500">Coming soon</p>
      </div>

    </div>
  );
}
