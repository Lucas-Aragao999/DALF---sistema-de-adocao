const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { supabase } = require('../data/database') // importa o cliente supabase
const config = require('../config')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// Rota de cadastro
router.post('/register', async (req, res) => {
  try {
    const { nome, email, password } = req.body

    // Validação simples
    if (!nome || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' })
    }

    // Criptografa senha
    const hashedPassword = bcrypt.hashSync(password, 8)

    // Insere no Supabase
    const { data, error } = await supabase
      .from('tutores')
      .insert([
        {
          nome_completo: nome,
          email,
          senha: hashedPassword,
          createdAt: new Date()
        }
      ])
      .select()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    const tutor = data[0]

    
    const token = jwt.sign({ id: tutor.id }, config.secret, {
      expiresIn: 86400 
    })

    return res.status(201).json({ auth: true, token, tutor })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro no servidor' })
  }
})

module.exports = router
