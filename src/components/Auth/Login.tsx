import React, { useState } from 'react';
import { AuthService } from '../../services/AuthService';
import './Login.css';

interface LoginProps {
    onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const authService = AuthService.getInstance();
            if (isLogin) {
                await authService.login(email, password);
            } else {
                await authService.signUp(email, password);
            }
            onLoginSuccess();
        } catch (err: any) {
            console.error('Auth error:', err);
            setError(err.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

                <div className="debug-info" style={{ fontSize: '0.8rem', background: '#f0f0f0', padding: '10px', marginBottom: '15px', borderRadius: '5px' }}>
                    <p><strong>Debug Config Status:</strong></p>
                    <ul>
                        <li>API Key: {process.env.REACT_APP_FIREBASE_API_KEY ? `Present (${process.env.REACT_APP_FIREBASE_API_KEY.substring(0, 5)}...)` : 'MISSING'}</li>
                        <li>Auth Domain: {process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? 'Present' : 'MISSING'}</li>
                        <li>Project ID: {process.env.REACT_APP_FIREBASE_PROJECT_ID ? 'Present' : 'MISSING'}</li>
                    </ul>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            minLength={6}
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={isLoading}>
                        {isLoading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
                    </button>
                </form>

                <div className="auth-switch">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};
