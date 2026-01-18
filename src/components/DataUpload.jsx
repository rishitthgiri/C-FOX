import React, { useState } from 'react';
import { Upload, Database } from 'lucide-react';
import Papa from 'papaparse';
import { getDemoData } from '../utils/demoData';
import { useTheme } from '../context/ThemeContext';

function DataUpload({ onDataUpload }) {
  const [error, setError] = useState('');
  const { colors } = useTheme();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'text/csv') {
      setError('Please upload a CSV file');
      return;
    }

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (validateData(results.data)) {
          onDataUpload(results.data);
        } else {
          setError('Invalid CSV format. Required columns: month, revenue, expenses, goalRevenue, timeline');
        }
      },
      error: () => {
        setError('Error parsing CSV file');
      }
    });
  };

  const validateData = (data) => {
    if (!data || data.length === 0) return false;
    const firstRow = data[0];
    return firstRow.hasOwnProperty('month') && 
           firstRow.hasOwnProperty('revenue') && 
           firstRow.hasOwnProperty('expenses') &&
           firstRow.hasOwnProperty('goalRevenue') &&
           firstRow.hasOwnProperty('timeline');
  };

  const handleDemoData = () => {
    onDataUpload(getDemoData());
  };

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: colors.textPrimary }}>
          Upload Financial Data
        </h2>
        <p style={{ color: colors.textSecondary, marginBottom: '3rem', fontSize: '1.05rem' }}>
          Upload your monthly revenue and expense data with goals and timeline, or try our demo dataset
        </p>

        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{
            border: `2px dashed ${colors.border}`,
            borderRadius: '12px',
            padding: '2rem',
            transition: 'all 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.primary}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border}>
            <label style={{ cursor: 'pointer', display: 'block' }}>
              <Upload size={48} color="#0891b2" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: colors.textPrimary }}>
                Upload CSV
              </h3>
              <p style={{ color: colors.textSecondary, fontSize: '0.9rem', marginBottom: '1rem' }}>
                Required columns: month, revenue, expenses, goalRevenue, timeline
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <span className="btn-primary" style={{ display: 'inline-block' }}>
                Choose File
              </span>
            </label>
          </div>

          <div style={{
            border: `2px solid ${colors.border}`,
            borderRadius: '12px',
            padding: '2rem',
            transition: 'all 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.primary}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border}
          onClick={handleDemoData}>
            <Database size={48} color="#0891b2" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: colors.textPrimary }}>
              Use Demo Data
            </h3>
            <p style={{ color: colors.textSecondary, fontSize: '0.9rem', marginBottom: '1rem' }}>
              Try C-FOX with sample data
            </p>
            <span className="btn-secondary" style={{ display: 'inline-block' }}>
              Load Demo
            </span>
          </div>
        </div>

        {error && (
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#fed7d7',
            color: '#c53030',
            borderRadius: '8px',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}

        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: colors.cardBgHover,
          borderRadius: '8px',
          textAlign: 'left'
        }}>
          <h4 style={{ fontWeight: '600', marginBottom: '0.75rem', color: colors.textPrimary }}>
            CSV Format Example:
          </h4>
          <pre style={{
            background: colors.inputBg,
            padding: '1rem',
            borderRadius: '6px',
            fontSize: '0.85rem',
            overflow: 'auto',
            color: colors.textPrimary,
            border: `1px solid ${colors.border}`
          }}>
{`month,revenue,expenses,goalRevenue,timeline
2024-01,50000,35000,100000,Q2 2024
2024-02,55000,38000,100000,Q2 2024
2024-03,60000,40000,100000,Q2 2024`}
          </pre>
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            background: colors.isDark ? '#1e3a3a' : '#e6fffa', 
            borderRadius: '6px', 
            borderLeft: '4px solid #38b2ac' 
          }}>
            <p style={{ fontSize: '0.9rem', color: colors.textPrimary, fontWeight: '500' }}>
              <strong>New columns:</strong>
            </p>
            <ul style={{ 
              marginTop: '0.5rem', 
              paddingLeft: '1.5rem', 
              fontSize: '0.85rem', 
              color: colors.textSecondary 
            }}>
              <li><strong>goalRevenue</strong> - Your target revenue for scaling</li>
              <li><strong>timeline</strong> - When you want to achieve the goal (e.g., "Q2 2024", "6 months")</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataUpload;