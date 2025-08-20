import type { Part } from "@google-cloud/vertexai";
import { MAX_ATTEMPTS, RETRY_DELAY } from "../utils/constants";
import { analysisResultSchema } from "../schemas";
import { convertToSchemaBasedResponse } from "../tools/convertToSchemaBasedResponseTool";
import type { GenerateContentRequest, GenerateContentResponse } from "@google-cloud/vertexai";
import { env } from "../utils/env";


const SYSTEM_INSTRUCTION = `
  You are a helpful assistant that checks if a resume is a good fit for a job description.
  Ensure to always call the convertToSchemaBasedResponse function declared in the tools to save the response.
  DO NOT RETURN ANYTHING ELSE.
  I REPEAT, DO NOT RETURN ANYTHING ELSE.
`;

const USER_PROMPT = `
  You are an expert HR analyst and recruiter. Your task is to evaluate the candidate’s resume against the provided job description and deliver a detailed, structured assessment.
  Check if the resume is a good fit for the job description.
  Give a detailed analysis of the resume and the job description.
  Ensure to always call the convertToSchemaBasedResponse function declared in the tools to save the response.
  Do not return anything else.
  I REPEAT, DO NOT RETURN ANYTHING ELSE. Always call the convertToSchemaBasedResponse function declared in the tools to save the response.

`;

const generateResponse = async (request: GenerateContentRequest) => {
  const response = await fetch("https://intertest.woolf.engineering/invoke", {
    method: "POST",
    headers: {
      Authorization: env.AUTHORIZATION_TOKEN,
    },
    body: JSON.stringify(request),
  });
  const data = (await response.json()) as GenerateContentResponse;
  return data.candidates?.[0]?.content.parts[0];
};

type AnalyzeResumeInput = {
  resumePdf: string;
  jobDescriptionPdf: string;
};

export const analyzeResume = async ({ resumePdf, jobDescriptionPdf }: AnalyzeResumeInput) => {
  console.log("Analyzing resume...");
  const resumePart = {
    inlineData: {
      mimeType: "application/pdf",
      data: resumePdf,
    },
  } satisfies Part;

  const jobDescriptionPart = {
    inlineData: {
      mimeType: "application/pdf",
      data: jobDescriptionPdf,
    },
  } satisfies Part;

  const userPromptPart = {
    text: USER_PROMPT,
  } satisfies Part;

  /**
   * TODO: Add a retry mechanism with exponential backoff.
   */
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    try {
      const response = await generateResponse({
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ functionDeclarations: [convertToSchemaBasedResponse] }],
        contents: [
          {
            role: "user",
            parts: [resumePart, jobDescriptionPart, userPromptPart],
          },
        ],
         generationConfig: {
            temperature: 0.7
          }
      });

      console.log("Response received:", response);
      console.log("Function call:", response?.functionCall?.name);
      if (response?.functionCall?.name === "convertToSchemaBasedResponse") {
        return analysisResultSchema.parse(response.functionCall.args);
      }
    } catch (_) {
      // TODO: Log the error
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }

  throw new Error("Failed to analyze resume.");
};




