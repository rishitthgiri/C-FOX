import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { aiAPI } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

function ChatInterface({ financialData, businessContext, metrics, forecast }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I'm your AI CFO assistant. I can help you understand your finances, forecast outcomes, and make informed decisions. Try asking me questions like:

- Can we afford to hire 2 more engineers?
- What happens if revenue grows 30% next quarter?
- When should we start fundraising?
- How can we extend our runway?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiAPI.ask(input, financialData, businessContext, metrics, forecast);
      setMessages(prev => [...prev, { role: 'assistant', content: response.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error processing your request. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="card" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
        Ask Your AI CFO
      </h3>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '1.5rem',
        padding: '1rem',
        background: '#f7fafc',
        borderRadius: '8px'
      }}
      className="scrollbar-thin">
        {messages.map((msg, index) => (
          <div key={index} style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1.5rem',
            alignItems: 'flex-start'
          }}>
            <div style={{
              background: msg.role === 'assistant' ? '#667eea' : '#48bb78',
              padding: '0.5rem',
              borderRadius: '8px',
              flexShrink: 0
            }}>
              {msg.role === 'assistant' ? (
                <Bot size={20} color="white" />
              ) : (
                <User size={20} color="white" />
              )}
            </div>
            <div style={{
              flex: 1,
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#2d3748' }}>
                {msg.content}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              background: '#667eea',
              padding: '0.5rem',
              borderRadius: '8px'
            }}>
              <Bot size={20} color="white" />
            </div>
            <LoadingSpinner />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a financial question..."
          rows={3}
          disabled={loading}
          style={{ flex: 1, resize: 'none' }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="btn-primary"
          style={{
            padding: '1rem',
            height: 'fit-content'
          }}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;