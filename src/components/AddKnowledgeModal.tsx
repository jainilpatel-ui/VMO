import React, { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';
import { Contract } from '../data';

interface AddKnowledgeModalProps {
  contract: Contract;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AddKnowledgeModal({ contract, onClose, onConfirm }: AddKnowledgeModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const highRiskCount = contract.clauses.filter(c => c.risk === 'HIGH' || c.risk === 'CRITICAL').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 opacity-100">
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Add to Knowledge Base?</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            This will mark the contract as reviewed and store all its clauses in the standard clause library. 
            This action cannot be undone.
          </p>

          <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-5 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-1">{contract.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{contract.supplier}</p>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium">{contract.clauseCount} total clauses</span>
              {highRiskCount > 0 && (
                <span className="px-2.5 py-1 bg-red-100 text-red-800 rounded-full font-bold text-xs">
                  {highRiskCount} High Risk
                </span>
              )}
            </div>
          </div>

          <div className="w-full space-y-3">
            <button 
              onClick={onConfirm}
              className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold transition-colors shadow-sm"
            >
              Yes, Add to Knowledge
            </button>
            <button 
              onClick={onClose}
              className="w-full py-3 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
