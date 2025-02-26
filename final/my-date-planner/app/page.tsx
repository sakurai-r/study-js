"use client";
import { useState } from "react";
import Form from "./components/Form";
import { useRouter } from "next/navigation";
import { usePlan } from "./context/PlanContext";

export default function Home() {
  const router = useRouter();
  const { setPlan } = usePlan(); // ✅ `plan` をセットする
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (formData: any) => {
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
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">AIお出かけプラン作成</h1>
      <Form onSubmit={handleFormSubmit} />
      {loading && <p>プランを作成中...</p>}
    </div>
  );
}
