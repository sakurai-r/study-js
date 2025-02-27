import { z } from "zod";

/**
 * フォームデータのスキーマ
 */
export const formDataSchema = z.object({
  departure: z.string().min(1, "出発地は必須です"),
  destination: z.string().min(1, "目的地は必須です"),
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "時間は HH:MM 形式で入力してください"),
  endTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "時間は HH:MM 形式で入力してください"),
  transport: z.enum(["car", "train", "bus", "walk"]),
  category: z.enum([
    "観光・カルチャー",
    "キャンプ・BBQ",
    "自然・絶景",
    "美術館・博物館",
    "水族館・動物園",
    "体験スポット",
    "アクティビティ",
    "乗り物・クルーズ",
    "お土産・ショッピング",
  ]),
  budget: z.number().min(0, "予算は0円以上にしてください"),
  people: z.string(),
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
});

/**
 * 旅行プラン全体のスキーマ
 * OpenAI API のレスポンス仕様に合わせ、オブジェクトの `plan` キーの中に配列を格納
 */
export const tripPlanSchema = z.array(tripPlanItemSchema);

export type FormData = z.infer<typeof formDataSchema>;
export type TripPlanItem = z.infer<typeof tripPlanItemSchema>;
export type TripPlan = z.infer<typeof tripPlanSchema>;
