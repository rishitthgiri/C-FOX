exports.askQuestion = async (req, res) => {
  try {
    const { question, financialData, businessContext, metrics, forecast } = req.body;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('GROQ_API_KEY is not set in environment variables');
      return res.status(500).json({ error: 'AI service is not configured. Please contact support.' });
    }

    const context = `You are an AI CFO assistant for ${businessContext.companyName}, a ${businessContext.stage} stage ${businessContext.industry} company.

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

User Question: ${question}`;

    console.log('Sending request to Groq AI...');

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a professional CFO assistant specializing in startup financial analysis. Provide clear, actionable advice.'
          },
          {
            role: 'user',
            content: context
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API error:', errorData);
      
      if (response.status === 401) {
        return res.status(500).json({ error: 'AI service authentication failed. Please check API key configuration.' });
      }
      if (response.status === 429) {
        return res.status(429).json({ error: 'Too many requests. Please try again in a moment.' });
      }
      
      return res.status(500).json({ error: 'AI service error. Please try again later.' });
    }

    const data = await response.json();
    console.log('Groq AI response received successfully');
    
    res.json({ answer: data.choices[0].message.content });
  } catch (error) {
    console.error('Ask AI error:', error.message);
    res.status(500).json({ error: 'Failed to get AI response. Please try again.' });
  }
};