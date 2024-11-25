import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://okshepxwnhzdyfddwfzy.supabase.co";
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);

export default supabase;
