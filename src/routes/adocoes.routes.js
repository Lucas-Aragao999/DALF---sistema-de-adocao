const { Router } = require('express')
const { v4: uuid } = require('uuid')
const { adocoes } = require('../data/database')

const router = Router()

router.post('/', (req, res) => {
    const { tutor_id, animal_id, status, posicao_fila } = req.body

    const adocao = {
        id: uuid(),
        tutor_id,
        animal_id,
        status: status || "em_analise",
        posicao_fila: posicao_fila || 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    adocoes.push(adocao)
    return res.status(201).json(adocao)
})

module.exports = router
