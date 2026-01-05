import React from 'react'
import { TrendingUp, TrendingDown, DollarSign, Calendar, Users, AlertCircle } from 'lucide-react'

function MetricsPanel({ metrics, businessContext }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value)
  }

  const metricCards = [
    {
      title: 'Monthly Burn Rate',
      value: formatCurrency(metrics.burnRate),
      icon: TrendingDown,
      color: '#e53e3e',
      description: 'Average monthly cash spend'
    },
    {
      title: 'Cash Runway',
      value: `${formatNumber(metrics.runway)} months`,
      icon: Calendar,
      color: metrics.runway < 6 ? '#e53e3e' : metrics.runway < 12 ? '#ed8936' : '#48bb78',
      description: 'Months until cash depletion'
    },
    {
      title: 'Current Cash',
      value: formatCurrency(businessContext.currentCash),
      icon: DollarSign,
      color: '#667eea',
      description: 'Available cash balance'
    },
    {
      title: 'Revenue Growth',
      value: `${formatNumber(metrics.revenueGrowth)}%`,
      icon: TrendingUp,
      color: metrics.revenueGrowth > 0 ? '#48bb78' : '#e53e3e',
      description: 'Month-over-month growth'
    },
    {
      title: 'Avg Monthly Revenue',
      value: formatCurrency(metrics.avgRevenue),
      icon: DollarSign,
      color: '#38b2ac',
      description: 'Average across all months'
    },
    {
      title: 'Avg Monthly Expenses',
      value: formatCurrency(metrics.avgExpenses),
      icon: Users,
      color: '#ed8936',
      description: 'Average operating costs'
    }
  ]

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {metricCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="metric-card">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <p style={{ color: '#718096', fontSize: '0.9rem', fontWeight: '500' }}>
                    {card.title}
                  </p>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: card.color, marginTop: '0.5rem' }}>
                    {card.value}
                  </h3>
                </div>
                <div style={{
                  background: `${card.color}15`,
                  padding: '0.75rem',
                  borderRadius: '10px'
                }}>
                  <Icon size={24} color={card.color} />
                </div>
              </div>
              <p style={{ color: '#a0aec0', fontSize: '0.85rem' }}>
                {card.description}
              </p>
            </div>
          )
        })}
      </div>

      {metrics.runway < 6 && (
        <div style={{
          background: '#fff5f5',
          border: '2px solid #fc8181',
          borderRadius: '12px',
          padding: '1.5rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start'
        }}>
          <AlertCircle size={24} color="#e53e3e" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
          <div>
            <h4 style={{ fontWeight: '700', color: '#c53030', marginBottom: '0.5rem' }}>
              Critical Runway Alert
            </h4>
            <p style={{ color: '#742a2a', lineHeight: '1.6' }}>
              Your current cash runway is less than 6 months. Consider reducing expenses, accelerating revenue growth, or securing additional funding to extend your runway.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MetricsPanel