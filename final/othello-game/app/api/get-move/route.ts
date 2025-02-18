import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MoveSchema = z.object({
  row: z.number().min(0).max(7),
  col: z.number().min(0).max(7),
});

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key is missing" },
      { status: 500 }
    );
  }

  const { board, player } = await req.json();

  const prompt = `あなたはオセロ（リバーシ）のプレイヤーです。
  8×8 の盤面を持ち、各セルは以下のいずれかの値を持ちます：
  - "empty"（空のセル）
  - "black"（黒の石）
  - "white"（白の石）

  あなたの色は "${player}" です。
  あなたの目的は、ルールに従って **最適な合法手を選ぶ** ことです。
  以下のルールに従って、最善の手を考えてください。

  ### ルール
  1. 石は空のセル（"empty"）にのみ置ける。
  2. 置いた石が相手の石を挟まなければならない。
     - 縦、横、斜めのいずれかの方向で挟む必要がある。
  3. 相手の石を一つも挟めない位置には置けない。
  4. できるだけ多くの石を裏返せる手を選ぶ。
  5. 複数の選択肢がある場合、以下の優先度で選ぶ。
     - ① **角（0,0 / 0,7 / 7,0 / 7,7）** を最優先する。
     - ② **辺（端のマス）** を次に優先する。
     - ③ **中央に近いマス** はなるべく避ける。

  ### 盤面の状態
  次の JSON 配列は、現在の盤面の状態です。

  ${JSON.stringify(board)}

  ### 出力フォーマット
  次の形式で、**合法な最適手** を JSON 形式で出力してください。
  {"row": 行番号, "col": 列番号}

  ** 無効な手を出力してはいけません**
- **盤面が "empty" でないマスに置いてはいけません**
- **相手の石を挟めない場所に置いてはいけません**
- **合法手がない場合は null を返してください**`;

  console.log(prompt);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 20,
      temperature: 0,
      response_format: { type: "json_object" },
    });

    const rawContent = response.choices[0].message.content;
    const parsedContent =
      typeof rawContent === "string" ? JSON.parse(rawContent) : rawContent;
    const parse = MoveSchema.safeParse(parsedContent);
    console.log(parse.data);

    if (!parse.success) {
      console.error("OpenAI returned an invalid response", rawContent);
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 400 }
      );
    }

    if (!response.choices || response.choices.length === 0) {
      console.error("OpenAI returned an empty response");
      return NextResponse.json({ error: "Empty AI response" }, { status: 500 });
    }

    return NextResponse.json(parse.data);
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to get AI move", details: error.message },
      { status: 500 }
    );
  }
}
