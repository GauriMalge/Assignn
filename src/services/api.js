// API service for contract management
const BASE_URL = '';

// Fetch all contracts
export const fetchContracts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/contracts.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contracts = await response.json();
    return contracts;
  } catch (error) {
    console.error('Error fetching contracts:', error);
    throw new Error('Failed to fetch contracts');
  }
};

// Fetch contract details by ID
export const fetchContractDetails = async (contractId) => {
  try {
    const response = await fetch(`${BASE_URL}/contracts/${contractId}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contractDetails = await response.json();
    return contractDetails;
  } catch (error) {
    console.error(`Error fetching contract details for ${contractId}:`, error);
    throw new Error(`Failed to fetch contract details for ${contractId}`);
  }
};

// Convert risk level to numeric score for filtering
export const getRiskScore = (riskLevel) => {
  switch (riskLevel) {
    case 'Low': return 25;
    case 'Medium': return 60;
    case 'High': return 85;
    default: return 50;
  }
};

// Convert numeric score back to risk level
export const getRiskLevel = (score) => {
  if (score < 40) return 'Low';
  if (score < 70) return 'Medium';
  return 'High';
};
