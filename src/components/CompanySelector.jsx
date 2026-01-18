import React, { useState, useEffect } from 'react';
import { companyAPI } from '../services/api';
import { Building2, Plus, Trash2 } from 'lucide-react';

function CompanySelector({ onSelectCompany, onCreateNew }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const data = await companyAPI.getAll();
      setCompanies(data.companies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this company?')) return;

    try {
      await companyAPI.delete(id);
      setCompanies(companies.filter(c => c._id !== id));
    } catch (err) {
      alert('Failed to delete company: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <div className="animate-spin" style={{
          width: '48px',
          height: '48px',
          border: '4px solid rgba(255,255,255,0.3)',
          borderTopColor: 'white',
          borderRadius: '50%',
          margin: '0 auto'
        }} />
        <p style={{ color: 'white', marginTop: '1rem' }}>Loading companies...</p>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="card" style={{ padding: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Your Companies
        </h2>
        <p style={{ color: '#718096', marginBottom: '2rem' }}>
          Select a company to manage or create a new one
        </p>

        {error && (
          <div style={{
            padding: '1rem',
            background: '#fed7d7',
            color: '#c53030',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            {error}
          </div>
        )}

        <button
          onClick={onCreateNew}
          className="btn-primary"
          style={{
            width: '100%',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '1rem'
          }}
        >
          <Plus size={20} />
          Create New Company
        </button>

        {companies.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: '#f7fafc',
            borderRadius: '8px',
            color: '#718096'
          }}>
            <Building2 size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <p>No companies yet. Create your first one to get started!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {companies.map((company) => (
              <div
                key={company._id}
                onClick={() => onSelectCompany(company._id)}
                style={{
                  padding: '1.5rem',
                  background: '#f7fafc',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#edf2f7';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f7fafc';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {company.companyName}
                  </h3>
                  <p style={{ color: '#718096', fontSize: '0.9rem' }}>
                    {company.stage.charAt(0).toUpperCase() + company.stage.slice(1)} · {company.teamSize} team members · {company.industry}
                  </p>
                </div>
                <button
                  onClick={(e) => handleDelete(company._id, e)}
                  style={{
                    background: '#fed7d7',
                    color: '#c53030',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanySelector;