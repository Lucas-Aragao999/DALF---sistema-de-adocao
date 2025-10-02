const { Router } = require('express')
const { v4: uuid } = require('uuid')
const { questionarios } = require('../data/database')

const router = Router()

router.post('/', (req, res) => {
    const id = uuid()
    const questionario = { 
        id, 
        ...req.body, 
        createdAt: new Date(), 
        updatedAt: new Date() 
    }

    questionarios.push(questionario)
    return res.status(201).json(questionario)
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const q = questionarios.find(q => q.id === id)
    if (!q) return res.status(404).json({ error: 'Questionário não encontrado' })
    return res.json(q)
})

module.exports = router
