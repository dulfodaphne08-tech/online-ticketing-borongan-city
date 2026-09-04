// Supabase configuration
const SUPABASE_URL = 'https://lmwjnhlegodamitwwvem.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtd2puaGxlZ29kYW1pdHd3dmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MTYzNjcsImV4cCI6MjEwNDA5MjM2N30.9dWMC31ziFa76_lnuozX-otyB6f_DCn5s5Ymbre4UGs'; // Replace with your actual key

// Initialize Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabase = supabaseClient;

console.log('✅ Supabase connected successfully!');