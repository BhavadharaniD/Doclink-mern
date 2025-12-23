import { useState } from "react";
import api from "../api/axios";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    console.log("LOGIN RESPONSE 👉", res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);

    if (res.data.user.role === "DOCTOR") {
      navigate("/doctor/dashboard");
    } else {
      navigate("/patient/dashboard");
    }
  } catch (err) {
    console.error("LOGIN ERROR 👉", err.response?.data || err.message);
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div >
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        <div className="flex items-center border p-2 rounded">
          <Mail size={18} />
          <input
            className="ml-2 outline-none w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center border p-2 rounded">
          <Lock size={18} />
          <input
            type="password"
            className="ml-2 outline-none w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>

      <div className="text-xs text-gray-700 text-center mt-7 space-y-1">
  <p><strong>Doctor:</strong> ravi@doclink.com | 123456</p>
  <p><strong>Patient:</strong> kumar@doclink.com | 123456</p>
</div>
</div>
    </div>
  );
}
