export function generateForecast(financialData, businessContext) {
    const sortedData = [...financialData].sort((a, b) => 
      new Date(a.month) - new Date(b.month)
    )
  
    const lastMonth = sortedData[sortedData.length - 1]
    const avgRevenue = sortedData.reduce((sum, row) => sum + row.revenue, 0) / sortedData.length
    const avgExpenses = sortedData.reduce((sum, row) => sum + row.expenses, 0) / sortedData.length
  
    const monthlyGrowthRate = businessContext.growthTarget / 100
    const expenseGrowthRate = 0.05
  
    const forecast = []
    let currentCash = businessContext.currentCash
    let projectedRevenue = lastMonth.revenue
    let projectedExpenses = lastMonth.expenses
  
    const lastDate = new Date(lastMonth.month)
  
    for (let i = 1; i <= 12; i++) {
      const forecastDate = new Date(lastDate)
      forecastDate.setMonth(forecastDate.getMonth() + i)
      const monthStr = forecastDate.toISOString().slice(0, 7)
  
      projectedRevenue = projectedRevenue * (1 + monthlyGrowthRate)
      projectedExpenses = projectedExpenses * (1 + expenseGrowthRate)
  
      const cashFlow = projectedRevenue - projectedExpenses
      currentCash += cashFlow
  
      forecast.push({
        month: monthStr,
        revenue: Math.round(projectedRevenue),
        expenses: Math.round(projectedExpenses),
        cashBalance: Math.round(currentCash)
      })
    }
  
    return forecast
  }