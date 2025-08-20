import { aiRouter } from "./routers/ai";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  ai: aiRouter
});

export type AppRouter = typeof appRouter;
