import React, { useState } from 'react';
import api from '../../api';

export default function Login({ setRole }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await api.post('/api/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);

            // Decode role from token (simplified)
            if (username === 'admin') setRole('HR');
            else setRole('Employee');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
