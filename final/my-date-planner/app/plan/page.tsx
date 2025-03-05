"use client";

import { usePlan } from "../context/PlanContext";
import { MapPin, Clock, ArrowRightCircle } from "lucide-react";

export default function Plan() {
  const { plan } = usePlan();

  if (plan.length === 0) {
    return <p className="text-center p-4">プランの生成に失敗しました。</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center p-6">
      <div className="relative w-full max-w-4xl bg-white bg-opacity-40 p-10 rounded-3xl shadow-2xl text-centerl">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          🌟 あなたの1日プラン 🌟
        </h1>

        <div className="relative space-y-8 px-12">
          {plan.map((spot, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-xl transform transition duration-300 hover:scale-105"
            >
              {/* 番号 */}
              <div className="absolute -left-4 top-3 w-8 h-8 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full shadow-md">
                {index + 1}
              </div>

              {/* 時間 */}
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={20} />
                <span className="font-semibold text-lg">{spot.time}</span>
              </div>

              {/* スポット名（リンク付き） */}
              <h3 className="mt-2 text-2xl font-bold text-blue-600 hover:underline transition">
                {spot.url ? (
                  <a href={spot.url} target="_blank" rel="noopener noreferrer">
                    {spot.spot}
                  </a>
                ) : (
                  <>{spot.spot}</>
                )}
              </h3>

              {/* 説明 */}
              <p className="text-gray-700 mt-1 text-lg">{spot.description}</p>

              {/* 滞在時間 & 移動時間 */}
              <div className="flex items-center gap-6 mt-4 text-lg">
                <p className="text-blue-600 font-bold flex items-center">
                  <MapPin size={22} className="mr-1" />
                  滞在時間: {spot.duration}分
                </p>
                {spot.travel_time !== null && (
                  <p className="text-red-600 font-bold flex items-center">
                    <ArrowRightCircle size={22} className="mr-1" />
                    移動時間: {spot.travel_time}分
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
