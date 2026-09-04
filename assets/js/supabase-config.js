// Supabase configuration
const SUPABASE_URL = 'https://fmldzkgqmzipdxzpshh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtbGR6a2dxbXFpenBkeHpwc2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0Nzc2MDgsImV4cCI6MjEwNDA1MzYwOH0.5cEtI6au9GaIptwcZJF369mll4uz-Ya7CrxDe_65Q5Y'; // Replace with your actual key

// Initialize Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabase = supabaseClient;

console.log('✅ Supabase connected successfully!');