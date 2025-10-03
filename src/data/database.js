// src/database.js
const { createClient } = require ('@supabase/supabase-js')
const dotenv = require ('dotenv')

dotenv.config()

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
