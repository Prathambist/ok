import React, { useState } from 'react';

function New_account() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email) => {
    // Simple email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateName = (name) => {
    // Only alphabets and spaces allowed
    const re = /^[A-Za-z\s]+$/;
    return re.test(name);
  };

  const validatePassword = (password) => {
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  async function check1(e) {
    e.preventDefault();

    let newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    let hasError = false;

    if (name.trim() === '') {
      newErrors.name = 'Name is required';
      hasError = true;
    } else if (!validateName(name.trim())) {
      newErrors.name = 'Name must contain only alphabets and spaces';
      hasError = true;
    }

    if (email.trim() === '') {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!validateEmail(email.trim())) {
      newErrors.email = 'Invalid email format';
      hasError = true;
    }

    if (password.trim() === '') {
      newErrors.password = 'Password is required';
      hasError = true;
    } else if (!validatePassword(password.trim())) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
      hasError = true;
    }

    if (confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Please confirm your password';
      hasError = true;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await fetch('http://localhost/ok-main/medical/src/php/backend.php', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.text();
      console.log('Server Response:', data);
      alert(data);

      if (data.toLowerCase().includes('success')) {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong! Please try again.');
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
              {errors.name && (
                <p className="text-red-400 text-xs">{errors.name}</p>
              )}
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
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email}</p>
              )}
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
              {errors.password && (
                <p className="text-red-400 text-xs">{errors.password}</p>
              )}
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
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs">{errors.confirmPassword}</p>
              )}
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
