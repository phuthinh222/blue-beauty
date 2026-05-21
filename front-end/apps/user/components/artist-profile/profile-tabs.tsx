"use client";

import { useState } from "react";

export type TabId = "intro" | "services" | "portfolio" | "reviews";

const TABS: { id: TabId; label: string }[] = [
  { id: "intro",     label: "Giới thiệu" },
  { id: "services",  label: "Dịch vụ" },
  { id: "portfolio", label: "Portfolio" },
  { id: "reviews",   label: "Nhận xét" },
];

type ProfileTabsProps = {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
};

export function ProfileTabs({ activeTab, onChange }: ProfileTabsProps) {
  return (
    <div className="flex border-t border-slate-200">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 py-3 text-sm font-medium transition ${
            activeTab === tab.id
              ? "border-b-2 border-[#257CBA] text-[#257CBA]"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
