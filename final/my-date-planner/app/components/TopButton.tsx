"use client";

import { useRouter } from "next/navigation";
import { ArrowUp } from "lucide-react";

export default function TopButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="fixed bottom-6 right-6 bg-blue-600 text-white flex items-center gap-2 px-4 py-3 rounded-full shadow-lg text-lg font-semibold hover:bg-blue-700 hover:scale-105 transition duration-300"
    >
      <ArrowUp size={20} />
      トップに戻る
    </button>
  );
}
