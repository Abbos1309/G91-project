"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Foydalanuvchi turi (TypeScript uchun)
interface User {
  email: string;
  password: string;
  role: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]); 
  const router = useRouter();

  function handleSubmit() {
    axios.get("http://localhost:5000/users").then((res) => {
      const fetchedUsers: User[] = res.data;
      setUsers(fetchedUsers); 

      const user = fetchedUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        router.push("/admin");
      } else {
        setError("Email yoki parol noto'g'ri!");
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
          Admin Dashboard
        </h2>
        <p className="text-center text-slate-500 text-sm mb-6">
          Sign in to manage job postings
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@jobportal.com"
              className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-900 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition text-sm"
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 bg-slate-50 p-4 rounded-xl text-xs text-slate-500">
          <p className="font-semibold text-slate-700 mb-1">Demo Credentials:</p>
          <p>Email: admin@jobportal.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
}