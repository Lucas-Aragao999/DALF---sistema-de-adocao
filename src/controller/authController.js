// src/controller/authController.js
import { supabase } from '../data/database.js'
import { v4 as uuid } from 'uuid'

// Lógica de Registro (POST /auth/register)
const register = async (req, res) => {
    const { nome_completo, senha, email, cidade, estado, idade, telefone, instagram, facebook } = req.body

    const novoTutor = {
        id: uuid(), nome_completo, senha, email, cidade, estado, idade, telefone, instagram, facebook,
        created_at: new Date(), updated_at: new Date()
    }

    const { data, error } = await supabase.from('tutores').insert([novoTutor]).select()

    if (error) {
        if (error.code === '23505') { 
             return res.status(409).json({ error: 'Email já cadastrado.' })
        }
        return res.status(500).json({ error: error.message })
    }
    return res.status(201).json(data[0])
}

// Lógica de Login (POST /auth/login)
const login = async (req, res) => {
    const { email, senha } = req.body
    
    const { data, error } = await supabase
        .from('tutores')
        .select('*')
        .eq('email', email)
        .eq('senha', senha)
        .single()
    
    if (error || !data) {
        // Assume que qualquer erro aqui é de credenciais inválidas
        return res.status(401).json({ error: 'Credenciais inválidas' })
    }
    
    return res.json({ message: 'Login realizado!', tutor: data })
}

export default {
    register,
    login
}