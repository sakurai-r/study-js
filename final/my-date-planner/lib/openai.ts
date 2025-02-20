import { OpenAI } from "openai";
import { FormData, tripPlanSchema, TripPlan } from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function fetchAIPlan(formData: FormData): Promise<TripPlan> {
  const prompt = `
  ユーザーが楽しく過ごせる1日のお出かけプランを作成してください。

  - 出発地: ${formData.departure}
  - 目的地: ${formData.destination}
  - 出発時間: ${formData.startTime}
  - 帰宅時間: ${formData.endTime}
  - 移動手段: ${formData.transport}
  - ジャンル: ${formData.category}
  - 予算: ${formData.budget}円以内
  - リクエスト: 「${formData.request ?? "特になし"}」

  以下のJSONフォーマットで出力してください。無駄な説明文は不要です。
  [
    {"time": "10:00", "spot": "〇〇カフェ", "description": "美味しいコーヒーを楽しめるおしゃれなカフェ。"},
    {"time": "12:00", "spot": "〇〇公園", "description": "自然の中でゆったりと散歩。"},
    {"time": "14:00", "spot": "〇〇美術館", "description": "アート鑑賞を楽しむ。"}
  ]
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "あなたはデートプランナーです。1日のお出かけプランを提案してください。",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    });

    const completionText = response.choices[0]?.message?.content?.trim();
    console.log("OpenAI Response:", completionText);

    if (!completionText) {
      throw new Error("AIのレスポンスが空です");
    }

    const parsedData = JSON.parse(completionText);
    return tripPlanSchema.parse(parsedData);
  } catch (error) {
    console.error("AIプランの取得に失敗しました:", error);
    return { plan: [] };
  }
}
