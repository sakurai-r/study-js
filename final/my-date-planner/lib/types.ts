import { z } from "zod";

/**
 * フォームデータのスキーマ
 */
export const formDataSchema = z.object({
  companion: z.string().min(1, "必須です"),
  destination: z.string().min(1, "目的地は必須です"),
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "時間は HH:MM 形式で入力してください"),
  endTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "時間は HH:MM 形式で入力してください"),
  transport: z.enum(["電車", "車", "バス", "タクシー", "徒歩"]),
  category: z.enum([
    "観光・カルチャー",
    "グルメ・スイーツ",
    "ショッピング",
    "キャンプ・BBQ",
    "自然・絶景",
    "美術館・博物館",
    "水族館・動物園",
    "体験スポット",
    "アクティビティ",
    "乗り物・クルーズ",
  ]),
  budget: z.number().min(5000, "予算は5000円以上にしてください"),
  request: z.string().optional(),
});

/**
 * 旅行プランのスキーマ
 */
export const tripPlanItemSchema = z.object({
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "時間は HH:MM 形式で入力してください"),
  spot: z.string(),
  description: z.string(),
  duration: z.number().nullable(),
  travel_time: z.number().nullable(),
  url: z.string().nullable(),
});

/**
 * 旅行プラン全体のスキーマ
 * OpenAI API のレスポンス仕様に合わせ、オブジェクトの `plan` キーの中に配列を格納
 */
export const tripPlanSchema = z.array(tripPlanItemSchema);

export type FormData = z.infer<typeof formDataSchema>;
export type TripPlanItem = z.infer<typeof tripPlanItemSchema>;
export type TripPlan = z.infer<typeof tripPlanSchema>;
