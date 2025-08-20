import type { z } from "zod";
import type { analysisResultSchema } from "../schemas";

export type AnalysisResult = z.infer<typeof analysisResultSchema>;
export type Criteria = keyof AnalysisResult["criteria"];
