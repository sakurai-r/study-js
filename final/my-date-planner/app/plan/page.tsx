"use client";
import { useSearchParams } from "next/navigation";
import Plan from "../components/Plan";

export default function PlanPage() {
  const searchParams = useSearchParams();
  const data = JSON.parse(decodeURIComponent(searchParams.get("data") || "[]"));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">AI生成プラン</h1>
      <Plan data={data} />
    </div>
  );
}
