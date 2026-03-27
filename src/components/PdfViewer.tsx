import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Clause } from '../data';

interface PdfViewerProps {
  clause: Clause;
  onClose: () => void;
}

export default function PdfViewer({ clause, onClose }: PdfViewerProps) {
  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="w-[80%] bg-white h-full shadow-2xl flex flex-col transform transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Contract PDF Viewer</h2>
            <p className="text-sm text-gray-500">Page 12 of 400</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content (Mock PDF Viewer) */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-8 relative">
          <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-[1000px] p-16 relative">
            {/* Mock PDF Content */}
            <div className="space-y-6 text-gray-800 font-serif leading-relaxed">
              <h3 className="text-xl font-bold mb-4">12. {clause.category}</h3>
              <p>
                This section outlines the obligations and responsibilities of both parties regarding {clause.category.toLowerCase()}. 
                The Supplier agrees to adhere to all industry standard practices and the specific requirements detailed herein.
              </p>
              
              {/* Highlighted Clause */}
              <div className="relative group mt-8">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-yellow-400 rounded-full"></div>
                <div className="bg-yellow-100/50 p-2 -mx-2 rounded">
                  <p className="font-medium mb-2">{clause.name}</p>
                  <p>{clause.text}</p>
                </div>
                
                {/* Tooltip */}
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Selected clause: {clause.name}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>

              <p className="mt-8">
                Furthermore, any deviations from these standards must be approved in writing by the Buyer's authorized representative. 
                Failure to comply may result in penalties as outlined in Section 15 (Remedies).
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-white border-t border-gray-200 px-6 py-3 flex justify-center items-center space-x-6 shrink-0">
          <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-gray-700">Page 12 / 400</span>
          <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
