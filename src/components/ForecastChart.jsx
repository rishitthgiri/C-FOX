import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function ForecastChart({ data }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="month" 
            stroke="#718096"
            style={{ fontSize: '0.85rem' }}
          />
          <YAxis 
            stroke="#718096"
            style={{ fontSize: '0.85rem' }}
            tickFormatter={formatCurrency}
          />
          <Tooltip 
            formatter={formatCurrency}
            contentStyle={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.07)'
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#48bb78" 
            strokeWidth={3}
            dot={{ fill: '#48bb78', r: 4 }}
            name="Revenue"
          />
          <Line 
            type="monotone" 
            dataKey="expenses" 
            stroke="#e53e3e" 
            strokeWidth={3}
            dot={{ fill: '#e53e3e', r: 4 }}
            name="Expenses"
          />
          <Line 
            type="monotone" 
            dataKey="cashBalance" 
            stroke="#667eea" 
            strokeWidth={3}
            dot={{ fill: '#667eea', r: 4 }}
            name="Cash Balance"
          />
        </LineChart>
      </ResponsiveContainer>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#f7fafc',
        borderRadius: '8px'
      }}>
        <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Forecast Insights</h4>
        <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem' }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <span style={{ color: '#48bb78', fontWeight: '700' }}>•</span>
            <span style={{ color: '#2d3748' }}>
              Revenue forecast based on historical growth patterns and target growth rate
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <span style={{ color: '#e53e3e', fontWeight: '700' }}>•</span>
            <span style={{ color: '#2d3748' }}>
              Expenses projected with modest scaling assumptions
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <span style={{ color: '#667eea', fontWeight: '700' }}>•</span>
            <span style={{ color: '#2d3748' }}>
              Cash balance shows projected runway based on current burn rate
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ForecastChart