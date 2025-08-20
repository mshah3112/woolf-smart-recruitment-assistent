import type { FunctionDeclaration, FunctionDeclarationSchema } from "@google-cloud/vertexai";
import { zodToVertexSchema } from "@techery/zod-to-vertex-schema";
import { analysisResultSchema } from "./../schemas";

export const convertToSchemaBasedResponse = {
  name: "convertToSchemaBasedResponse",
  description:
    "Convert the analysis result to a schema-based response. The analysis contains the criteria, overall score, overall comment, and final recommendation.",
  parameters: zodToVertexSchema(analysisResultSchema) as FunctionDeclarationSchema,
} satisfies FunctionDeclaration;
