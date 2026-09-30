import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log(`Checking Gemini API connection using model "${AI.model}"...`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n--- API Response Received Successfully ---");
    console.log(`Issues Found: ${result.issues.length}`);
    console.log(`Roast: ${result.roast}`);
    console.log(`Takeaway: ${result.takeaway}`);
    console.log("\nGemini API check passed!");
  } catch (error: any) {
    console.error("\n[API Check Failed]:", error?.message || error);
    process.exit(1);
  }
}

main();
