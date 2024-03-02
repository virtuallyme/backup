import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for storing error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message
    try {
      const response = await axios.post('YOUR_LOGIN_ENDPOINT', { email, password });
      // Handle response here
      // Save the token to localStorage and set user context
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); // Navigate to dashboard or home page
    } catch (err) {
      // Handle error here
      setError(err.response ? err.response.data.message : 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
      <div>
        Don't have an account? <Link to="/signup">Sign up</Link> {/* Add this line */}
      </div>
    </form>
  );
}
