import { initTRPC, AnyMiddlewareFunction, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError, z } from "zod/v4";
import { RateLimiterMemory } from "rate-limiter-flexible";

export const createTRPCContext = async (_opts: { headers: Headers }) => {
  const forwarded = _opts.headers.get("x-forwarded-for");
  const ip =
    typeof forwarded === "string" && forwarded.length > 0
      ? forwarded.split(",")[0].trim()
      : "unknown"; // fallback if IP is not found

  return { ip };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError:
        error.cause instanceof ZodError ? z.flattenError(error.cause as ZodError<Record<string, unknown>>) : null,
    },
  }),
});


export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev 100-500ms
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

// Middleware for logging requests
export const loggerMiddleware = t.middleware(({ path, type, next }) => {
  const start = Date.now();
  return next({
    ctx: {},
  }).then((result) => {
    const durationMs = Date.now() - start;
    console.log(`[${type}] ${path} - ${durationMs}ms`);
    return result;
  });
});

const hourRateLimiter = new RateLimiterMemory({
  keyPrefix: "middleware_hour",
  points: 300,
  duration: 3600,
});

const minuteRateLimiter = new RateLimiterMemory({
  keyPrefix: "middleware_minute",
  points: 20,
  duration: 60,
});

export const rateLimitMiddleware: AnyMiddlewareFunction = async (opts) => {
  const ip = "unknown";
  try {
    await Promise.all([
      minuteRateLimiter.consume(ip),
      hourRateLimiter.consume(ip),
    ]);
  } catch {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "API rate limit exceeded. Try again later.",
    });
  }

  return opts.next();
};


export const publicProcedure = t.procedure
  .use(rateLimitMiddleware)
  .use(timingMiddleware);   

