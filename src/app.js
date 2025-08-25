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
    const { id, tutor_id, animal_id, status, posicao_fila, criado_em, createAt } = request.body

    const doacoes = { 
        id, 
        tutor_id, animal_id, 
        status, 
        posicao_fila, 
        criado_em, 
        createAt,
    }
});
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
    const { doacao_id, nome, email, valor, mensagem, linkPix, qrcode, createAt } = request.body

    const doacoes = {
        doacao_id, 
        nome, 
        email,
        valor,
        mensagem, 
        linkPix, 
        qrcode, 
        createAt,
    }
});
