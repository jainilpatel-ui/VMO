import React, { useState } from 'react';
import { UploadCloud, FileText, ChevronRight } from 'lucide-react';
import { Contract } from '../data';

interface DashboardProps {
  contracts: Contract[];
  onSelectContract: (contract: Contract) => void;
}

export default function Dashboard({ contracts, onSelectContract }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'Pending Review' | 'In Knowledge Base'>('Pending Review');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleUpload = () => {
    setIsUploading(true);
    setUploadStatus('Extracting clauses...');
    setUploadProgress(30);

    setTimeout(() => {
      setUploadStatus('Generating AI insights...');
      setUploadProgress(70);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        // In a real app, we would add the new contract to the list here
        setActiveTab('Pending Review');
      }, 1500);
    }, 1500);
  };

  const filteredContracts = contracts.filter(c => c.status === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Contracts</h1>
        <button 
          onClick={handleUpload}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Upload Contract
        </button>
      </div>

      {/* Upload Area */}
      <div className="mb-10 border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={!isUploading ? handleUpload : undefined}>
        {isUploading ? (
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>{uploadStatus}</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-600 font-medium">Drag & drop your contract PDF here or click to browse</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('Pending Review')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'Pending Review'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Review
          </button>
          <button
            onClick={() => setActiveTab('In Knowledge Base')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'In Knowledge Base'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Knowledge Base
          </button>
        </nav>
      </div>

      {/* Contract List */}
      <div className="space-y-4">
        {filteredContracts.map(contract => (
          <div 
            key={contract.id} 
            onClick={() => onSelectContract(contract)}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center justify-between cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group border-l-4 hover:border-l-blue-600"
            style={{ borderLeftColor: 'transparent' }}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 p-3 rounded-lg text-gray-500">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{contract.name}</h3>
                <p className="text-sm text-gray-500">{contract.supplier}</p>
                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                  <span>Uploaded: {contract.uploadedDate}</span>
                  <span>•</span>
                  <span>{contract.pages} pages</span>
                  <span>•</span>
                  <span>{contract.clauseCount} clauses</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                contract.status === 'Pending Review' 
                  ? 'bg-orange-100 text-orange-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {contract.status}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </div>
        ))}
        {filteredContracts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No contracts found in this tab.
          </div>
        )}
      </div>
    </div>
  );
}
