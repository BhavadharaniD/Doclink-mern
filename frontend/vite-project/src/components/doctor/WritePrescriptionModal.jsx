import { useState } from "react";
import api from "../../api/axios";

export default function WritePrescriptionModal({ appointment, onClose }) {
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", duration: "" }
  ]);
  const [notes, setNotes] = useState("");

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  };

  const handleChange = (i, field, value) => {
    const updated = [...medicines];
    updated[i][field] = value;
    setMedicines(updated);
  };

  const savePrescription = async () => {
    await api.post("/prescriptions", {
      appointmentId: appointment._id,
      patientId: appointment.patient._id,
      medicines,
      notes
    });

    alert("Prescription saved ✅");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">
          Prescription for {appointment.patient.name}
        </h2>

        {medicines.map((m, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mb-2">
            <input
              placeholder="Medicine"
              value={m.name}
              onChange={(e) => handleChange(i, "name", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              placeholder="Dosage"
              value={m.dosage}
              onChange={(e) => handleChange(i, "dosage", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              placeholder="Duration"
              value={m.duration}
              onChange={(e) => handleChange(i, "duration", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        ))}

        <button onClick={addMedicine} className="text-blue-600 text-sm">
          + Add Medicine
        </button>

        <textarea
          placeholder="Doctor Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border p-2 rounded mt-3"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={savePrescription}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
