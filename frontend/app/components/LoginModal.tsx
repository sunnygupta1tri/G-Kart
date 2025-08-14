"use client";

import React, { useState } from "react";

interface LoginModalProps {
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isLoginOpen, setIsLoginOpen }) => {
  const [currentTab, setCurrentTab] = useState<"login" | "register" | "forgot">("login");
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isLoginOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setMessage("");

    setTimeout(() => {
      setLoginLoading(false);
      setMessage("✅ Logged in successfully (mock)");
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      setMessage("✅ Google login successful (mock)");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center capitalize">
          {currentTab === "login" && "Login"}
          {currentTab === "register" && "Register"}
          {currentTab === "forgot" && "Reset Password"}
        </h2>

        {message && <p className="text-sm text-blue-600 mb-3 text-center">{message}</p>}

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-4">
          <button onClick={() => setCurrentTab("login")} className={currentTab === "login" ? "font-bold" : ""}>
            Login
          </button>
          <button onClick={() => setCurrentTab("register")} className={currentTab === "register" ? "font-bold" : ""}>
            Register
          </button>
        </div>

        {/* Login/Register/Forgot Form */}
        {currentTab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border px-3 py-2 rounded"
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full border px-3 py-2 rounded"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-sm text-blue-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="text-right text-sm">
              <button
                type="button"
                onClick={() => setCurrentTab("forgot")}
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              disabled={loginLoading}
            >
              {loginLoading ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full border py-2 rounded text-sm text-gray-700"
            >
              {googleLoading ? "Signing in with Google..." : "Continue with Google"}
            </button>
          </form>
        )}

        {currentTab === "register" && (
          <form className="space-y-3">
            <input type="email" name="email" placeholder="Email" className="w-full border px-3 py-2 rounded" />
            <input type="password" name="password" placeholder="Password" className="w-full border px-3 py-2 rounded" />
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Register</button>
          </form>
        )}

        {currentTab === "forgot" && (
          <form className="space-y-3">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border px-3 py-2 rounded"
            />
            <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
              Reset Password
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab("login")}
              className="w-full text-center text-sm text-blue-600 hover:underline"
            >
              Back to Login
            </button>
          </form>
        )}

        {/* Close */}
        <button
          className="mt-5 w-full text-sm text-gray-500 hover:underline"
          onClick={() => setIsLoginOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
