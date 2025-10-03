// tutor.routes.js
const { Router } = require('express')
const { supabase } = require('../database/db') // importa a conexão
const { v4: uuid } = require('uuid')

const router = Router()

// Criar tutor
router.post('/', async (req, res) => {
  const { nome_completo, senha, email, cidade, estado, idade, telefone, instagram, facebook } = req.body

  const tutor = {
    id: uuid(),
    nome_completo,
    senha,
    email,
    cidade,
    estado,
    idade,
    telefone,
    instagram,
    facebook,
    created_at: new Date(),
    updated_at: new Date()
  }

  const { data, error } = await supabase.from('tutores').insert([tutor])

  if (error) return res.status(400).json({ error: error.message })
  return res.status(201).json(data[0])
})

// Buscar tutor por id
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('tutores').select('*').eq('id', id).single()

  if (error) return res.status(404).json({ error: 'Tutor não encontrado' })
  return res.json(data)
})

// Atualizar tutor
router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase
    .from('tutores')
    .update({ ...req.body, updated_at: new Date() })
    .eq('id', id)
    .select()
    .single()

  if (error) return res.status(404).json({ error: 'Erro ao atualizar' })
  return res.json({ message: `Tutor ${id} atualizado!`, tutor: data })
})

// Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body
  const { data, error } = await supabase
    .from('tutores')
    .select('*')
    .eq('email', email)
    .eq('senha', senha)
    .single()

  if (error || !data) return res.status(401).json({ error: 'Credenciais inválidas' })
  return res.json({ message: 'Login realizado!', tutor: data })
})

module.exports = router
