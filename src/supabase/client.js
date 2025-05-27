import { createClient } from "@supabase/supabase-js";
const url = import.meta.env.VITE_SUPABASE_URL;
const SupabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(url, SupabaseKey);
export default supabase;
