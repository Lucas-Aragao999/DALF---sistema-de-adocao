// tutor.routes.js
import { Router } from 'express'
import { supabase } from '../data/database.js' // importa a conexão
import { v4 as uuid } from 'uuid'

const router = Router()

// Criar tutor (Esta lógica será movida para o register do authController.js)
// Como o authController já fará o registro completo, você pode remover ou manter esta rota.
// MANTENHA A ROTA DE CRIAÇÃO, mas mova a lógica de registro para o authController
router.post('/', async (req, res) => {
    // ... (Seu código original para criar tutor)
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

// ** IMPORTANTE: REMOVA A ROTA DE LOGIN DAQUI **
// A rota abaixo deve ser REMOVIDA, pois está agora em auth.routes.js (no caminho /auth/login)
/*
router.post('/login', async (req, res) => { ... }); 
*/

export default router