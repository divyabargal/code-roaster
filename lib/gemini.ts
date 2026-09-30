import { GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import type { RoastRequest, RoastResult } from "@/types/roast";

function friendlyErrorMessage(status: number | undefined, error: any): string {
  switch (status) {
    case 400:
      return "Invalid request to Gemini API. Check your input or AI.model in config/app.config.ts.";
    case 403:
      return "Gemini API key is invalid or lacks permissions. Check .env.local.";
    case 404:
      return `Requested Gemini model was not found. Check AI.model in config/app.config.ts.`;
    case 429:
      return "Gemini API rate limit exceeded. Please wait a moment before trying again.";
    case 503:
      return "Gemini service is temporarily overloaded. Please try again shortly.";
    default:
      return error?.message
        ? `Gemini API error: ${error.message}`
        : "An unexpected error occurred while communicating with Gemini.";
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  let lastError: any = null;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || !responseText.trim()) {
        throw new Error("Received empty response from Gemini API.");
      }

      let parsed: any;
      try {
        parsed = JSON.parse(responseText);
      } catch (jsonErr: any) {
        throw new Error(`Failed to parse Gemini response as JSON: ${jsonErr.message}`);
      }

      return {
        roast: typeof parsed.roast === "string" ? parsed.roast : "",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode:
          typeof parsed.correctedCode === "string" ? parsed.correctedCode : "",
        takeaway: typeof parsed.takeaway === "string" ? parsed.takeaway : "",
      };
    } catch (err: any) {
      lastError = err;
      const status =
        err?.status ??
        err?.statusCode ??
        (err as any)?.response?.status ??
        (err?.error?.code ? Number(err.error.code) : undefined);

      if (status === 503 && attempt < AI.maxAttempts) {
        const backoffMs = attempt * 1000;
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
        continue;
      }

      throw new Error(friendlyErrorMessage(status, err));
    }
  }

  throw new Error(
    friendlyErrorMessage(lastError?.status, lastError) ||
      "Failed to analyze code after multiple retry attempts."
  );
}
