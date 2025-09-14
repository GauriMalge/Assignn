import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ContractsTable from '../components/ContractsTable';
import ContractDetail from './ContractDetail';

const Dashboard = ({ username, onLogout }) => {
  const [activeTab, setActiveTab] = useState('contracts');
  const [selectedContractId, setSelectedContractId] = useState(null);

  const handleContractSelect = (contractId) => {
    setSelectedContractId(contractId);
  };

  const handleBackToContracts = () => {
    setSelectedContractId(null);
  };

  // If a contract is selected, show the detail page
  if (selectedContractId) {
    return (
      <ContractDetail
        contractId={selectedContractId}
        onBack={handleBackToContracts}
      />
    );
  }

  const renderMainContent = () => {
    switch (activeTab) {
      case 'contracts':
        return <ContractsTable onContractSelect={handleContractSelect} />;
      case 'insights':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Insights Coming Soon</h3>
              <p className="text-gray-600">Analytics and insights will be available here.</p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">📈</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reports Coming Soon</h3>
              <p className="text-gray-600">Generate and download reports here.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">⚙️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings Coming Soon</h3>
              <p className="text-gray-600">Configure your account settings here.</p>
            </div>
          </div>
        );
      default:
        return <ContractsTable onContractSelect={handleContractSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar username={username} onLogout={onLogout} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
