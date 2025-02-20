"use client";
import { useState } from "react";
import Form from "./components/Form";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (formData: any) => {
    setLoading(true);
    const res = await fetch("/api/generatePlan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setLoading(false);
    router.push(`/plan?data=${encodeURIComponent(JSON.stringify(data))}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">AIお出かけプラン作成</h1>
      <Form onSubmit={handleFormSubmit} />
      {loading && <p>プランを作成中...</p>}
    </div>
  );
}
