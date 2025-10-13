// src/routes/questionarios.routes.js
import { Router } from 'express'
import { Questionario } from '../data/database.js' // Model Questionario

const router = Router()

// Criar questionário
router.post('/', async (req, res) => {
    // Note que req.body deve conter o 'tutorId' para a FK
    try {
        const novoQuestionario = await Questionario.create(req.body)

        return res.status(201).json(novoQuestionario)

    } catch (error) {
        console.error("Erro ao criar questionário:", error)
        return res.status(500).json({ error: error.message || 'Erro ao salvar questionário' })
    }
})

// Buscar questionário por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const data = await Questionario.findByPk(id)

        if (!data) return res.status(404).json({ error: 'Questionário não encontrado' })
        return res.json(data)

    } catch (error) {
        console.error("Erro ao buscar questionário:", error)
        return res.status(500).json({ error: error.message || 'Erro ao buscar questionário' })
    }
})

export default router