import z from "zod";

const apiEnvSchema = z.object({
  AUTHORIZATION_TOKEN: z.string().min(1),
});

export const env = apiEnvSchema.parse(process.env);
