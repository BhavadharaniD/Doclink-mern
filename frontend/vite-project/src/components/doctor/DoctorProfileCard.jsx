import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function DoctorProfileCard() {
  const [form, setForm] = useState({
    bio: "",
    availableDays: [],
    availableTime: "",
    consultationFee: ""
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/doctors/me").then((res) => {
      setForm(res.data);
    });
  }, []);

  const toggleDay = (day) => {
    setForm((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day]
    }));
  };

  const saveProfile = async () => {
    setSaving(true);
    await api.put("/doctors/me", form);
    alert("Profile updated ✅");
    setSaving(false);
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl">
      <h2 className="text-xl font-semibold mb-4">
        My Profile
      </h2>

      {/* BIO */}
      <label className="block text-sm font-medium mb-1">
        Bio
      </label>
      <textarea
        className="border p-2 w-full rounded mb-4"
        rows="3"
        value={form.bio}
        onChange={(e) =>
          setForm({ ...form, bio: e.target.value })
        }
      />

      {/* AVAILABLE DAYS */}
      <label className="block text-sm font-medium mb-1">
        Available Days
      </label>
      <div className="flex flex-wrap gap-2 mb-4">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`px-3 py-1 rounded border text-sm ${
              form.availableDays.includes(day)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* AVAILABLE TIME */}
      <label className="block text-sm font-medium mb-1">
        Available Time
      </label>
      <input
        className="border p-2 w-full rounded mb-4"
        placeholder="10:00 AM - 1:00 PM"
        value={form.availableTime}
        onChange={(e) =>
          setForm({ ...form, availableTime: e.target.value })
        }
      />

      {/* FEE */}
      <label className="block text-sm font-medium mb-1">
        Consultation Fee (₹)
      </label>
      <input
        type="number"
        className="border p-2 w-full rounded mb-6"
        value={form.consultationFee}
        onChange={(e) =>
          setForm({
            ...form,
            consultationFee: e.target.value
          })
        }
      />

      <button
        onClick={saveProfile}
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
