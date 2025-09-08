const { Router } = require('express')
const { v4: uuid } = require('uuid')
const { doacoes } = require('../data/database')

const router = Router()

router.post('/', (req, res) => {
    const { nome, email, valor, mensagem, linkPix, qrcode } = req.body

    const doacao = {
        doacao_id: uuid(),
        nome,
        email,
        valor,
        mensagem,
        linkPix,
        qrcode,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    doacoes.push(doacao)
    return res.status(201).json(doacao)
})

module.exports = router
