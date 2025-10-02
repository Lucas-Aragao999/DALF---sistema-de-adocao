import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('As variáveis SUPABASE_URL e SUPABASE_KEY não estão configuradas no .env');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Funções para interagir com o banco de dados

// Animais
export async function getAnimais() {
    const { data, error } = await supabase.from('animais').select('*');
    if (error) {
        console.error('Erro ao buscar animais:', error);
        return [];
    }
    return data;
}

export async function addAnimal(animal) {
    const { data, error } = await supabase.from('animais').insert([animal]);
    if (error) {
        console.error('Erro ao adicionar animal:', error);
        return null;
    }
    return data;
}

// Tutores
export async function getTutores() {
    const { data, error } = await supabase.from('tutores').select('*');
    if (error) {
        console.error('Erro ao buscar tutores:', error);
        return [];
    }
    return data;
}

export async function addTutor(tutor) {
    const { data, error } = await supabase.from('tutores').insert([tutor]);
    if (error) {
        console.error('Erro ao adicionar tutor:', error);
        return null;
    }
    return data;
}

// Exporte as funções para uso em outros arquivos
export default {
    getAnimais,
    addAnimal,
    getTutores,
    addTutor,
};