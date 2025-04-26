import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nzxwhleqwevnevicshch.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56eHdobGVxd2V2bmV2aWNzaGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NTUyOTQsImV4cCI6MjA2MTAzMTI5NH0.SUS06LH0D1TDFN2a-9WDS96msaj5MgVMBmiUMdpf1m8";

export const supabase = createClient(supabaseUrl, supabaseKey);
