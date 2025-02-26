"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type PlanItem = {
  time: string;
  spot: string;
  description: string;
};

type PlanContextType = {
  plan: PlanItem[];
  setPlan: (data: PlanItem[]) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);

  return (
    <PlanContext.Provider value={{ plan, setPlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}
