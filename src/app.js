const express = require('express')
const { v4: uuid } = require('uuid') 
const app = express()
const port = 3333

app.use(express.json())

let animais = []
let tutores = []
let questionarios = []
let adocoes = []
let doacoes = []

app.post('/animais', (req, res) => {
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

app.get('/animais', (req, res) => {
    const { nome, especie } = req.query
    let resultados = animais

    if (nome) resultados = resultados.filter(a => a.nome.toLowerCase().includes(nome.toLowerCase()))
    if (especie) resultados = resultados.filter(a => a.especie.toLowerCase() === especie.toLowerCase())

    return res.json({ data: resultados, total: resultados.length })
})

app.get('/animais/:id', (req, res) => {
    const { id } = req.params
    const animal = animais.find(a => a.id === id)
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' })
    return res.json(animal)
})

app.post('/tutores', (req, res) => {
    const { nome_completo, senha, email, cidade, estado, idade, telefone, instagram, facebook } = req.body

    const tutor = {
        id: uuid(),
        nome_completo,
        senha, 
        email,
        cidade,
        estado,
        idade,
        telefone,
        instagram,
        facebook,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    tutores.push(tutor)
    return res.status(201).json(tutor)
})

app.get('/tutores/:id', (req, res) => {
    const { id } = req.params
    const tutor = tutores.find(t => t.id === id)
    if (!tutor) return res.status(404).json({ error: 'Tutor não encontrado' })
    return res.json(tutor)
})

app.patch('/tutores/:id', (req, res) => {
    const { id } = req.params
    const tutor = tutores.find(t => t.id === id)
    if (!tutor) return res.status(404).json({ error: 'Tutor não encontrado' })

    Object.assign(tutor, req.body, { updatedAt: new Date() })
    return res.json({ message: `Tutor ${id} atualizado!`, tutor })
})

app.post('/questionario', (req, res) => {
    const id = uuid()
    const questionario = { id, ...req.body, createdAt: new Date(), updatedAt: new Date() }

    questionarios.push(questionario)
    return res.status(201).json(questionario)
})

app.get('/questionario/:id', (req, res) => {
    const { id } = req.params
    const q = questionarios.find(q => q.id === id)
    if (!q) return res.status(404).json({ error: 'Questionário não encontrado' })
    return res.json(q)
})

app.post('/adocoes', (req, res) => {
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

app.post('/doacoes', (req, res) => {
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

app.get('/admin/animais', (req, res) => {
    return res.json(animais)
})

app.patch('/admin/animais/:id', (req, res) => {
    const { id } = req.params
    const animal = animais.find(a => a.id === id)
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' })

    Object.assign(animal, req.body, { updatedAt: new Date() })
    return res.json({ message: `Animal ${id} atualizado pelo admin!`, animal })
})

app.delete('/admin/animais/:id', (req, res) => {
    const { id } = req.params
    animais = animais.filter(a => a.id !== id)
    return res.json({ message: `Animal ${id} deletado pelo admin!` })
})

app.post('/login', (req, res) => {
    const { email, senha } = req.body
    const tutor = tutores.find(t => t.email === email && t.senha === senha)
    if (!tutor) return res.status(401).json({ error: 'Credenciais inválidas' })
    return res.json({ message: 'Login realizado!', tutor })
})

app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`)
})
