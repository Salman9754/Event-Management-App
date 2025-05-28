import { createClient } from "@supabase/supabase-js";
const url = "https://jngljynwqhrrnlcijvrv.supabase.co"
const SupabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuZ2xqeW53cWhycm5sY2lqdnJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNTg5NjksImV4cCI6MjA2MzczNDk2OX0.uPM1nKmAgKsYUh-bosIIhOGvkDjaAxmve1pozPAoEMA"
console.log(SupabaseKey)
const supabase = createClient(url, SupabaseKey);
export default supabase;
