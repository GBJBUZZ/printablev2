import React from 'react';

interface ActivityItem {
  icon: string;
  description: string;
  date: string;
  color: string;
}

const activities: ActivityItem[] = [
  {
    icon: 'upload-icon.png',
    description: 'You uploaded Invoice–April2023.pdf',
    date: 'Oct 15, 2023',
    color: '#a7f3d0',
  },
  {
    icon: 'share-icon.png',
    description: 'You shared Business_Proposal.docx',
    date: 'Oct 10, 2023',
    color: '#bfdbfe',
  },
  {
    icon: 'download-icon.png',
    description: 'John Doe downloaded Report_Q1.pdf',
    date: 'Oct 5, 2023',
    color: '#e9d5ff',
  },
  {
    icon: 'edit-icon.png',
    description: 'You edited Marketing_Plan.pptx',
    date: 'Sep 28, 2023',
    color: '#fed7aa',
  },
];

const RecentActivity: React.FC = () => {
  return (
    <div 
    style={{
        height: "335px",
        width: "431px",
        backgroundColor: "#E6E6ED", // Gray background
    }}
    className="w-80 bg-white p-4 mt-6 rounded-xl shadow-md font-sans">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center gap-3 py-2 border-b last:border-b-0 border-gray-200">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: activity.color }}>
            <img src={activity.icon} alt="icon" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <p className="text-sm text-gray-900">{activity.description}</p>
            <p className="text-xs text-gray-500">{activity.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
