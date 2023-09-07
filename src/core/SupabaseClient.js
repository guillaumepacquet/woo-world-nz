import { createClient } from "@supabase/supabase-js";

export const Client = createClient(
  process.env.VUE_APP_SUPABASE_URL,
  process.env.VUE_APP_SUPABASE_KEY
);
