import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';


export const api = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
    tagTypes: ['User'],
    endpoints: () => ({}),
});

export default api;
