import type { RouterOutputs } from "@/utils/api";

export type AnalysisResult = RouterOutputs["ai"]["analyzeResume"];
export type Criterion = keyof AnalysisResult["criteria"];
