import React from "react";
import CloudStorage from "@/components/docs_management/cloud_storage";
import RecentActivity from "@/components/docs_management/recent_Activity";
import AllFile from "@/components/docs_management/fileManager";
const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-4 h-screen p-6 m-12">
      {/* Left Side: Cloud Storage and Recent Activity */}
      <div className="col-span-1 flex flex-col gap-4">
        {/* Cloud Storage */}
        <div className="">
          <CloudStorage />
        </div>
        {/* Recent Activity */}
        <div className="">
          <RecentActivity />
        </div>
      </div>

      {/* Right Side: All Files */}
      <div className="col-span-2  rounded-lg  flex-grow ml-12">
        <AllFile />
      </div>
    </div>
  );
};

export default Dashboard;
