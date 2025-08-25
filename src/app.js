const express = require('express')
const { v4: uuid } = require('uuid') // importa corretamente o uuid
const app = express()
const port = 3333

// aprendam sobre Middleware, é mtoo importante
app.use(express.json())
//NUNCAA ESQUE DO RETURN

app.post('/animais', (request, response) => {
    const { nome, especie, porte, castrado, vacinado, descricao, foto, adotado, createAt } = request.body

    const animal = {
        id: uuid(),
        nome,
        especie,
        porte,
        castrado,
        vacinado,
        descricao,
        foto,
        adotado,
        createAt
    }

    return response.status(201).json(animal)
})

app.get('/animais', (request, response) => {
    const { nome, especie } = request.query

    console.log('Nome:', nome)
    console.log('Espécie:', especie)

    const responseData = {
        data: animais,
        total: animais.length
    };
    return response.json(responseData);
})

app.get('/animais/:id', (request, response) => {
    const { id } = request.params
    return response.json({ message: `Detalhes do animal ${id}` }) //to usando crase por gosto pessoal mesmo
})

// Rotas de tutores
app.post('/tutores', (request, response) => {
    return response.json({ message: 'Tutor cadastrado!' })
})
app.post('/questionario', (request, response) => {

    })

app.get('/tutores/:id', (request, response) => {
    const { id } = request.params
    return response.json({ message: `Tutor ${id}` })
})

app.patch('/tutores/:id', (request, response) => {
    const { id } = request.params
    return response.json({ message: `Tutor ${id} atualizado!` })
})

// Rotas de admin (animais)
app.get('/admin/animais', (request, response) => {
    return response.json(['Animal admin 1', 'Animal admin 2'])
})

app.patch('/admin/animais/:id', (request, response) => {
    const { id } = request.params
    return response.json({ message: `Animal ${id} atualizado pelo admin!` })
})

app.delete('/admin/animais/:id', (request, response) => {
    const { id } = request.params
    return response.json({ message: `Animal ${id} deletado pelo admin!` })
})

// Outras rotas
app.post('/questionario', (request, response) => {
    return response.json({ message: 'Questionário recebido!' })
})

app.post('/adocoes', (request, response) => {
    return response.json({ message: 'Adoção registrada!' })
})

app.post('/login', (request, response) => {
    return response.json({ message: 'Login realizado!' })
})

app.post('/doacoes', (request, response) => {
    return response.json({ message: 'Doação registrada!' })
})

app.listen(3333, () => {
    console.log(`🚀 servidor rodando na port ${port}`)
})
