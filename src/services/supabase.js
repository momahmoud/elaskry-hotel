import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = import.meta.env.VITE_BACKEND_URL;
const supabaseKey = import.meta.env.VITE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
// import.meta.env.REACT_APP_SUPABASE_URL;
