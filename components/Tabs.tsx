/** @format */

"use client";

import { useState } from "react";

interface Tab {
  id: number;
  name: string;
  content: string; // Added content field
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number | 'none'>('none');


  return (
    <div>
      {/* Tabs Navigation */}
      <div className="flex gap-3 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-3 text-sm rounded-lg bg-default min-w-fit ${
              activeTab === tab.id
                ? "bg-white text-black"
                : "hover:bg-secondary"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {/* <div className="p-4 border rounded-lg">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div> */}
    </div>
  );
};

export default Tabs;
