// src/routes/adocoes.routes.js
const { Router } = require('express')
const { supabase } = require('../data/database')

const router = Router()

// Criar adoção
router.post('/', async (req, res) => {
  const { tutor_id, animal_id, status, posicao_fila } = req.body

  const { data, error } = await supabase
    .from('adocoes')
    .insert([{
      tutor_id,
      animal_id,
      status: status || 'em_analise',
      posicao_fila: posicao_fila || 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    .select()

  if (error) return res.status(500).json({ error: error.message })
  return res.status(201).json(data[0])
})

module.exports = router
