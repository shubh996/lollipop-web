import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hpoornsnjpjjjvurwjle.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhwb29ybnNuanBqamp2dXJ3amxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5ODIyNTksImV4cCI6MjA2NTU1ODI1OX0.Qs_YtGb-lHjPH_eZ2KPCkq8tpxwI6jvIz6QFHNBzu3c';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

