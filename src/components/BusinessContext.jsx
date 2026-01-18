import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

function BusinessContext({ onSubmit, initialData }) {
  const [context, setContext] = useState({
    companyName: '',
    stage: 'seed',
    teamSize: 5,
    currentCash: 500000,
    growthTarget: 20,
    industry: 'saas'
  });

  useEffect(() => {
    if (initialData) {
      setContext(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(context);
  };

  const handleChange = (field, value) => {
    setContext(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fade-in" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="card" style={{ padding: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Business Context
        </h2>
        <p style={{ color: '#718096', marginBottom: '2rem' }}>
          Help us understand your business better
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                Company Name
              </label>
              <input
                type="text"
                value={context.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="Acme Inc."
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Company Stage
                </label>
                <select
                  value={context.stage}
                  onChange={(e) => handleChange('stage', e.target.value)}
                >
                  <option value="pre-seed">Pre-Seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Series A</option>
                  <option value="series-b">Series B+</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Industry
                </label>
                <select
                  value={context.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                >
                  <option value="saas">SaaS</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="marketplace">Marketplace</option>
                  <option value="fintech">Fintech</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                Team Size: {context.teamSize}
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={context.teamSize}
                onChange={(e) => handleChange('teamSize', parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                Current Cash Balance ($)
              </label>
              <input
                type="number"
                value={context.currentCash}
                onChange={(e) => handleChange('currentCash', parseFloat(e.target.value))}
                min="0"
                step="1000"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                Monthly Growth Target (%)
              </label>
              <input
                type="number"
                value={context.growthTarget}
                onChange={(e) => handleChange('growthTarget', parseFloat(e.target.value))}
                min="0"
                max="100"
                step="1"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{
            width: '100%',
            marginTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '1rem'
          }}>
            Continue to Dashboard
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default BusinessContext;