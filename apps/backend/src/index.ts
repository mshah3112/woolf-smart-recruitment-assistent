import { appRouter } from "@smartrecruitment/api";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

const PORT = process.env.PORT ? Number(process.env.PORT) : 9091;
const HOST = "0.0.0.0";

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

server.listen(PORT, HOST).on("listening", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});