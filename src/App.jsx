import React, { useState } from 'react'
import Dashboard from './components/Dashboard'
import DataUpload from './components/DataUpload'
import BusinessContext from './components/BusinessContext'
import { Building2 } from 'lucide-react'

function App() {
  const [step, setStep] = useState(1)
  const [financialData, setFinancialData] = useState(null)
  const [businessContext, setBusinessContext] = useState(null)

  const handleDataUpload = (data) => {
    setFinancialData(data)
    setStep(2)
  }

  const handleContextSubmit = (context) => {
    setBusinessContext(context)
    setStep(3)
  }

  const handleReset = () => {
    setStep(1)
    setFinancialData(null)
    setBusinessContext(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <nav style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Building2 size={32} color="#667eea" />
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a202c' }}>C-FOX</h1>
              <p style={{ fontSize: '0.75rem', color: '#718096' }}>AI CFO Copilot</p>
            </div>
          </div>
          {step === 3 && (
            <button onClick={handleReset} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              Start Over
            </button>
          )}
        </div>
      </nav>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {step === 1 && <DataUpload onDataUpload={handleDataUpload} />}
        {step === 2 && <BusinessContext onSubmit={handleContextSubmit} />}
        {step === 3 && (
          <Dashboard 
            financialData={financialData} 
            businessContext={businessContext}
          />
        )}
      </main>
    </div>
  )
}

export default App