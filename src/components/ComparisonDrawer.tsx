import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertTriangle, Eye, FileText } from 'lucide-react';
import { Clause } from '../data';

interface ComparisonDrawerProps {
  clause: Clause;
  onClose: () => void;
}

export default function ComparisonDrawer({ clause, onClose }: ComparisonDrawerProps) {
  const [showPdfCompare, setShowPdfCompare] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="w-full bg-white h-full shadow-2xl flex flex-col transform transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {showPdfCompare ? 'PDF Comparison' : 'Clause Comparison'}
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              clause.similarity >= 85 ? 'bg-green-100 text-green-800' : 
              clause.similarity >= 60 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
            }`}>
              {clause.similarity}% Match
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowPdfCompare(!showPdfCompare)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title={showPdfCompare ? "View Text Comparison" : "Compare PDFs"}
            >
              {showPdfCompare ? <FileText className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 flex flex-col">
          {showPdfCompare ? (
            <div className="flex flex-1 gap-6">
              {/* Left PDF */}
              <div className="flex-1 bg-gray-100 rounded-xl shadow-inner border border-gray-200 flex flex-col overflow-hidden relative">
                <div className="bg-blue-600 text-white px-4 py-3 shrink-0 flex justify-between items-center">
                  <h3 className="font-semibold">Current Contract PDF</h3>
                  <span className="text-xs opacity-80">Page 12</span>
                </div>
                <div className="flex-1 overflow-y-auto p-8 relative">
                  <div className="max-w-2xl mx-auto bg-white shadow-md min-h-[800px] p-12">
                    <div className="space-y-6 text-gray-800 font-serif leading-relaxed">
                      <h3 className="text-xl font-bold mb-4">12. {clause.category}</h3>
                      <p>
                        This section outlines the obligations and responsibilities of both parties regarding {clause.category.toLowerCase()}. 
                        The Supplier agrees to adhere to all industry standard practices and the specific requirements detailed herein.
                      </p>
                      
                      <div className="relative group mt-8">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-yellow-400 rounded-full"></div>
                        <div className="bg-yellow-100/50 p-2 -mx-2 rounded">
                          <p className="font-medium mb-2">{clause.name}</p>
                          <p>{clause.text}</p>
                        </div>
                      </div>

                      <p className="mt-8">
                        Furthermore, any deviations from these standards must be approved in writing by the Buyer's authorized representative. 
                        Failure to comply may result in penalties as outlined in Section 15 (Remedies).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right PDF */}
              <div className="flex-1 bg-gray-100 rounded-xl shadow-inner border border-gray-200 flex flex-col overflow-hidden relative">
                <div className="bg-purple-600 text-white px-4 py-3 shrink-0 flex justify-between items-center">
                  <h3 className="font-semibold">Standard Template PDF</h3>
                  <span className="text-xs opacity-80">Page 8</span>
                </div>
                <div className="flex-1 overflow-y-auto p-8 relative">
                  <div className="max-w-2xl mx-auto bg-white shadow-md min-h-[800px] p-12">
                    <div className="space-y-6 text-gray-800 font-serif leading-relaxed">
                      <h3 className="text-xl font-bold mb-4">8. {clause.category}</h3>
                      <p>
                        This section outlines the standard obligations and responsibilities regarding {clause.category.toLowerCase()}. 
                        The Supplier agrees to adhere to all industry standard practices and the specific requirements detailed herein.
                      </p>
                      
                      <div className="relative group mt-8">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-purple-400 rounded-full"></div>
                        <div className="bg-purple-100/50 p-2 -mx-2 rounded">
                          <p className="font-medium mb-2">{clause.name}</p>
                          <p>{clause.standardText}</p>
                        </div>
                      </div>

                      <p className="mt-8">
                        Furthermore, any deviations from these standards must be approved in writing by the Buyer's authorized representative. 
                        Failure to comply may result in penalties as outlined in Section 15 (Remedies).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-1 gap-6 mb-8">
                {/* Left Panel - Current Clause */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                  <div className="bg-blue-600 text-white px-4 py-3 shrink-0">
                    <h3 className="font-semibold">Current Clause</h3>
                  </div>
                  <div className="p-6 flex-1 overflow-y-auto">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{clause.name}</h4>
                    <p className="text-sm text-gray-500 mb-6">LTIMindtree ADM Services SOW</p>
                    
                    <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
                      {/* Highlight key terms in blue */}
                      <p>
                        {clause.text.split(' ').map((word, i) => {
                          if (['Supplier', 'Buyer', 'warrants', 'intellectual', 'property', 'retains'].includes(word.replace(/[.,]/g, ''))) {
                            return <span key={i} className="bg-blue-100 text-blue-800 font-medium px-1 rounded mx-0.5">{word}</span>;
                          }
                          return word + ' ';
                        })}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">{clause.category}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">{clause.risk} Risk</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">{clause.obligationType}</span>
                    </div>
                  </div>
                </div>

                {/* Right Panel - Standard Clause */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                  <div className="bg-purple-600 text-white px-4 py-3 shrink-0">
                    <h3 className="font-semibold">Standard Clause (Knowledge Base)</h3>
                  </div>
                  <div className="p-6 flex-1 overflow-y-auto">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{clause.name}</h4>
                    <p className="text-sm text-gray-500 mb-6">Carrier Standard Template</p>
                    
                    <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
                      {/* Highlight key terms in purple, differences in orange */}
                      <p>
                        {clause.standardText.split(' ').map((word, i) => {
                          const cleanWord = word.replace(/[.,]/g, '');
                          if (['Buyer', 'Supplier', 'warrants', 'intellectual', 'property', 'retains'].includes(cleanWord)) {
                            return <span key={i} className="bg-purple-100 text-purple-800 font-medium px-1 rounded mx-0.5">{word}</span>;
                          }
                          if (!clause.text.includes(cleanWord) && cleanWord.length > 3) {
                            return <span key={i} className="bg-orange-100 text-orange-800 font-medium px-1 rounded mx-0.5">{word}</span>;
                          }
                          return word + ' ';
                        })}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">{clause.category}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">LOW Risk</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">{clause.obligationType}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diff Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 shrink-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Differences</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                      <tr>
                        <th className="py-3 px-4 w-1/4">Field</th>
                        <th className="py-3 px-4 w-3/8">Current Clause</th>
                        <th className="py-3 px-4 w-3/8">Standard Clause</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-900">Risk Level</td>
                        <td className="py-3 px-4 text-orange-600 font-medium">{clause.risk}</td>
                        <td className="py-3 px-4 text-green-600 font-medium">LOW</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-900">Deviation</td>
                        <td className="py-3 px-4 text-gray-700">{clause.deviation}</td>
                        <td className="py-3 px-4 text-gray-700">Standard</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-900">Obligation Type</td>
                        <td className="py-3 px-4 text-gray-700">{clause.obligationType}</td>
                        <td className="py-3 px-4 text-gray-700">{clause.obligationType}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-900">Recommendation</td>
                        <td colSpan={2} className="py-3 px-4">
                          {clause.recommendations.length > 0 ? (
                            <ul className="space-y-1">
                              {clause.recommendations.map((rec, idx) => (
                                <li key={idx} className="flex items-start space-x-2 text-gray-700">
                                  <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="flex items-center space-x-2 text-green-700">
                              <CheckCircle className="w-4 h-4 shrink-0" />
                              <span>Clause is aligned with standards. No action needed.</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
