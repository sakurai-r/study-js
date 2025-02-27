"use client";

import { TripPlan } from "../../lib/types";
import { createContext, useContext, useState, ReactNode } from "react";

type PlanContextType = {
  plan: TripPlan;
  setPlan: (data: TripPlan) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<TripPlan>([]);

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
