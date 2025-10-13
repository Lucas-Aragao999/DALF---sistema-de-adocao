// src/routes/doacoes.routes.js
import { Router } from 'express'
import { Doacao } from '../data/database.js' // Model Doacao

const router = Router()

// Criar doação
router.post('/', async (req, res) => {
    const { nome, email, valor, mensagem, linkPix, qrcode } = req.body

    try {
        const novaDoacao = await Doacao.create({
            nome, email, valor, mensagem, linkPix, qrcode
        })

        return res.status(201).json(novaDoacao)

    } catch (error) {
        console.error("Erro ao criar doação:", error)
        return res.status(500).json({ error: error.message || 'Erro ao processar doação' })
    }
})

export default router