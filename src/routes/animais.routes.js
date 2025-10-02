const { Router } = require('express')
const { v4: uuid } = require('uuid')
const { animais } = require('../data/database')

const router = Router()

router.post('/', (req, res) => {
    const { nome, especie, porte, castrado, vacinado, descricao, foto, adotado } = req.body

    const animal = {
        id: uuid(),
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
    }

    animais.push(animal)
    return res.status(201).json(animal)
})

router.get('/', (req, res) => {
    const { nome, especie } = req.query
    let resultados = animais

    if (nome) resultados = resultados.filter(a => a.nome.toLowerCase().includes(nome.toLowerCase()))
    if (especie) resultados = resultados.filter(a => a.especie.toLowerCase() === especie.toLowerCase())

    return res.json({ data: resultados, total: resultados.length })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const animal = animais.find(a => a.id === id)
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' })
    return res.json(animal)
})

module.exports = router