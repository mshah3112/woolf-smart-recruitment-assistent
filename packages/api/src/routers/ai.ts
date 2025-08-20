import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { analyzeResume } from "../clients/gemini";
import { base64Pdf } from "../schemas";

export const aiRouter = createTRPCRouter({
  analyzeResume: publicProcedure
    .input(
      z.object({
        resumePdf: base64Pdf,
        jobDescriptionPdf: base64Pdf,
      }),
    )
    .mutation(async ({ input }) => await analyzeResume(input)),
});
