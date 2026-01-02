import React from 'react';

interface StorageBarProps {
  label: string;
  percentage: number;
  color: string;
}

const StorageBar: React.FC<StorageBarProps> = ({ label, percentage, color }) => (
  <div className="mb-3">
    <div className="flex justify-between text-sm text-gray-600 mb-1">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="w-full h-2 bg-white rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: color }} />
    </div>
  </div>
);

const CloudStorage: React.FC = () => {
  return (
    <div
    style={{
        height: "435px",
        width: "431px",
        backgroundColor: "#E6E6ED", // Gray background
    }}
    className="w-80 bg-white p-4 rounded-xl shadow-md font-sans">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Cloud Storage</h2>
        <button className="text-sm font-medium text-blue-600 border border-blue-600 px-2 py-1 rounded-md hover:bg-blue-50 transition">
          Upgrade
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-1">3.5 GB of 5 GB used</p>
      <div className="w-full h-2 bg-white rounded-full overflow-hidden">
        <div className="h-full bg-blue-900 rounded-full" style={{ width: '62%' }} />
      </div>
      <p className="text-right text-xs text-gray-500 mt-1 mb-3">62%</p>

      <StorageBar label="PDF" percentage={60} color="#f87171" />
      <StorageBar label="DOCX" percentage={35} color="#93c5fd" />
      <StorageBar label="PPTX" percentage={22} color="#fde68a" />
      <StorageBar label="XLSX" percentage={45} color="#86efac" />
      <StorageBar label="IMAGE & VIDEO" percentage={88} color="#67e8f9" />
    </div>
  );
};

export default CloudStorage;
