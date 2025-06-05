
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ndyjtlgvmdtonrhptvsr.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5keWp0bGd2bWR0b25yaHB0dnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NzI2NzQsImV4cCI6MjA2NDM0ODY3NH0.ynrGIUQJ3sN-s32fKbINzVyXpcd_AzJbBwvn3hB8V_Q"

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
