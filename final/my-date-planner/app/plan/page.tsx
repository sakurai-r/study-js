"use client";

import { usePlan } from "../context/PlanContext";

export default function Plan() {
  const { plan } = usePlan();

  if (plan.length === 0) {
    return <p className="text-center p-4">プランがありません。</p>;
  }

  return (
    <div className="p-4 space-y-4 bg-white rounded-lg shadow-md">
      {plan.map((item, index) => (
        <div key={index} className="border p-2">
          <h3 className="font-bold">
            {item.time} - {item.spot}
          </h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
