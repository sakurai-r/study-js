"use client";

import { useState } from "react";
import { FormData, formDataSchema } from "../../lib/types";
import { Send } from "lucide-react";

type FormProps = {
  onSubmit: (data: FormData) => void;
  disabled: boolean;
};

export default function Form({ onSubmit, disabled }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    companion: "友達",
    destination: "",
    startTime: "10:00",
    endTime: "20:00",
    transport: "電車",
    category: "観光・カルチャー",
    budget: 10000,
    request: "",
  });

  const [errors, setErrors] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      formDataSchema.parse(formData);
      setErrors(null);
      onSubmit(formData);
    } catch (error) {
      if (error instanceof Error) {
        setErrors(error.message);
      } else {
        setErrors("入力データに誤りがあります。");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 space-y-6 bg-white bg-opacity-90 rounded-3xl shadow-2xl max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-extrabold text-center text-gray-800">
        🎯 お出かけプランを作成
      </h2>

      <div className="space-y-2">
        <label className="block text-xl font-semibold text-gray-800 flex items-center">
          誰と
        </label>
        <select
          name="companion"
          value={formData.companion}
          onChange={handleChange}
          className="bg-white text-gray-800 border-2 border-gray-300 p-3 w-full rounded-lg shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        >
          <option value="友人">👬 友人</option>
          <option value="家族">👨‍👩‍👧‍👦 家族</option>
          <option value="恋人">💑 恋人</option>
          <option value="ひとり">🧍‍♂️ ひとり</option>
          <option value="職場の同僚">👔 職場の同僚</option>
          <option value="その他">🌍 その他</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-xl font-semibold text-gray-800">
          目的地
        </label>
        <input
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          className="bg-white text-gray-800 border-2 border-gray-300 p-3 w-full rounded-lg shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
          placeholder="渋谷"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xl font-semibold text-gray-800">
          集合時間
        </label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="bg-white text-gray-800 border-2 border-gray-300 p-3 w-full rounded-lg shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xl font-semibold text-gray-800">
          解散時間
        </label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className="bg-white text-gray-800 border-2 border-gray-300 p-3 w-full rounded-lg shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xl font-semibold text-gray-800">
          移動手段
        </label>
        <select
          name="transport"
          value={formData.transport}
          onChange={handleChange}
          className="bg-white text-gray-800 border-2 border-gray-300 p-3 w-full rounded-lg shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        >
          <option value="電車">🚆 電車</option>
          <option value="車">🚗 車</option>
          <option value="バス">🚌 バス</option>
          <option value="タクシー">🚕 タクシー</option>
          <option value="徒歩">🚶 徒歩</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-xl font-semibold text-gray-800">
          ジャンル
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="bg-white text-gray-800 border-2 border-gray-300 p-3 w-full rounded-lg shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        >
          <option value="観光・カルチャー">🏯 観光・カルチャー</option>
          <option value="グルメ・スイーツ">🍖 グルメ・スイーツ</option>
          <option value="ショッピング">🛍 ショッピング</option>
          <option value="キャンプ・BBQ">🔥 キャンプ・BBQ</option>
          <option value="自然・絶景">🌳 自然・絶景</option>
          <option value="美術館・博物館">🎨 美術館・博物館</option>
          <option value="水族館・動物園">🐠 水族館・動物園</option>
          <option value="体験スポット">🔨 体験スポット</option>
          <option value="アクティビティ">🎿 アクティビティ</option>
          <option value="乗り物・クルーズ">🚢 乗り物・クルーズ</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-xl font-semibold text-gray-800">
          一人当たりの予算（円）
        </label>
        <input
          type="number"
          name="budget"
          step="1000"
          value={formData.budget}
          onChange={handleChange}
          className="bg-white text-gray-800 border-2 border-gray-300 p-3 w-full rounded-lg shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="space-y-2 relative">
        <label className="block text-xl font-semibold text-gray-800 flex items-center">
          AI へのリクエスト
        </label>
        <textarea
          name="request"
          value={formData.request}
          onChange={handleChange}
          className="bg-white text-gray-800 border-2 border-gray-300 p-3 w-full rounded-lg shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
          placeholder="おいしいご飯が食べたい！"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="bg-blue-500 text-white text-xl p-4 w-full rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-lg"
      >
        プランを作成 <Send size={24} />
      </button>

      {errors && <p className="text-red-500 text-center mt-3">{errors}</p>}
    </form>
  );
}
