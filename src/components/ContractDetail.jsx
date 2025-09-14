import React, { useState, useEffect } from 'react';
import { fetchContractDetails } from '../services/api';

const ContractDetail = ({ contractId, onBack }) => {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEvidenceDrawer, setShowEvidenceDrawer] = useState(false);

  useEffect(() => {
    const loadContractDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchContractDetails(contractId);
        setContract(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch contract details');
        console.error('Error loading contract details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (contractId) {
      loadContractDetails();
    }
  }, [contractId]);

  const getRiskBadgeColor = (risk) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (risk) => {
    switch (risk) {
      case 'Low': return '🟢';
      case 'Medium': return '🟡';
      case 'High': return '🔴';
      default: return '⚪';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getRelevanceColor = (relevance) => {
    if (relevance >= 0.8) return 'bg-green-100 text-green-800';
    if (relevance >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contract details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Contract</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex space-x-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!contract) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Contracts
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                Export
              </button>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                Edit Contract
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contract Metadata */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{contract.name}</h1>
                  <p className="text-lg text-gray-600">{contract.parties}</p>
                </div>
                <div className="flex space-x-3">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getRiskBadgeColor(contract.status)}`}>
                    {contract.status}
                  </span>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getRiskBadgeColor(contract.risk)}`}>
                    {contract.risk} Risk
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Start Date</h3>
                  <p className="text-lg font-semibold text-gray-900">{contract.start}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Expiry Date</h3>
                  <p className="text-lg font-semibold text-gray-900">{contract.expiry}</p>
                </div>
              </div>
            </div>

            {/* Clauses Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Clauses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contract.clauses.map((clause, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{clause.title}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConfidenceColor(clause.confidence)}`}>
                        {Math.round(clause.confidence * 100)}% confidence
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{clause.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Insights & Recommendations</h2>
              <div className="space-y-4">
                {contract.insights.map((insight, index) => (
                  <div key={index} className={`border-l-4 ${getRiskBadgeColor(insight.risk).split(' ')[0]} bg-gray-50 p-4 rounded-r-lg`}>
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{getSeverityIcon(insight.risk)}</span>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskBadgeColor(insight.risk)}`}>
                            {insight.risk} Risk
                          </span>
                        </div>
                        <p className="text-gray-800">{insight.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Evidence Panel Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Supporting Evidence</h3>
                  <button
                    onClick={() => setShowEvidenceDrawer(!showEvidenceDrawer)}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  >
                    {showEvidenceDrawer ? 'Hide' : 'View All'}
                  </button>
                </div>
                
                {showEvidenceDrawer ? (
                  <div className="space-y-4">
                    {contract.evidence.map((evidence, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm">{evidence.source}</h4>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRelevanceColor(evidence.relevance)}`}>
                            {Math.round(evidence.relevance * 100)}% relevance
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm italic leading-relaxed">"{evidence.snippet}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-2">📄</div>
                    <p className="text-gray-600 text-sm">
                      {contract.evidence.length} evidence items available
                    </p>
                    <button
                      onClick={() => setShowEvidenceDrawer(true)}
                      className="mt-3 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    >
                      View Evidence
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetail;
