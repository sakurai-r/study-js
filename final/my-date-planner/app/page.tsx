"use client";

import { useState } from "react";
import Form from "./components/Form";
import { useRouter } from "next/navigation";
import { usePlan } from "./context/PlanContext";
import { FormData } from "../lib/types";

export default function Home() {
  const router = useRouter();
  const { setPlan } = usePlan();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    setLoading(true);

    try {
      const res = await fetch("/api/generatePlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`APIエラー: ${res.status}`);
      }

      const data = await res.json();
      setPlan(data.plan);
      router.push("/plan");
    } catch (error) {
      console.error("プラン作成エラー:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center p-6">
      <div className="relative w-full max-w-4xl bg-white bg-opacity-20 p-10 rounded-3xl shadow-2xl text-center">
        <h1 className="text-4xl font-extrabold">
          ✈️ AI で作る最高の1日プラン ✨
        </h1>
        <p className="mt-4 text-lg font-light">
          AI
          があなたの希望にぴったりの旅程を提案します！お出かけの希望を入力してください
          🎶
        </p>
      </div>

      {/* ローディング表示 */}
      {loading && (
        <div className="mt-6 text-lg font-semibold animate-pulse">
          🚀 AIがプランを作成中です...
        </div>
      )}

      {/* フォーム */}
      <div className="mt-8 w-full max-w-lg p-6 bg-white bg-opacity-90 rounded-2xl shadow-lg">
        <Form onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
