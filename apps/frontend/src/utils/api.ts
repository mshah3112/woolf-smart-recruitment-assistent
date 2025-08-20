import type { AppRouter } from "@smartrecruitment/api";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>();
export type { RouterInputs, RouterOutputs } from "@smartrecruitment/api";
