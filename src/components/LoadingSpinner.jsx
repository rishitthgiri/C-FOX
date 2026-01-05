import React from 'react'

function LoadingSpinner() {
  return (
    <div style={{
      background: 'white',
      padding: '1rem',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    }}>
      <div className="animate-spin" style={{
        width: '20px',
        height: '20px',
        border: '3px solid #e2e8f0',
        borderTopColor: '#667eea',
        borderRadius: '50%'
      }} />
      <span style={{ color: '#718096' }}>Thinking...</span>
    </div>
  )
}

export default LoadingSpinner