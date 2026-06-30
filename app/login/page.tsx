"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen flex">
      {/* Chap qora sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col justify-between p-6">
        <div>
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-10">
            <div className="bg-white text-black font-bold w-9 h-9 flex items-center justify-center rounded-lg text-sm">
              JP
            </div>
            <span className="font-bold text-lg">JobPortal</span>
          </div>

          {/* Menu */}
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-4">
            Admin Menu
          </p>
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 text-slate-400 p-2 rounded-lg">
              <span>📄</span>
              <span className="text-sm">Jobs</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-400 p-2 rounded-lg">
              <span>➕</span>
              <span className="text-sm">Create Job</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-400 p-2 rounded-lg">
              <span>💼</span>
              <span className="text-sm">Applications</span>
            </div>
          </nav>
        </div>

        {/* Logout tugmasi */}
        <button className="bg-red-500 text-white py-2.5 rounded-lg text-sm font-medium w-full">
          Logout
        </button>
      </aside>

      {/* O'ng tomon - Login forma */}
      <main className="flex-1 bg-slate-100 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Logo va sarlavha */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center space-x-2 mb-3">
              <div className="bg-blue-900 text-white font-bold w-9 h-9 flex items-center justify-center rounded-lg text-sm">
                JP
              </div>
              <span className="font-bold text-xl text-slate-900">JobPortal</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Dashboard</h2>
            <p className="text-slate-500 text-sm mt-1">Sign in to manage job postings</p>
          </div>

          {/* Xatolik xabari */}
          {error && (
            <div className="bg-red-100 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Forma */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
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

            {/* Demo ma'lumotlar */}
            <div className="mt-6 bg-slate-50 p-4 rounded-xl text-xs text-slate-500">
              <p className="font-semibold text-slate-700 mb-1">Demo Credentials:</p>
              <p>Email: admin@jobportal.com</p>
              <p>Password: admin123</p>
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-blue-900 hover:underline"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}