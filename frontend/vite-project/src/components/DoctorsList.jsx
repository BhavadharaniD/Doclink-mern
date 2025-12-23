import { useEffect, useState } from "react";
import api from "../api/axios";
import { Search, MapPin, Clock, Star, X } from "lucide-react";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    api.get("/doctors").then((res) => {
      setDoctors(res.data);
      setFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    setFiltered(
      doctors.filter((d) =>
        d.specialization.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, doctors]);

  const handleBook = async () => {
    if (!date || !time) return alert("Select date & time");
    await api.post("/appointments/book", {
      doctorId: selectedDoctor,
      date,
      time,
      reason
    });
    alert("Appointment booked ✅");
    setShowModal(false);
    setDate(""); setTime(""); setReason("");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Find a Doctor
        </h2>

        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 text-gray-400" />
          <input
            placeholder="Search by specialization"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* DOCTOR LIST */}
      <div className="space-y-4">
        {filtered.map((doc) => (
          <div
            key={doc._id}
            className="bg-white border rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
          >
            {/* LEFT */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {doc.user.name[0]}
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  Dr. {doc.user.name}
                </p>

                <p className="text-sm text-gray-600">
                  {doc.specialization} • {doc.experience} yrs
                </p>

                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3" /> {doc.hospital}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3" /> {doc.availableTime}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-sm text-yellow-600">
                <Star className="w-4 fill-yellow-500" /> {doc.rating}
              </div>

              <button
                onClick={() => {
                  setSelectedDoctor(doc.user._id);
                  setShowModal(true);
                }}
                className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOOK MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-96 rounded-xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400"
            >
              <X />
            </button>

            <h3 className="text-lg font-bold mb-4">
              Book Appointment
            </h3>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg p-2 mb-3"
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded-lg p-2 mb-3"
            />

            <textarea
              placeholder="Reason (optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4"
            />

            <button
              onClick={handleBook}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
