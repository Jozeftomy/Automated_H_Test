import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    // Check if email and password are filled
    if (!email || !password) {
      window.alert('Please fill in all fields'); // Show pop-up message if fields are not filled
      return;
    }

    // Perform email validation
    const emailRegex = /^[^\s@]+@gmail\.com$/; // Regular expression for Gmail format validation
    if (!emailRegex.test(email)) {
      window.alert('Invalid Gmail format'); // Show pop-up message for invalid Gmail format
      return;
    }

    // Perform authentication logic here
    // For demonstration, let's assume authentication is successful if email is not empty
    if (email.trim() !== '') {
      // Navigate to the specified route if authentication is successful
      navigate('/loginSignup/slot');
    } else {
      // Handle authentication failure (e.g., display error message)
      console.log('Authentication failed: Email is empty');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleClick}>Login</button>
    </div>
  );
}

export default Login;


