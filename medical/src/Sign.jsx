import React, { useState } from 'react';

function Sign() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function check(e) {
    e.preventDefault();

    // Hide error messages by default
    document.getElementById("Syntax_email").classList.add("hidden");
    document.getElementById("Syntax_password").classList.add("hidden");

    let hasError = false;

    if (email.trim() === "") {
      document.getElementById("Syntax_email").classList.remove("hidden");
      hasError = true;
    }

    if (password.trim() === "") {
      document.getElementById("Syntax_password").classList.remove("hidden");
      hasError = true;
    }

    if (!hasError) {
      // Do your form submission or validation logic here
      alert("Form submitted successfully!");
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
              <p id="Syntax_email" className="text-red-400 text-xs hidden">
                Invalid, try again
              </p>
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
              <p id="Syntax_password" className="text-red-400 text-xs hidden">
                Incorrect password
              </p>
            </div>

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
