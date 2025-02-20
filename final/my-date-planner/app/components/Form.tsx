"use client";

import { useState } from "react";
import { FormData, formDataSchema } from "../../lib/types";

type FormProps = {
  onSubmit: (data: FormData) => void;
};

export default function Form({ onSubmit }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    departure: "",
    destination: "",
    startTime: "",
    endTime: "",
    transport: "car",
    category: "観光",
    budget: 5000,
    people: "大人2人",
    request: "",
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 入力値の変更処理
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "budget" ? Number(value) || 0 : value,
    }));
  };

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // フロントエンド側のバリデーション
      formDataSchema.parse(formData);
      setErrors(null);
      setLoading(true);

      const res = await fetch("/api/generatePlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`APIエラー: ${res.status}`);
      }

      const data = await res.json();
      console.log("生成されたプラン:", data);
      onSubmit(data);
    } catch (error) {
      if (error instanceof Error) {
        setErrors(error.message);
      } else {
        setErrors("入力データに誤りがあります。");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 bg-white rounded-lg shadow-md"
    >
      <input
        name="departure"
        placeholder="出発地"
        value={formData.departure}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="destination"
        placeholder="目的地"
        value={formData.destination}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="time"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="time"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <select
        name="transport"
        value={formData.transport}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="car">車</option>
        <option value="train">電車</option>
        <option value="bus">バス</option>
        <option value="walk">徒歩</option>
      </select>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="観光">観光</option>
        <option value="グルメ">グルメ</option>
        <option value="アウトドア">アウトドア</option>
      </select>
      <input
        type="number"
        name="budget"
        placeholder="予算（円）"
        step="1000"
        value={formData.budget}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <textarea
        name="request"
        placeholder="AIへのリクエスト"
        value={formData.request}
        onChange={handleChange}
        className="border p-2 w-full"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 w-full"
        disabled={loading}
      >
        {loading ? "プラン作成中..." : "プランを作成"}
      </button>
      {errors && <p className="text-red-500">{errors}</p>}
    </form>
  );
}
