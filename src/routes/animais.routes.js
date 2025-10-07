// src/routes/animais.routes.js
import { Router } from 'express'
import { supabase } from '../data/database.js'

const router = Router()

// Criar animal
router.post('/', async (req, res) => {
  const { nome, especie, porte, castrado, vacinado, descricao, foto, adotado } = req.body

  const { data, error } = await supabase
    .from('animais')
    .insert([{
      nome,
      especie,
      porte,
      castrado,
      vacinado,
      descricao,
      foto,
      adotado: adotado || false,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    .select()

  if (error) return res.status(500).json({ error: error.message })
  return res.status(201).json(data[0])
})

// Buscar animais (com filtros opcionais)
router.get('/', async (req, res) => {
  const { nome, especie } = req.query

  let query = supabase.from('animais').select('*')

  if (nome) query = query.ilike('nome', `%${nome}%`)
  if (especie) query = query.ilike('especie', especie)

  const { data, error } = await query
  if (error) return res.status(500).json({ error: error.message })

  return res.json({ data, total: data.length })
})

// Buscar animal por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('animais').select('*').eq('id', id).single()

  if (error) return res.status(404).json({ error: 'Animal não encontrado' })
  return res.json(data)
})

export default router
