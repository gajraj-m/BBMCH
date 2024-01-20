import React from "react";
import SideBar from "../../components/SideBar";

const Dashboard = () => {
  return (
    <div className="flex flex-row">
      <SideBar />

      {/* dashboard */}
      <div className="bg-red-300 m-8 w-full h-full">
<span>hahahah</span>
      </div>
    </div>
  );
};

export default Dashboard;
