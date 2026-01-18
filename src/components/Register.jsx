import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { UserPlus } from 'lucide-react';

function Register({ onToggle }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { colors } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, name);
    } catch (err) {
      setError(err.message || 'Registration failed');
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
          <UserPlus size={48} color="#0891b2" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', color: colors.textPrimary }}>
            Create Account
          </h2>
          <p style={{ color: colors.textSecondary }}>Join C-FOX and start managing your finances</p>
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
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
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

            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: colors.textPrimary
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', color: colors.textSecondary }}>
          Already have an account?{' '}
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
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;