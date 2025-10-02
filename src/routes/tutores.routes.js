const { Router } = require('express')
const { v4: uuid } = require('uuid')
const { tutores } = require('../data/database')

const router = Router()

router.post('/', (req, res) => {
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
        createdAt: new Date(),
        updatedAt: new Date()
    }

    tutores.push(tutor)
    return res.status(201).json(tutor)
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const tutor = tutores.find(t => t.id === id)
    if (!tutor) return res.status(404).json({ error: 'Tutor não encontrado' })
    return res.json(tutor)
})

router.patch('/:id', (req, res) => {
    const { id } = req.params
    const tutor = tutores.find(t => t.id === id)
    if (!tutor) return res.status(404).json({ error: 'Tutor não encontrado' })

    Object.assign(tutor, req.body, { updatedAt: new Date() })
    return res.json({ message: `Tutor ${id} atualizado!`, tutor })
})

router.post('/login', (req, res) => {
    const { email, senha } = req.body
    const tutor = tutores.find(t => t.email === email && t.senha === senha)
    if (!tutor) return res.status(401).json({ error: 'Credenciais inválidas' })
    return res.json({ message: 'Login realizado!', tutor })
})

module.exports = router
module.exports = router.post
