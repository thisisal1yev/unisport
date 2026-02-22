import { createServerClient } from "@supabase/ssr";
import type { GetServerSidePropsContext } from "next";

export function createClient(context: GetServerSidePropsContext) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.entries(context.req.cookies).map(([name, value]) => ({
            name,
            value: value ?? "",
          }));
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            context.res.setHeader(
              "Set-Cookie",
              `${name}=${value}; Path=${options?.path ?? "/"}; HttpOnly; SameSite=Lax`,
            );
          }
        },
      },
    },
  );
}
