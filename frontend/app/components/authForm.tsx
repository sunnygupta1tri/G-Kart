// components/AuthForm.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slice/userSlice';
import { useLoginUserMutation, useForgotPasswordMutation } from '../store/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type AuthTab = 'login' | 'forgot';

const AuthForm = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState<AuthTab>('login');
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Use the mutation hooks
  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();

  const loading = isLoginLoading || isForgotLoading;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (tab === 'login') {
        const response = await loginUser({ 
          email: formData.email, 
          password: formData.password 
        }).unwrap();
        
        // Dispatch the setUser action
        dispatch(setUser({
          id: response.userId || response.id || "user-id-placeholder", // Adjust based on your API response
          name: response.name || formData.email.split('@')[0], // Adjust based on your API response
          email: formData.email
        }));
        
        setSuccess('Logged in successfully!');
        router.push('/');
      } else if (tab === 'forgot') {
        await forgotPassword({ 
          email: formData.email 
        }).unwrap();
        setSuccess('Reset link sent to email');
        setTab('login');
      }
    } catch (err: any) {
      setError(err.message || err.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-6 capitalize">
        {tab === 'login' ? 'Login' : 'Forgot Password'}
      </h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        {tab === 'login' && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? 'Please wait...'
            : tab === 'login'
            ? 'Login'
            : 'Send Reset Link'}
        </button>
      </form>

      {/* Navigation Links */}
      <div className="mt-4 text-sm text-center text-gray-600">
        {tab === 'login' ? (
          <>
            <button
              onClick={() => setTab('forgot')}
              className="text-blue-600 hover:underline block mb-2"
            >
              Forgot Password?
            </button>
            <Link href="/register" className="text-blue-600 hover:underline">
              Don't have an account? Register
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => setTab('login')}
              className="text-blue-600 hover:underline block mb-2"
            >
              Back to Login
            </button>
            <Link href="/register" className="text-blue-600 hover:underline">
              Need an account? Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;