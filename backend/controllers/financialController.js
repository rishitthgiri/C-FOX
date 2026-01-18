const Company = require('../models/Company');
const FinancialData = require('../models/FinancialData');
const { calculateMetrics } = require('../utils/calculations');
const { generateForecast } = require('../utils/forecasting');
const mongoose = require('mongoose');

exports.createCompany = async (req, res) => {
  try {
    const company = new Company({
      userId: req.userId,
      ...req.body
    });
    await company.save();
    res.status(201).json({ company });
  } catch (error) {
    console.error('Create company error:', error);
    res.status(500).json({ error: 'Failed to create company' });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ companies });
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({ error: 'Failed to get companies' });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    if (company.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const financialData = await FinancialData.find({ companyId: req.params.id }).sort({ month: 1 });

    res.json({ company, financialData });
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({ error: 'Failed to get company' });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    if (company.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    Object.assign(company, req.body);
    await company.save();

    res.json({ company });
  } catch (error) {
    console.error('Update company error:', error);
    res.status(500).json({ error: 'Failed to update company' });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    if (company.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await FinancialData.deleteMany({ companyId: req.params.id });
    await Company.findByIdAndDelete(req.params.id);

    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Delete company error:', error);
    res.status(500).json({ error: 'Failed to delete company' });
  }
};

exports.uploadFinancialData = async (req, res) => {
  try {
    const { companyId, data } = req.body;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    if (company.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await FinancialData.deleteMany({ companyId });

    const financialDataDocs = data.map(item => ({
      companyId,
      month: item.month,
      revenue: item.revenue,
      expenses: item.expenses,
      goalRevenue: item.goalRevenue,
      timeline: item.timeline
    }));

    await FinancialData.insertMany(financialDataDocs);

    res.json({ message: 'Financial data uploaded successfully' });
  } catch (error) {
    console.error('Upload financial data error:', error);
    res.status(500).json({ error: 'Failed to upload financial data' });
  }
};

exports.getMetrics = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    if (company.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const financialData = await FinancialData.find({ companyId: req.params.id }).sort({ month: 1 });

    if (financialData.length === 0) {
      return res.status(400).json({ error: 'No financial data available' });
    }

    const businessContext = {
      currentCash: company.currentCash,
      growthTarget: company.growthTarget
    };

    const metrics = calculateMetrics(financialData, businessContext);
    res.json({ metrics });
  } catch (error) {
    console.error('Get metrics error:', error);
    res.status(500).json({ error: 'Failed to calculate metrics' });
  }
};

exports.getForecast = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    if (company.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const financialData = await FinancialData.find({ companyId: req.params.id }).sort({ month: 1 });

    if (financialData.length === 0) {
      return res.status(400).json({ error: 'No financial data available' });
    }

    const businessContext = {
      currentCash: company.currentCash,
      growthTarget: company.growthTarget
    };

    const forecast = generateForecast(financialData, businessContext);
    res.json({ forecast });
  } catch (error) {
    console.error('Get forecast error:', error);
    res.status(500).json({ error: 'Failed to generate forecast' });
  }
};