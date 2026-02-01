import React, { useState } from 'react';
import api from '../../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee'); // default

  const handleRegister = async () => {
    try {
      await api.post('/api/auth/register', { username, password, role });
      alert("User registered successfully! You can now log in.");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering user");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      {/* <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="Employee">Employee</option>
       
        <option value="HR" disabled>HR (admin only)</option>
      </select> */}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
/* 
export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await api.post('/auth/register', { username, password });
            alert("User registered successfully! You can now log in.");
        } catch (err) {
            alert(err.response?.data?.message || "Error registering user");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}
 */