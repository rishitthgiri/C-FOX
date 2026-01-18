# C-FOX - AI CFO Copilot

AI-powered financial visibility and decision support platform for startups and small businesses.

![C-FOX Dashboard](https://img.shields.io/badge/Status-Active-success)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)

## Features

### Financial Management
- **Monthly revenue and expense tracking** with 5-column input system
  - Historical data (revenue, expenses)
  - Goal setting (target revenue, timeline)
- **Key financial metrics calculation** (burn rate, runway, cash flow)
- **AI-powered forecasting** with 12-month projections
- **Natural language financial Q&A** powered by Claude AI
- **What-if scenario analysis** for growth decisions
- **Multi-company support** - manage multiple businesses in one account

### User Experience
- **Dark/Light theme toggle** with persistent preferences
- **User authentication** with JWT tokens
- **Secure data storage** with MongoDB
- **Responsive design** with modern UI
- **Demo dataset** for quick testing

## Dashboard Views

1. **Overview** - Key metrics and financial health indicators
2. **Forecast** - 12-month financial projections with interactive charts
3. **AI Chat** - Ask questions about your finances in natural language
4. **Scenarios** - Run what-if analyses for hiring, scaling, and investments

## Technology Stack

### Frontend
- React 18
- Recharts for data visualization
- Lucide React for icons
- Vite for build tooling
- Papaparse for CSV parsing

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing
- Claude AI (Anthropic API) for financial insights

### Deployment Ready
- RESTful API architecture
- Environment-based configuration
- Production-ready error handling

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher)
- **npm** or **yarn**
- **Anthropic API Key** (for AI features)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/c-fox.git
cd c-fox
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Set Up MongoDB
```bash
# Start MongoDB service
# Windows: MongoDB starts automatically after installation
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Verify MongoDB is running
mongosh
```

### 5. Configure Environment Variables

Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cfox_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

**Important:** 
- Get your Anthropic API key from: https://console.anthropic.com/
- Change `JWT_SECRET` to a secure random string
- Never commit `.env` file to version control

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on `http://localhost:3000`

### Production Build
```bash
# Build frontend
npm run build

# Start backend in production
cd backend
npm start
```

## Project Structure
```
c-fox/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── financialController.js
│   │   └── aiController.js      # Claude AI integration
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Company.js           # Company schema
│   │   └── FinancialData.js     # Financial data schema
│   ├── routes/
│   │   ├── auth.js
│   │   ├── financial.js
│   │   └── ai.js
│   ├── utils/
│   │   ├── calculations.js      # Financial calculations
│   │   └── forecasting.js       # Forecast algorithms
│   ├── .env                     # Environment variables
│   ├── server.js                # Express server
│   └── package.json
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DataUpload.jsx
│   │   ├── BusinessContext.jsx
│   │   ├── MetricsPanel.jsx
│   │   ├── ForecastChart.jsx
│   │   ├── ChatInterface.jsx
│   │   ├── ScenarioBuilder.jsx
│   │   ├── CompanySelector.jsx
│   │   └── CompanyWorkflow.jsx
│   ├── context/
│   │   ├── AuthContext.jsx      # Authentication context
│   │   └── ThemeContext.jsx     # Theme management
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── utils/
│   │   ├── calculations.js
│   │   ├── forecasting.js
│   │   └── demoData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## CSV Data Format

C-FOX accepts CSV files with the following columns:
```csv
month,revenue,expenses,goalRevenue,timeline
2024-01,50000,35000,100000,Q2 2024
2024-02,55000,38000,100000,Q2 2024
2024-03,60000,40000,100000,Q2 2024
```

### Column Definitions:
- **month**: Format YYYY-MM (e.g., 2024-01)
- **revenue**: Monthly revenue in dollars
- **expenses**: Monthly expenses in dollars
- **goalRevenue**: Target revenue for scaling
- **timeline**: When to achieve the goal (e.g., "Q2 2024", "6 months")

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Companies
- `POST /api/financial/companies` - Create company
- `GET /api/financial/companies` - Get all user companies
- `GET /api/financial/companies/:id` - Get single company
- `PUT /api/financial/companies/:id` - Update company
- `DELETE /api/financial/companies/:id` - Delete company

### Financial Data
- `POST /api/financial/upload` - Upload financial data
- `GET /api/financial/metrics/:id` - Get calculated metrics
- `GET /api/financial/forecast/:id` - Get forecast data

### AI
- `POST /api/ai/ask` - Ask AI financial questions

## Theme System

C-FOX includes a built-in dark/light theme toggle:
- Click the sun/moon icon in the navbar
- Theme preference is saved in localStorage
- All components automatically adapt to the selected theme

## Testing with Demo Data

1. Click "Use Demo Data" on the data upload screen
2. This loads 12 months of sample financial data
3. Perfect for testing features without preparing a CSV

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Important Notes

- This is an **advisory tool** focused on visibility and forecasting
- **Not for accounting or compliance purposes**
- Always consult with financial professionals for important business decisions
- Keep your `.env` file secure and never commit it to version control

## Known Issues

- Large CSV files (10,000+ rows) may take time to process
- AI responses require active internet connection
- MongoDB must be running before starting the backend

## Future Enhancements

- [ ] Export reports to PDF
- [ ] Email notifications for runway alerts
- [ ] Integration with accounting software (QuickBooks, Xero)
- [ ] Team collaboration features
- [ ] Mobile app version
- [ ] Advanced ML-based forecasting models

## Contact

For questions or support, please open an issue on GitHub.

## Acknowledgments

- Claude AI by Anthropic for intelligent financial insights
- MongoDB for robust data storage
- React community for amazing tools and libraries

---

**Built with ❤️ for startups and small businesses**