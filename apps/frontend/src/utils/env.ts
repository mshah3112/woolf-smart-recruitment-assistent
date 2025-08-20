import z from "zod";

const frontendEnvSchema = z.object({
  VITE_API_URL: z.string().url(),
});

// biome-ignore lint/suspicious/noExplicitAny: TypeScript doesn't know about import.meta.env
export const env = frontendEnvSchema.parse((import.meta as any).env);
