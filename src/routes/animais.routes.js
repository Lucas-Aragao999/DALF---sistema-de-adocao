// src/routes/animais.routes.js
import { Router } from 'express'
import { Animal } from '../data/database.js' // Model Animal
import { Op } from 'sequelize'

const router = Router()

// Criar animal (POST /animais)
router.post('/', async (req, res) => {
    const { nome, especie, porte, castrado, vacinado, descricao, foto, adotado } = req.body

    try {
        const novoAnimal = await Animal.create({
            nome, especie, porte, castrado, vacinado, descricao, foto, adotado: adotado || false
        })
        return res.status(201).json(novoAnimal)

    } catch (error) {
        console.error("Erro ao criar animal:", error)
        return res.status(500).json({ error: error.message || 'Erro ao criar animal' })
    }
})

// Buscar animais (GET /animais)
router.get('/', async (req, res) => {
    const { nome, especie } = req.query
    const where = {}

    if (nome) {
        // Equivalente ao ILIKE do Supabase
        where.nome = { [Op.like]: `%${nome}%` } 
    }
    if (especie) {
        where.especie = especie 
    }

    try {
        const data = await Animal.findAll({ where: where })
        return res.json({ data, total: data.length })
    } catch (error) {
        console.error("Erro ao buscar animais:", error)
        return res.status(500).json({ error: error.message || 'Erro ao buscar animais' })
    }
})

// Buscar animal por ID (GET /animais/:id)
router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const data = await Animal.findByPk(id) // Busca pela Primary Key

        if (!data) return res.status(404).json({ error: 'Animal não encontrado' })
        return res.json(data)
    } catch (error) {
        console.error("Erro ao buscar animal:", error)
        return res.status(500).json({ error: error.message || 'Erro ao buscar animal' })
    }
})

export default router