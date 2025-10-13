// src/routes/adocoes.routes.js
import { Router } from 'express'
import { PedidoAdocao } from '../data/database.js' // Model PedidoAdocao

const router = Router()

// Criar adoção (POST /adocoes)
router.post('/', async (req, res) => {
    // Usando tutorId e animalId conforme as chaves estrangeiras do Sequelize
    const { tutorId, animalId, status, posicao_fila } = req.body 

    try {
        const novoPedido = await PedidoAdocao.create({
            tutorId, 
            animalId,
            status: status || 'em_analise',
            posicao_fila: posicao_fila || 1,
        })

        return res.status(201).json(novoPedido)

    } catch (error) {
        console.error("Erro ao criar pedido de adoção:", error)
        // Se a chave estrangeira (tutorId ou animalId) não existir, o Sequelize falha com 500
        return res.status(500).json({ error: error.message || 'Erro ao criar adoção' })
    }
})

export default router