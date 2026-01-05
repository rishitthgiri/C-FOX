export function calculateMetrics(financialData, businessContext) {
    const sortedData = [...financialData].sort((a, b) => 
      new Date(a.month) - new Date(b.month)
    )
  
    const totalRevenue = sortedData.reduce((sum, row) => sum + row.revenue, 0)
    const totalExpenses = sortedData.reduce((sum, row) => sum + row.expenses, 0)
    const avgRevenue = totalRevenue / sortedData.length
    const avgExpenses = totalExpenses / sortedData.length
  
    const burnRate = avgExpenses - avgRevenue
    const runway = burnRate > 0 ? businessContext.currentCash / burnRate : 999
  
    let revenueGrowth = 0
    if (sortedData.length >= 2) {
      const lastMonth = sortedData[sortedData.length - 1].revenue
      const prevMonth = sortedData[sortedData.length - 2].revenue
      revenueGrowth = prevMonth > 0 ? ((lastMonth - prevMonth) / prevMonth) * 100 : 0
    }
  
    return {
      avgRevenue,
      avgExpenses,
      burnRate,
      runway,
      revenueGrowth,
      totalRevenue,
      totalExpenses
    }
  }