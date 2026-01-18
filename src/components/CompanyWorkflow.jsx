import React, { useState, useEffect } from 'react';
import { companyAPI } from '../services/api';
import DataUpload from './DataUpload';
import BusinessContext from './BusinessContext';
import Dashboard from './Dashboard';
import { ArrowLeft } from 'lucide-react';

function CompanyWorkflow({ companyId, isNew, onBack }) {
  const [step, setStep] = useState(isNew ? 1 : 3);
  const [financialData, setFinancialData] = useState(null);
  const [businessContext, setBusinessContext] = useState(null);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (companyId && !isNew) {
      loadCompanyData();
    }
  }, [companyId, isNew]);

  const loadCompanyData = async () => {
    try {
      const data = await companyAPI.getById(companyId);
      setBusinessContext({
        id: data.company._id,
        companyName: data.company.companyName,
        stage: data.company.stage,
        teamSize: data.company.teamSize,
        currentCash: data.company.currentCash,
        growthTarget: data.company.growthTarget,
        industry: data.company.industry
      });
      setFinancialData(data.financialData);
      setLoading(false);
    } catch (error) {
      alert('Failed to load company data: ' + error.message);
      onBack();
    }
  };

  const handleDataUpload = (data) => {
    setFinancialData(data);
    setStep(2);
  };

  const handleContextSubmit = async (context) => {
    try {
      let companyData;
      
      if (isNew) {
        const result = await companyAPI.create(context);
        companyData = result.company;
      } else {
        const result = await companyAPI.update(companyId, context);
        companyData = result.company;
      }

      await companyAPI.uploadFinancialData(companyData._id, financialData);

      setBusinessContext({
        id: companyData._id,
        ...context
      });
      setStep(3);
    } catch (error) {
      alert('Failed to save company: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <div className="animate-spin" style={{
          width: '48px',
          height: '48px',
          border: '4px solid rgba(255,255,255,0.3)',
          borderTopColor: 'white',
          borderRadius: '50%',
          margin: '0 auto'
        }} />
        <p style={{ color: 'white', marginTop: '1rem' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {step < 3 && (
        <button
          onClick={onBack}
          className="btn-secondary"
          style={{
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <ArrowLeft size={18} />
          Back to Companies
        </button>
      )}

      {step === 1 && <DataUpload onDataUpload={handleDataUpload} />}
      {step === 2 && (
        <BusinessContext
          onSubmit={handleContextSubmit}
          initialData={businessContext}
        />
      )}
      {step === 3 && (
        <Dashboard
          companyId={businessContext.id}
          financialData={financialData}
          businessContext={businessContext}
          onBack={onBack}
        />
      )}
    </div>
  );
}

export default CompanyWorkflow;