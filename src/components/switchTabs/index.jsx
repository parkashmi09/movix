import React, { useState } from "react";
import "./style.scss";
export default function SwitchTabs({ data, onTabChange }) {
  const [selectedtab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const handleActiveTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 3000);
    onTabChange(tab, index);
  };
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => {
          return (
            <span
              key={index}
              className={`tabItem ${selectedtab === index ? "active" : ""}`}
              onClick={() => handleActiveTab(tab, index)}
            >
              {tab}
            </span>
          );
        })}
        <span className="movingBg" style={{ left: left }} />
      </div>
    </div>
  );
}
