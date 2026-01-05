export async function askAI(question, financialData, businessContext, metrics, forecast) {
    const context = `
  You are an AI CFO assistant for ${businessContext.companyName}, a ${businessContext.stage} stage ${businessContext.industry} company.
  
  CURRENT FINANCIAL STATUS:
  - Current Cash: $${businessContext.currentCash.toLocaleString()}
  - Average Monthly Revenue: $${metrics.avgRevenue.toLocaleString()}
  - Average Monthly Expenses: $${metrics.avgExpenses.toLocaleString()}
  - Monthly Burn Rate: $${metrics.burnRate.toLocaleString()}
  - Cash Runway: ${metrics.runway.toFixed(1)} months
  - Recent Revenue Growth: ${metrics.revenueGrowth.toFixed(1)}%
  - Team Size: ${businessContext.teamSize} people
  - Growth Target: ${businessContext.growthTarget}% monthly
  
  HISTORICAL DATA:
  ${financialData.map(d => `${d.month}: Revenue $${d.revenue.toLocaleString()}, Expenses $${d.expenses.toLocaleString()}`).join('\n')}
  
  Please provide clear, actionable financial advice in plain English. Be direct and specific with numbers. Format your response in a conversational way without excessive bullet points.
  
  User Question: ${question}
  `
  
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            { role: 'user', content: context }
          ]
        })
      })
  
      const data = await response.json()
      return data.content[0].text
    } catch (error) {
      console.error('AI Service Error:', error)
      throw error
    }
  }