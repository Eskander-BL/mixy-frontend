import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../../dj-academy-backend/server/routers";

export const trpc = createTRPCReact<AppRouter>();
