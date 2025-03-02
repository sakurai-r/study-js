import { OpenAI } from "openai";
import { FormData, tripPlanSchema, TripPlan } from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function fetchAIPlan(
  formData: FormData
): Promise<{ plan: TripPlan }> {
  const prompt = `
  ユーザーが楽しく過ごせる1日のお出かけプランを作成してください。
  各地での楽しみ方は詳細に提示してください。
  目的地の情報は店名や場所の名前を明確にしてください。

  - 誰と: ${formData.companion}
  - 目的地: ${formData.destination}
  - 集合時刻: ${formData.startTime}
  - 解散時刻: ${formData.endTime}
  - 移動手段: ${formData.transport}
  - ジャンル: ${formData.category}
  - 1人当たりの予算: ${formData.budget}円以内
  - リクエスト: 「${formData.request ?? "特になし"}」

  **ルール**
  - time: 時刻
  - spot: 正確な店舗・施設の名称
  - url: 各スポットに関連するサイトのURL **必ず有効なURLにすること。公式サイトやGoogle Maps URL** を記述（無効な URL は含めない）
  - description: 場所の説明と具体的な楽しみ方・おすすめ情報
  - duration: その場所での滞在時間。分単位で記述（例: 60）
  - trabel_time: 次の地点への移動時間。分単位で記述（例: 15）

  レスポンスは以下のJSONフォーマットで出力してください。その他の余計な文字列は絶対に含めないでください。
  [
    {
      "time": "10:00",
      "spot": "渋谷駅 ハチ公前広場",
      "url": "https://www.gotokyo.org/jp/spot/226/"
      "description": "待ち合わせ場所として有名なハチ公像の前で、記念写真を撮影し、渋谷の賑やかな雰囲気を感じる。",
      "duration": 30,
      "travel_time": 1,
    },
    {
      "time": "10:30",
      "spot": "渋谷スクランブル交差点",
      "url": "https://www.gotokyo.org/jp/spot/1013/"
      "description": "世界でも有名な交差点。数百人が一斉に横断する迫力を体感し、写真や動画を撮影。",
      "duration": 20,
      "travel_time": 5,
    },
    {
      "time": "10:55",
      "spot": "スターバックス 渋谷TSUTAYA店",
      "url": "https://store.starbucks.co.jp/detail-67/"
      "description": "スクランブル交差点が一望できるスターバックスの特等席で、カフェラテやスイーツを楽しみながら渋谷の喧騒を眺める。",
      "duration": 45,
      "travel_time": 10,
    },
    {
      "time": "11:50",
      "spot": "明治神宮",
      "url": "https://www.meijijingu.or.jp/"
      "description": "東京都内でありながら、静寂に包まれた神聖な場所。巨大な鳥居をくぐり、自然豊かな参道を歩きながら歴史的な神社を参拝。",
      "duration": 60,
      "travel_time": 20,
    },
    {
      "time": "13:10",
      "spot": "表参道 KIHACHI 青山本店",
      "url": "https://www.kihachi.jp/restaurant/"
      "description": "洗練された雰囲気のレストランで、名物のパスタやKIHACHI特製スイーツを堪能。開放感のあるテラス席もおすすめ。",
      "duration": 90,
      "travel_time": 15,
    },
    {
      "time": "15:00",
      "spot": "代々木公園",
      "url": "https://www.tokyo-park.or.jp/park/format/index039.html"
      "description": "都心にある広大な公園。芝生エリアでピクニックを楽しむか、レンタサイクルで自然の中を散策。",
      "duration": 60,
      "travel_time": 10,
    },
    {
      "time": "16:10",
      "spot": "渋谷ヒカリエ",
      "url": "https://www.hikarie.jp/"
      "description": "ショッピングフロアで最新のファッションや雑貨をチェックし、展望台で渋谷の絶景を楽しむ。",
      "duration": 60,
      "travel_time": 10,
    },
    {
      "time": "17:20",
      "spot": "居酒屋 鳥貴族 渋谷道玄坂店",
      "url": "https://www.torikizoku.co.jp/"
      "description": "リーズナブルな焼き鳥とお酒を楽しめる居酒屋。人気の「もも貴族焼き」を味わいながら、ゆっくりくつろぐ。",
      "duration": 90,
      "travel_time": "5,
    },
    {
      "time": "19:00",
      "spot": "渋谷駅",
      "url": "https://www.jreast.co.jp/estation/stations/808.html"
      "description": "帰路につく前に、駅構内のお土産ショップでお菓子やスイーツを購入。",
      "duration": 10,
      "travel_time": null,
    }
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
      temperature: 0.5,
    });

    const completionText = response.choices[0]?.message?.content?.trim();
    console.log("OpenAI Response:", completionText);

    if (!completionText) {
      throw new Error("AIのレスポンスが空です");
    }

    const parsedData = JSON.parse(completionText);
    return { plan: tripPlanSchema.parse(parsedData) };
  } catch (error) {
    console.error("AIプランの取得に失敗しました:", error);
    return { plan: [] };
  }
}
