import { createClient } from '@supabase/supabase-js';



// ! am Anfang immer im Projekt installieren: npm install @supabase/supabase-js

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;


const supabaseClient = createClient(supabaseUrl, supabaseKey);

// * wir können überall im Projekt den supabaseClient verwenden, um uns zum Backend zu verbinden
export default supabaseClient;