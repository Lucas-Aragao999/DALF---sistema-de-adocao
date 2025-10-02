import { supabase } from './src/models/Modelos.js';

// Funções para interagir com o banco de dados

// Buscar animais
export async function getAnimais() {
    const { data, error } = await supabase.from('animais').select('*');
    if (error) {
        console.error('Erro ao buscar animais:', error);
        return [];
    }
    return data;
}

// Buscar tutores
export async function getTutores() {
    const { data, error } = await supabase.from('tutores').select('*');
    if (error) {
        console.error('Erro ao buscar tutores:', error);
        return [];
    }
    return data;
}

// Buscar questionários
export async function getQuestionarios() {
    const { data, error } = await supabase.from('questionarios').select('*');
    if (error) {
        console.error('Erro ao buscar questionários:', error);
        return [];
    }
    return data;
}

// Buscar adoções
export async function getAdocoes() {
    const { data, error } = await supabase.from('adocoes').select('*');
    if (error) {
        console.error('Erro ao buscar adoções:', error);
        return [];
    }
    return data;
}

// Buscar doações
export async function getDoacoes() {
    const { data, error } = await supabase.from('doacoes').select('*');
    if (error) {
        console.error('Erro ao buscar doações:', error);
        return [];
    }
    return data;
}

export default {
    getAnimais,
    getTutores,
    getQuestionarios,
    getAdocoes,
    getDoacoes,
};