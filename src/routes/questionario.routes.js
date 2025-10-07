// src/routes/questionarios.routes.js
import { Router } from 'express'
import { supabase } from '../data/database.js'

const router = Router()

// Criar questionário
router.post('/', async (req, res) => {
  const { data, error } = await supabase
    .from('questionarios')
    .insert([{
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    .select()

  if (error) return res.status(500).json({ error: error.message })
  return res.status(201).json(data[0])
})

// Buscar questionário por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('questionarios').select('*').eq('id', id).single()

  if (error || !data) return res.status(404).json({ error: 'Questionário não encontrado' })
  return res.json(data)
})

export default router
