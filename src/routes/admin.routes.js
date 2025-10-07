// src/routes/admin.routes.js
import { Router } from 'express'
import { supabase } from '../data/database.js' // conexão supabase-js

const router = Router()

// GET - lista todos os animais
router.get('/animais', async (req, res) => {
  const { data, error } = await supabase.from('animais').select('*')
  if (error) return res.status(500).json({ error: error.message })
  return res.json(data)
})

// PATCH - atualiza um animal pelo ID
router.patch('/animais/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase
    .from('animais')
    .update({ ...req.body, updatedAt: new Date() })
    .eq('id', id)
    .select()

  if (error) return res.status(500).json({ error: error.message })
  if (!data.length) return res.status(404).json({ error: 'Animal não encontrado' })

  return res.json({ message: `Animal ${id} atualizado pelo admin!`, animal: data[0] })
})

// DELETE - deleta um animal pelo ID
router.delete('/animais/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase
    .from('animais')
    .delete()
    .eq('id', id)
    .select()

  if (error) return res.status(500).json({ error: error.message })
  if (!data.length) return res.status(404).json({ error: 'Animal não encontrado' })

  return res.json({ message: `Animal ${id} deletado pelo admin!` })
})

export default router
