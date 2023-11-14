import { createClient } from '@supabase/supabase-js'

const URL = 'https://egdupokbbdnjwgzpyeef.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZHVwb2tiYmRuandnenB5ZWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5MDM2OTAsImV4cCI6MjAxNTQ3OTY5MH0.5ywB0djtmedU7nYDTCquVUptN0sdgjEMdOm_h5uaNH0';

export const supabase = createClient(URL, API_KEY);