import React, { useState, useEffect } from 'react';
import { companyAPI } from '../services/api';
import MetricsPanel from './MetricsPanel';
import ForecastChart from './ForecastChart';
import ChatInterface from './ChatInterface';
import ScenarioBuilder from './ScenarioBuilder';
import { ArrowLeft } from 'lucide-react';

function Dashboard({ companyId, financialData: initialFinancialData, businessContext, onBack }) {
  const [metrics, setMetrics] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [financialData, setFinancialData] = useState(initialFinancialData);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [companyId]);

  const loadDashboardData = async () => {
    try {
      const [metricsData, forecastData, companyData] = await Promise.all([
        companyAPI.getMetrics(companyId),
        companyAPI.getForecast(companyId),
        companyAPI.getById(companyId)
      ]);

      setMetrics(metricsData.metrics);
      setForecast(forecastData.forecast);
      setFinancialData(companyData.financialData);
    } catch (error) {
      alert('Failed to load dashboard data: ' + error.message);
    } finally {
      setLoading(false);
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
        <p style={{ color: 'white', marginTop: '1rem', fontSize: '1.1rem' }}>
          Analyzing your financial data...
        </p>
      </div>
    );
  }

  if (!metrics || !forecast) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <p style={{ color: 'white', fontSize: '1.1rem' }}>
          No data available. Please upload financial data first.
        </p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <button
        onClick={onBack}
        className="btn-secondary"
        style={{
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <ArrowLeft size={18} />
        Back to Companies
      </button>

      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
      }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          {businessContext.companyName}
        </h2>
        <p style={{ color: '#718096' }}>
          {businessContext.stage.charAt(0).toUpperCase() + businessContext.stage.slice(1)} · {businessContext.teamSize} team members · {businessContext.industry}
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '0.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
          {['overview', 'forecast', 'chat', 'scenarios'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '0.75rem 1.5rem',
                background: activeTab === tab ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                color: activeTab === tab ? 'white' : '#4a5568',
                fontWeight: '600',
                borderRadius: '8px',
                transition: 'all 0.2s'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div>
          <MetricsPanel metrics={metrics} businessContext={businessContext} />
        </div>
      )}

      {activeTab === 'forecast' && (
        <div className="card">
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
            Financial Forecast
          </h3>
          <ForecastChart data={forecast} />
        </div>
      )}

      {activeTab === 'chat' && (
        <ChatInterface 
          financialData={financialData}
          businessContext={businessContext}
          metrics={metrics}
          forecast={forecast}
        />
      )}

      {activeTab === 'scenarios' && (
        <ScenarioBuilder 
          financialData={financialData}
          businessContext={businessContext}
          metrics={metrics}
        />
      )}
    </div>
  );
}

export default Dashboard;