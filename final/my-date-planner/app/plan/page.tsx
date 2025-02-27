"use client";

import { usePlan } from "../context/PlanContext";
import Timeline from "../components/Timeline";
import SpotCard from "../components/SpotCard";
//import GoogleMap from "../components/GoogleMap";

export default function Plan() {
  const { plan } = usePlan();

  if (plan.length === 0) {
    return <p className="text-center p-4">プランがありません。</p>;
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">お出かけプラン</h1>

      {/* タイムライン表示 */}
      <Timeline data={plan} />

      {/* スポットのカード表示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plan.map((spot, index) => (
          <SpotCard key={index} spot={spot} />
        ))}
      </div>

      {/* Google Maps の埋め込み */}
      {/*<h2 className="text-xl font-bold mt-6">マップ</h2>
      <GoogleMap location={plan[0].spot} />*/}
    </div>
  );
}
