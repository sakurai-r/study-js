import { NextRequest, NextResponse } from "next/server";
import { fetchAIPlan } from "../../../lib/openai";
import { formDataSchema, FormData } from "../../../lib/types";

export async function POST(req: NextRequest) {
  try {
    const jsonData = await req.json();
    console.log("Received JSON:", jsonData);
    const formData: FormData = formDataSchema.parse(jsonData);

    const plan = await fetchAIPlan(formData);
    return NextResponse.json(plan);
  } catch (error) {
    console.error("プラン生成エラー:", error);
    return NextResponse.json(
      { error: "プラン生成に失敗しました" },
      { status: 400 }
    );
  }
}
