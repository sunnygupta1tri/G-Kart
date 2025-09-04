// app/register/page.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slice/userSlice';
import { useRegisterUserMutation } from '../store/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Use the mutation hook
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Call the mutation with the form data
      const response = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password
      }).unwrap();
      
      // Dispatch the setUser action
      dispatch(setUser({
        id: response.userId || response.id || "user-id-placeholder", // Adjust based on your API response
        name: form.name,
        email: form.email
      }));
      
      setSuccess('Registered! Check your email to verify.');
      router.push('/auth');
    } catch (err: any) {
      // The error is already transformed by the API
      setError(err.message || err.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded disabled:opacity-50"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="mt-4 text-sm text-center text-gray-600">
        <Link href="/login" className="text-blue-600 hover:underline">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}