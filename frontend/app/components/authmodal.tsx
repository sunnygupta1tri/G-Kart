"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import { useLoginUserMutation, useRegisterUserMutation, useForgotPasswordMutation } from "../store/api";

interface AuthModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

type Tab = "login" | "register" | "forgot";

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState<Tab>("login");

  // Form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");

  // UI states
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Use the mutation hooks
  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterUserMutation();
  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();

  const loading = isLoginLoading || isRegisterLoading || isForgotLoading;

  // Handle input changes
  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit handlers
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    try {
      const response = await loginUser({ 
        email: loginForm.email, 
        password: loginForm.password 
      }).unwrap();
      
      // Dispatch the setUser action with user data
      // Adjust these based on your actual API response structure
      dispatch(setUser({
        id: response.userId || response.id || "user-id-placeholder", 
        name: response.name || loginForm.email.split('@')[0], // Fallback to username from email
        email: loginForm.email
      }));
      
      setSuccessMsg("Logged in successfully!");
      setTimeout(() => setIsOpen(false), 1000);
    } catch (err: any) {
      setError(err.message || err.data?.message || "Login failed");
    }
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    try {
      const response = await registerUser({
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password
      }).unwrap();
      
      // Dispatch the setUser action for registration too
      // Adjust these based on your actual API response structure
      dispatch(setUser({
        id: response.userId || response.id || "user-id-placeholder",
        name: registerForm.name,
        email: registerForm.email
      }));
      
      setSuccessMsg("Registered successfully!");
      setTimeout(() => setIsOpen(false), 1000);
    } catch (err: any) {
      setError(err.message || err.data?.message || "Registration failed");
    }
  };

  const handleForgotSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    try {
      await forgotPassword({ 
        email: forgotEmail 
      }).unwrap();
      
      setSuccessMsg("Password reset link sent! Check your email.");
      setCurrentTab("login");
    } catch (err: any) {
      setError(err.message || err.data?.message || "Failed to send reset link");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center capitalize">
          {currentTab === "login" && "Login"}
          {currentTab === "register" && "Register"}
          {currentTab === "forgot" && "Reset Password"}
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-6">
          <button
            onClick={() => {
              setCurrentTab("login");
              setError(null);
              setSuccessMsg(null);
            }}
            className={currentTab === "login" ? "font-bold underline" : ""}
          >
            Login
          </button>
          <button
            onClick={() => {
              setCurrentTab("register");
              setError(null);
              setSuccessMsg(null);
            }}
            className={currentTab === "register" ? "font-bold underline" : ""}
          >
            Register
          </button>
          <button
            onClick={() => {
              setCurrentTab("forgot");
              setError(null);
              setSuccessMsg(null);
            }}
            className={currentTab === "forgot" ? "font-bold underline" : ""}
          >
            Forgot Password
          </button>
        </div>

        {error && <p className="text-red-600 mb-3 text-center">{error}</p>}
        {successMsg && <p className="text-green-600 mb-3 text-center">{successMsg}</p>}

        {/* Login Form */}
        {currentTab === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={handleLoginChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {/* Register Form */}
        {currentTab === "register" && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={registerForm.name}
              onChange={handleRegisterChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}

        {/* Forgot Password Form */}
        {currentTab === "forgot" && (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
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

        {/* Close Modal Button */}
        <button
          className="mt-5 w-full text-sm text-gray-500 hover:underline"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthModal;