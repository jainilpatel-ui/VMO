import React, { useState, useMemo } from 'react';
import { ArrowLeft, Sparkles, Eye, Search, Filter, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { Contract, Clause, RiskLevel } from '../data';

interface ReviewPageProps {
  contract: Contract;
  onBack: () => void;
  onAddKnowledge: () => void;
  onViewPdf: (clause: Clause) => void;
  onCompare: (clause: Clause) => void;
}

const RiskBadge = ({ risk }: { risk: RiskLevel }) => {
  const colors = {
    CRITICAL: 'bg-red-100 text-red-800',
    HIGH: 'bg-orange-100 text-orange-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    LOW: 'bg-gray-100 text-gray-800'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[risk]}`}>
      {risk}
    </span>
  );
};

export default function ReviewPage({ contract, onBack, onAddKnowledge, onViewPdf, onCompare }: ReviewPageProps) {
  const [activeClauseId, setActiveClauseId] = useState<string | null>(contract.clauses[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  React.useEffect(() => {
    setActiveClauseId(contract.clauses[0]?.id || null);
    setSearchQuery('');
    setCategoryFilter('All');
  }, [contract.id]);

  const categories = ['All', ...Array.from(new Set(contract.clauses.map(c => c.category)))];

  const filteredClauses = useMemo(() => {
    return contract.clauses.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [contract.clauses, searchQuery, categoryFilter]);

  const activeClause = contract.clauses.find(c => c.id === activeClauseId);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{contract.name}</h1>
            <p className="text-sm text-gray-500">{contract.supplier} • Uploaded {contract.uploadedDate}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            {contract.status === 'In Knowledge Base' ? 'Back' : 'Cancel'}
          </button>
          {contract.status !== 'In Knowledge Base' && (
            <button 
              onClick={onAddKnowledge}
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-medium flex items-center space-x-2 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Add to Knowledge</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column - Clause List */}
        <div className="w-[40%] bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 space-y-3 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search clauses..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg text-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {filteredClauses.map(clause => (
              <div 
                key={clause.id}
                onClick={() => setActiveClauseId(clause.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border-l-4 ${
                  activeClauseId === clause.id 
                    ? 'bg-blue-50 border-l-blue-600 shadow-sm' 
                    : 'bg-white border-l-transparent hover:bg-gray-50 border border-gray-100'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{clause.name}</h3>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onViewPdf(clause); }}
                    className="text-gray-400 hover:text-blue-600 p-1 rounded-md hover:bg-blue-100 transition-colors"
                    title="View in PDF"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                    {clause.category}
                  </span>
                  <RiskBadge risk={clause.risk} />
                  <span className="text-xs text-gray-500 font-medium">
                    {clause.partyObligated}
                  </span>
                </div>
              </div>
            ))}
            {filteredClauses.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No clauses found matching your criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Clause Detail */}
        <div className="w-[60%] p-6 overflow-y-auto">
          {activeClause ? (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Clause Info Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{activeClause.name}</h2>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <p className="font-medium text-gray-900">{activeClause.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Risk Level</p>
                    <RiskBadge risk={activeClause.risk} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Party Obligated</p>
                    <p className="font-medium text-gray-900">{activeClause.partyObligated}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Enforceable By</p>
                    <p className="font-medium text-gray-900">{activeClause.enforceableBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Obligation Type</p>
                    <p className="font-medium text-gray-900">{activeClause.obligationType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Deviation from Standard</p>
                    <p className="font-medium text-gray-900">{activeClause.deviation}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Description</p>
                  <p className="text-gray-800 leading-relaxed">{activeClause.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeClause.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {contract.status === 'In Knowledge Base' && (
                  <div className="mt-6 pt-6 border-t border-gray-200 flex items-center space-x-4">
                    <button 
                      onClick={() => onViewPdf(activeClause)}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View in PDF</span>
                    </button>
                  </div>
                )}
              </div>

              {/* AI Insights Card */}
              {contract.status !== 'In Knowledge Base' && (
                <div className="bg-[#F5F3FF] rounded-xl border border-purple-200 p-6 border-l-4 border-l-purple-600">
                  <div className="flex items-center space-x-2 mb-6">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-purple-900">AI Insights</h3>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {activeClause.similarity}% similar to standard clause
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        activeClause.status === 'ALIGNED' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {activeClause.status}
                      </span>
                    </div>
                    <div className="w-full bg-purple-100 rounded-full h-2.5 mb-2">
                      <div 
                        className={`h-2.5 rounded-full ${
                          activeClause.similarity >= 85 ? 'bg-green-500' : 
                          activeClause.similarity >= 60 ? 'bg-orange-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${activeClause.similarity}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">Standard Clause Match: {activeClause.name}</p>
                  </div>

                  {activeClause.recommendations.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Recommendations</h4>
                      <ul className="space-y-3">
                        {activeClause.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            {activeClause.status === 'ALIGNED' ? (
                              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            ) : (
                              <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                            )}
                            <span className="text-sm text-gray-800 leading-relaxed">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 pt-4 border-t border-purple-200">
                    <button 
                      onClick={() => onViewPdf(activeClause)}
                      className="flex items-center space-x-2 text-purple-700 hover:text-purple-900 font-medium text-sm transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View in PDF</span>
                    </button>
                    <button 
                      onClick={() => onCompare(activeClause)}
                      className="px-4 py-2 border border-purple-600 text-purple-700 rounded-lg hover:bg-purple-50 font-medium text-sm transition-colors"
                    >
                      Compare with Standard
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a clause from the left to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
