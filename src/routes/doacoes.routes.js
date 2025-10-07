// src/routes/doacoes.routes.js
import { Router } from 'express'
import { supabase } from '../data/database.js'

const router = Router()

// Criar doação
router.post('/', async (req, res) => {
  const { nome, email, valor, mensagem, linkPix, qrcode } = req.body

  const { data, error } = await supabase
    .from('doacoes')
    .insert([{
      nome,
      email,
      valor,
      mensagem,
      linkPix,
      qrcode,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    .select()

  if (error) return res.status(500).json({ error: error.message })
  return res.status(201).json(data[0])
})

export default router
