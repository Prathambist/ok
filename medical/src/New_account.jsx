import React, { useState } from 'react';

function New_account() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function check1(e) {
    e.preventDefault();

    // Hide all error messages
    document.getElementById("err_name").classList.add("hidden");
    document.getElementById("err_email").classList.add("hidden");
    document.getElementById("err_password").classList.add("hidden");
    document.getElementById("err_confirm").classList.add("hidden");

    let hasError = false;

    if (name.trim() === "") {
      document.getElementById("err_name").classList.remove("hidden");
      hasError = true;
    }
    if (email.trim() === "") {
      document.getElementById("err_email").classList.remove("hidden");
      hasError = true;
    }
    if (password.trim() === "") {
      document.getElementById("err_password").classList.remove("hidden");
      hasError = true;
    }
    if (confirmPassword.trim() === "") {
      document.getElementById("err_confirm").innerText = "Please confirm your password";
      document.getElementById("err_confirm").classList.remove("hidden");
      hasError = true;
    } else if (confirmPassword !== password) {
      document.getElementById("err_confirm").innerText = "Passwords do not match";
      document.getElementById("err_confirm").classList.remove("hidden");
      hasError = true;
    }

    if (!hasError) {
      alert("Account created successfully!"); // Optional success message
      // You can clear inputs or redirect here
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex items-center justify-center">
      <div className="h-[650px] w-[700px] bg-gray-50 shadow-lg">
        <form onSubmit={check1} className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">Create New Account</h2>
          <div className="w-3/4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your full name"
              />
              <p id="err_name" className="text-red-400 text-xs hidden">Name is required</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your email"
              />
              <p id="err_email" className="text-red-400 text-xs hidden">Email is required</p>
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
              <p id="err_password" className="text-red-400 text-xs hidden">Password is required</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Re-enter your password"
              />
              <p id="err_confirm" className="text-red-400 text-xs hidden">Confirm your password</p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default New_account;
