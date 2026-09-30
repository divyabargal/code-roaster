import { Schema, Type } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "A witty Hinglish roast analyzing the user's code.",
    },
    issues: {
      type: Type.ARRAY,
      description: "A structured list of detected issues.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number where the issue appears.",
          },
          severity: {
            type: Type.STRING,
            enum: SEVERITIES as unknown as string[],
            description: "Severity level of the issue.",
          },
          title: {
            type: Type.STRING,
            description: "Short punchy title of the issue in Hinglish with an emoji.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact problematic code copied from the submission.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Explanation of why this code is bad in Hinglish with an emoji.",
          },
          expected: {
            type: Type.STRING,
            description: "What the code should do or look like in Hinglish with an emoji.",
          },
        },
        required: ["line", "severity", "title", "codeSnippet", "diagnosis", "expected"],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "The complete fixed program in the same language without markdown fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "Short takeaway lesson in Hinglish with an emoji.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
