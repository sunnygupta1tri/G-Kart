
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl, 
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformErrorResponse: (response: any) => {
        return response?.data?.message || response?.error || 'Login failed';
      },
    }),
    registerUser: builder.mutation({
      query: (userData: { name: string; email: string; password: string }) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
      transformErrorResponse: (response: any) => {
        return response?.data?.message || response?.error || 'Registration failed';
      },
    }),
    forgotPassword: builder.mutation({
      query: (emailData: { email: string }) => ({
        url: '/forgot-password',
        method: 'POST',
        body: emailData,
      }),
      transformErrorResponse: (response: any) => {
        return response?.data?.message || response?.error || 'Reset link failed';
      },
    }),
    resetPassword: builder.mutation({
      query: ({ token, newPassword }: { token: string; newPassword: string }) => ({
        url: `/reset-password/${token}`,
        method: 'POST',
        body: { newPassword },
      }),
      transformErrorResponse: (response: any) => {
        return response?.data?.message || response?.error || 'Reset failed';
      },
    }),
    checkAuth: builder.query({
      query: () => '/checkAuth',
      transformErrorResponse: () => {
        throw new Error('Not authenticated');
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useCheckAuthQuery,
} = authApi;

export default authApi;