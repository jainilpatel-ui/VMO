/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ReviewPage from './components/ReviewPage';
import PdfViewer from './components/PdfViewer';
import ComparisonDrawer from './components/ComparisonDrawer';
import AddKnowledgeModal from './components/AddKnowledgeModal';
import { dummyContracts, Contract, Clause } from './data';
import { CheckCircle } from 'lucide-react';

export default function App() {
  const [contracts, setContracts] = useState<Contract[]>(dummyContracts);
  const [activeContract, setActiveContract] = useState<Contract | null>(null);
  const [viewingPdfClause, setViewingPdfClause] = useState<Clause | null>(null);
  const [comparingClause, setComparingClause] = useState<Clause | null>(null);
  const [showAddKnowledgeModal, setShowAddKnowledgeModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectContract = (contract: Contract) => {
    setActiveContract(contract);
  };

  const handleBackToDashboard = () => {
    setActiveContract(null);
  };

  const handleAddKnowledgeConfirm = () => {
    if (activeContract) {
      setContracts(prev => prev.map(c => 
        c.id === activeContract.id 
          ? { ...c, status: 'In Knowledge Base' } 
          : c
      ));
      setShowAddKnowledgeModal(false);
      setActiveContract(null);
      showToast('Contract added to Knowledge Base');
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="text-xl font-semibold tracking-tight text-gray-900">VMO Clause Intelligence</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">Sarah Jenkins</p>
            <p className="text-xs text-gray-500">Contract Manager</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border-2 border-white shadow-sm">
            SJ
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="h-[calc(100vh-64px)] overflow-hidden">
        {activeContract ? (
          <ReviewPage 
            contract={activeContract} 
            onBack={handleBackToDashboard}
            onAddKnowledge={() => setShowAddKnowledgeModal(true)}
            onViewPdf={setViewingPdfClause}
            onCompare={setComparingClause}
          />
        ) : (
          <div className="h-full overflow-y-auto">
            <Dashboard 
              contracts={contracts} 
              onSelectContract={handleSelectContract} 
            />
          </div>
        )}
      </main>

      {/* Overlays */}
      {viewingPdfClause && (
        <PdfViewer 
          clause={viewingPdfClause} 
          onClose={() => setViewingPdfClause(null)} 
        />
      )}

      {comparingClause && (
        <ComparisonDrawer 
          clause={comparingClause} 
          onClose={() => setComparingClause(null)} 
        />
      )}

      {showAddKnowledgeModal && activeContract && (
        <AddKnowledgeModal 
          contract={activeContract} 
          onClose={() => setShowAddKnowledgeModal(false)}
          onConfirm={handleAddKnowledgeConfirm}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
