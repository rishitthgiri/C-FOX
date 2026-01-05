import React, { useState } from 'react'
import { Upload, Database } from 'lucide-react'
import Papa from 'papaparse'
import { getDemoData } from '../utils/demoData'

function DataUpload({ onDataUpload }) {
  const [error, setError] = useState('')

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== 'text/csv') {
      setError('Please upload a CSV file')
      return
    }

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (validateData(results.data)) {
          onDataUpload(results.data)
        } else {
          setError('Invalid CSV format. Required columns: month, revenue, expenses')
        }
      },
      error: () => {
        setError('Error parsing CSV file')
      }
    })
  }

  const validateData = (data) => {
    if (!data || data.length === 0) return false
    const firstRow = data[0]
    return firstRow.hasOwnProperty('month') && 
           firstRow.hasOwnProperty('revenue') && 
           firstRow.hasOwnProperty('expenses')
  }

  const handleDemoData = () => {
    onDataUpload(getDemoData())
  }

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#1a202c' }}>
          Upload Financial Data
        </h2>
        <p style={{ color: '#718096', marginBottom: '3rem', fontSize: '1.05rem' }}>
          Upload your monthly revenue and expense data, or try our demo dataset
        </p>

        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{
            border: '2px dashed #cbd5e0',
            borderRadius: '12px',
            padding: '2rem',
            transition: 'all 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#667eea'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#cbd5e0'}>
            <label style={{ cursor: 'pointer', display: 'block' }}>
              <Upload size={48} color="#667eea" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Upload CSV
              </h3>
              <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Required columns: month, revenue, expenses
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
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            padding: '2rem',
            transition: 'all 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#667eea'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
          onClick={handleDemoData}>
            <Database size={48} color="#667eea" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Use Demo Data
            </h3>
            <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '1rem' }}>
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
          background: '#f7fafc',
          borderRadius: '8px',
          textAlign: 'left'
        }}>
          <h4 style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#2d3748' }}>
            CSV Format Example:
          </h4>
          <pre style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '6px',
            fontSize: '0.85rem',
            overflow: 'auto'
          }}>
{`month,revenue,expenses
2024-01,50000,35000
2024-02,55000,38000
2024-03,60000,40000`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default DataUpload