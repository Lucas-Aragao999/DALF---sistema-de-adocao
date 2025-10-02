const { Router } = require('express')
const { animais } = require('../data/database')

const router = Router()

router.get('/animais', (req, res) => {
    return res.json(animais)
})

router.patch('/animais/:id', (req, res) => {
    const { id } = req.params
    const animal = animais.find(a => a.id === id)
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' })

    Object.assign(animal, req.body, { updatedAt: new Date() })
    return res.json({ message: `Animal ${id} atualizado pelo admin!`, animal })
})

router.delete('/animais/:id', (req, res) => {
    const { id } = req.params
    const index = animais.findIndex(a => a.id === id)
    if (index === -1) return res.status(404).json({ error: 'Animal não encontrado' })

    animais.splice(index, 1)
    return res.json({ message: `Animal ${id} deletado pelo admin!` })
})

module.exports = router
