// src/data/database.js
import { createClient } from '@supabase/supabase-js'
// IMPORTANTE: NÃO INCLUA 'dotenv' AQUI. As variáveis vêm do app.js.

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

// Checagem extra de segurança (ajuda a diagnosticar o 'fetch failed')
if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("❌ ERRO GRAVE: Variáveis SUPABASE_URL ou SUPABASE_KEY estão indefinidas. Verifique seu arquivo .env!")
    // É recomendado parar o processo aqui se o ambiente for crítico.
    // throw new Error('Falha na configuração do Supabase.')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)