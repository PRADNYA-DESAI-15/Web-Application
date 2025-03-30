import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegister ? 'http://localhost:8000/api/register/' : 'http://localhost:8000/api/login/';
        const data = isRegister ? { username, email, password } : { email, password };

        try {
            const response = await axios.post(url, data);
            if (!isRegister) {
                localStorage.setItem('token', response.data.access);
                alert('Login Successful!');
                navigate("/dashboard");
            } else {
                alert('Registration Successful!');
            }
        } catch (error) {
            alert(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="container mt-5">
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                )}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">{isRegister ? 'Register' : 'Login'}</button>
                <button type="button" className="btn btn-link" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? 'Already have an account? Login' : 'No account? Register'}
                </button>
            </form>
        </div>
    );
};

export default Auth;
