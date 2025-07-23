import React, { useState } from 'react';

function Sign() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  async function check(e) {
    e.preventDefault();

    // Clear previous error
    setErrorMsg('');

    console.log("Email:", email);
    console.log("Password:", password);

    // Validation
    if (email.trim() === '' || password.trim() === '') {
      setErrorMsg('Email and password are required.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('action', 'login'); // So backend knows it's a login request

      const response = await fetch('http://localhost/ok-main/medical/src/php/backend.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.text();
      console.log('Server Response:', result);

      if (result.toLowerCase().includes('success')) {
        alert('Login successful!');
        // Optionally redirect:
        // window.location.href = "/dashboard";
      } else {
        setErrorMsg(result); // Display error from backend
      }

    } catch (error) {
      console.error('Error:', error);
      setErrorMsg('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-200 flex items-center justify-center">
      <div className="h-[600px] w-[700px] bg-gray-50 shadow-lg">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">Sign In</h2>
          <form className="w-3/4" onSubmit={check}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your password"
              />
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Sign In
            </button>

            <div className="mt-4 text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="New_account" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sign;
