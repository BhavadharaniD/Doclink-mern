import { useState } from "react";
import api from "../api/axios";

export default function DoctorAddPrescription({ appointmentId }) {
  const [notes, setNotes] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", duration: "" },
  ]);

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  };

  const handleChange = (i, field, value) => {
    const updated = [...medicines];
    updated[i][field] = value;
    setMedicines(updated);
  };

  const submitPrescription = async () => {
    await api.post("/prescriptions", {
      appointment: appointmentId,
      medicines,
      notes,
    });
    alert("Prescription added");
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="font-bold mb-2">Add Prescription</h3>

      {medicines.map((m, i) => (
        <div key={i} className="grid grid-cols-3 gap-2 mb-2">
          <input
            placeholder="Medicine"
            className="border p-2"
            onChange={(e) => handleChange(i, "name", e.target.value)}
          />
          <input
            placeholder="Dosage"
            className="border p-2"
            onChange={(e) => handleChange(i, "dosage", e.target.value)}
          />
          <input
            placeholder="Duration"
            className="border p-2"
            onChange={(e) => handleChange(i, "duration", e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={addMedicine}
        className="text-blue-600 text-sm mb-2"
      >
        + Add Medicine
      </button>

      <textarea
        placeholder="Notes"
        className="w-full border p-2 mb-2"
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        onClick={submitPrescription}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Prescription
      </button>
    </div>
  );
}
