const express = require ('express');
const app = express();
const uuid = require ('uuidv4')

app.post('/animais', (request, response) => {
    const { nome, especie, porte, castrado, vacinado, descricao, foto, adotado, createAt } = request.body

    const animais = {
        id,
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

    const id = uuidv4();

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