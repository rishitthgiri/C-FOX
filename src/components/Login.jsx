import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogIn } from 'lucide-react';

function Login({ onToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { colors } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in" style={{ 
      maxWidth: '450px', 
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <div className="card" style={{ padding: '2.5rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <LogIn size={48} color="#0891b2" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', color: colors.textPrimary }}>
            Welcome Back
          </h2>
          <p style={{ color: colors.textSecondary }}>Login to your C-FOX account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: colors.textPrimary
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: colors.textPrimary
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem'
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: '1rem',
                background: '#fed7d7',
                color: '#c53030',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', color: colors.textSecondary }}>
          Don't have an account?{' '}
          <button
            onClick={onToggle}
            style={{
              background: 'none',
              border: 'none',
              color: '#0891b2',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;