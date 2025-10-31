import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        "X-Client-Info": "DreamWedding-Frontend",
      },
    },
  });
} else {
  console.warn(
    "[DreamWedding] Variables VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY no están configuradas. Se utilizarán datos locales.",
  );
}

export const getSupabaseClient = () => {
  if (!supabase) {
    throw new Error(
      "Supabase no está configurado. Define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.",
    );
  }
  return supabase;
};
