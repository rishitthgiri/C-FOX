import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Login from './components/Login';
import Register from './components/Register';
import CompanySelector from './components/CompanySelector';
import CompanyWorkflow from './components/CompanyWorkflow';
import { Building2, LogOut, Moon, Sun } from 'lucide-react';

function AppContent() {
  const { user, logout, loading } = useAuth();
  const { isDark, toggleTheme, colors } = useTheme();
  const [showRegister, setShowRegister] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [creatingNew, setCreatingNew] = useState(false);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.bgGradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="animate-spin" style={{
          width: '48px',
          height: '48px',
          border: '4px solid rgba(255,255,255,0.3)',
          borderTopColor: 'white',
          borderRadius: '50%'
        }} />
      </div>
    );
  }

  const handleBack = () => {
    setSelectedCompanyId(null);
    setCreatingNew(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.bgGradient }}>
      <nav style={{
        background: colors.navBg,
        backdropFilter: 'blur(10px)',
        padding: '1rem 2rem',
        boxShadow: colors.shadow
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Building2 size={32} color="#0891b2" />
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.textPrimary }}>C-FOX</h1>
              <p style={{ fontSize: '0.75rem', color: colors.textSecondary }}>AI CFO Copilot</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={toggleTheme}
              style={{
                background: isDark ? '#334155' : '#f0f9ff',
                color: isDark ? '#22d3ee' : '#0891b2',
                padding: '0.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user && (
              <>
                <span style={{ color: colors.textSecondary, fontWeight: '500' }}>{user.name}</span>
                <button
                  onClick={logout}
                  className="btn-secondary"
                  style={{
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {!user ? (
          showRegister ? (
            <Register onToggle={() => setShowRegister(false)} />
          ) : (
            <Login onToggle={() => setShowRegister(true)} />
          )
        ) : selectedCompanyId || creatingNew ? (
          <CompanyWorkflow
            companyId={selectedCompanyId}
            isNew={creatingNew}
            onBack={handleBack}
          />
        ) : (
          <CompanySelector
            onSelectCompany={setSelectedCompanyId}
            onCreateNew={() => setCreatingNew(true)}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;