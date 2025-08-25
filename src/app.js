const express = require ('express');
const app = express();
const uuid = require ('uuidv4')
const port = 3333

app.post('/animais', (request, response) => {
    const { nome, especie, porte, castrado, vacinado, descricao, foto, adotado, createAt } = request.body

    const animais = {
        nome,
        especie,
        porte,
        castrado,
        vacinado,
        descricao,
        foto,
        adotado,
        createAt,
    };

    response.json({ message: "Hello, world"})

    

})

app.post('/tutores', (request, response) => {
    const { nome_completo, senha, email, cidade, estado, idade, telefone, instagram, facebook } = request.body
    
    const tutores = {
            id,
            nome_completo,
            senha,
            email,
            cidade,
            estado,
            idade,
            telefone,
            instagram,
            facebook
    }
    const id = uuidv4();
})

app.get('/animais', (request, response) => {
    response.json({ message : "Hello, World!!!"})

    const responseData = {
        data: animais,
        total: animais.length
    };
    return response.json(responseData);
})

app.patch('/tutores:id', (request, response) => {

})

app.get('/tutores:id', (request, response) => {

})
app.post('/questionario', (request, response) => {

})
app.post('/adocoes', (request, response) => {

})
app.get('/admin/animais', (request, response) => {

})

app.patch('/admin/animais:id', (request, response) => {

})

app.delete('/admin/animais:id', (request, response) => {

})

app.get('/animais:id', (request, response) => {

})

app.post('/login', (request, response) => {

})      

app.post('doacoes', (request, response) => {
    
})

app.listen(3333, () => {
    console.log(`🚀 servidor rodando na port ${port} `)
})