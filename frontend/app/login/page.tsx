'use client';

import React, { useState } from 'react';
import LoginModal from '../components/LoginModal'; // adjust path if needed

const LoginPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(true); // Always open on page visit

  return (
    <div>
      {/* Optional: background overlay to give context that it's a modal page */}
      <div className="fixed inset-0 bg-black/50 z-40" />

      {/* Login Modal */}
      <LoginModal isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />

      {/* Optional: handle case where modal is closed */}
      {!isLoginOpen && (
        <div className="text-center mt-10 text-gray-600">
          <p>Login cancelled. Go back to <a href="/" className="text-blue-600 underline">home</a>.</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
