import { NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import type { LanguageId, RoastLevel } from "@/types/roast";

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const rawCode = typeof body?.code === "string" ? body.code : "";
  const rawErrorMessage =
    typeof body?.errorMessage === "string" ? body.errorMessage.trim() : "";

  // 1. Validate empty code
  if (!rawCode || !rawCode.trim()) {
    return NextResponse.json(
      { error: "No code provided." },
      { status: 400 }
    );
  }

  // 2. Validate code length
  if (rawCode.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // 3. Validate error message length
  if (rawErrorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Fallback for language and roast level
  const validLanguageIds = LANGUAGES.map((lang) => lang.id as string);
  const validRoastLevels = ROAST_LEVELS.map((level) => level.id as string);

  const language: LanguageId = validLanguageIds.includes(body?.language)
    ? (body.language as LanguageId)
    : DEFAULTS.language;

  const roastLevel: RoastLevel = validRoastLevels.includes(body?.roastLevel)
    ? (body.roastLevel as RoastLevel)
    : DEFAULTS.roastLevel;

  try {
    const result = await analyzeCode({
      language,
      code: rawCode,
      roastLevel,
      errorMessage: rawErrorMessage || undefined,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Roast API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to analyze code." },
      { status: 500 }
    );
  }
}
