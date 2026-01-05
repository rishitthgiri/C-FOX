import React, { useState } from 'react'
import { PlayCircle, TrendingUp } from 'lucide-react'

function ScenarioBuilder({ financialData, businessContext, metrics }) {
  const [scenario, setScenario] = useState({
    newHires: 0,
    salaryPerHire: 80000,
    revenueIncrease: 0,
    expenseIncrease: 0
  })
  const [result, setResult] = useState(null)

  const calculateScenario = () => {
    const monthlyHireCost = (scenario.newHires * scenario.salaryPerHire) / 12
    const newMonthlyExpenses = metrics.avgExpenses + monthlyHireCost + scenario.expenseIncrease
    const newMonthlyRevenue = metrics.avgRevenue + scenario.revenueIncrease
    const newBurnRate = newMonthlyExpenses - newMonthlyRevenue
    const newRunway = newBurnRate > 0 ? businessContext.currentCash / newBurnRate : 999

    setResult({
      newBurnRate,
      newRunway,
      monthlyHireCost,
      newMonthlyExpenses,
      newMonthlyRevenue,
      runwayChange: newRunway - metrics.runway,
      burnRateChange: newBurnRate - metrics.burnRate
    })
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="card">
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
        What-If Scenario Analysis
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h4 style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#2d3748' }}>
            Scenario Parameters
          </h4>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                New Hires
              </label>
              <input
                type="number"
                value={scenario.newHires}
                onChange={(e) => setScenario(prev => ({ ...prev, newHires: parseInt(e.target.value) || 0 }))}
                min="0"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                Annual Salary per Hire ($)
              </label>
              <input
                type="number"
                value={scenario.salaryPerHire}
                onChange={(e) => setScenario(prev => ({ ...prev, salaryPerHire: parseInt(e.target.value) || 0 }))}
                min="0"
                step="5000"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                Monthly Revenue Increase ($)
              </label>
              <input
                type="number"
                value={scenario.revenueIncrease}
                onChange={(e) => setScenario(prev => ({ ...prev, revenueIncrease: parseInt(e.target.value) || 0 }))}
                step="1000"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                Other Monthly Expense Increase ($)
              </label>
              <input
                type="number"
                value={scenario.expenseIncrease}
                onChange={(e) => setScenario(prev => ({ ...prev, expenseIncrease: parseInt(e.target.value) || 0 }))}
                step="1000"
              />
            </div>

            <button
              onClick={calculateScenario}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '1rem'
              }}
            >
              <PlayCircle size={20} />
              Run Scenario
            </button>
          </div>
        </div>

        <div>
          <h4 style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#2d3748' }}>
            Projected Impact
          </h4>

          {result ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{
                background: '#f7fafc',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '2px solid #e2e8f0'
              }}>
                <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  New Monthly Burn Rate
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2d3748' }}>
                  {formatCurrency(result.newBurnRate)}
                </p>
                <p style={{
                  fontSize: '0.85rem',
                  color: result.burnRateChange > 0 ? '#e53e3e' : '#48bb78',
                  marginTop: '0.5rem'
                }}>
                  {result.burnRateChange > 0 ? '+' : ''}{formatCurrency(result.burnRateChange)} change
                </p>
              </div>

              <div style={{
                background: '#f7fafc',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '2px solid #e2e8f0'
              }}>
                <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  New Cash Runway
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2d3748' }}>
                  {result.newRunway > 100 ? '100+' : result.newRunway.toFixed(1)} months
                </p>
                <p style={{
                  fontSize: '0.85rem',
                  color: result.runwayChange < 0 ? '#e53e3e' : '#48bb78',
                  marginTop: '0.5rem'
                }}>
                  {result.runwayChange > 0 ? '+' : ''}{result.runwayChange.toFixed(1)} months change
                </p>
              </div>

              <div style={{
                background: '#edf2f7',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem'
              }}>
                <h5 style={{ fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                  Breakdown
                </h5>
                <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#718096' }}>New Monthly Revenue:</span>
                    <span style={{ fontWeight: '600' }}>{formatCurrency(result.newMonthlyRevenue)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#718096' }}>New Monthly Expenses:</span>
                    <span style={{ fontWeight: '600' }}>{formatCurrency(result.newMonthlyExpenses)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#718096' }}>Hiring Cost:</span>
                    <span style={{ fontWeight: '600' }}>{formatCurrency(result.monthlyHireCost)}</span>
                  </div>
                </div>
              </div>

              {result.newRunway < 6 && (
                <div style={{
                  background: '#fff5f5',
                  border: '2px solid #fc8181',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginTop: '1rem'
                }}>
                  <p style={{ color: '#c53030', fontSize: '0.9rem', fontWeight: '600' }}>
                    ⚠️ Warning: This scenario reduces runway below 6 months
                  </p>
                </div>
              )}

              {result.newRunway >= metrics.runway && result.newBurnRate < metrics.burnRate && (
                <div style={{
                  background: '#f0fff4',
                  border: '2px solid #9ae6b4',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginTop: '1rem'
                }}>
                  <p style={{ color: '#22543d', fontSize: '0.9rem', fontWeight: '600' }}>
                    ✓ This scenario improves your financial position
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#a0aec0',
              textAlign: 'center',
              padding: '2rem'
            }}>
              <div>
                <TrendingUp size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>Configure your scenario and click "Run Scenario" to see the projected impact</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScenarioBuilder