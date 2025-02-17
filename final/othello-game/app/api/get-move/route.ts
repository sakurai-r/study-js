import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key is missing" },
      { status: 500 }
    );
  }

  const { board, player } = await req.json();

  console.log("Player:", player);
  console.log("Board:", board);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `You are playing Othello (Reversi).
          The board is an 8x8 grid represented as a 2D array of strings: "empty", "black", or "white".
          Your color is "${player}". Suggest the best move as a JSON object with "row" and "col" keys.

          Board:
          ${JSON.stringify(board)}

          Best move as JSON:`,
        },
      ],
      max_tokens: 20,
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    if (!response.choices || response.choices.length === 0) {
      console.error("OpenAI returned an empty response");
      return NextResponse.json({ error: "Empty AI response" }, { status: 500 });
    }

    return NextResponse.json(response.choices[0].message.content);
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to get AI move", details: error.message },
      { status: 500 }
    );
  }
}
