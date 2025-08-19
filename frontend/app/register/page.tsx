// app/register/page.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { registerUser } from '../lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await registerUser(form.name, form.email, form.password);
      setSuccess('Registered! Check your email to verify.');
      router.push('/auth');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
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
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600  text-white py-2 rounded "
        >
          {loading ? 'Registering...' : 'Register'}
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
