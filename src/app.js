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
app.patch('/tutores/:id', (request, response) => {

})

// Rotas de tutores
app.post('/tutores/', (request, response) => {
    return response.json({ message: 'Tutor cadastrado!' })
})
app.post('/questionario', (request, response) => {
    const { tutorId, empregado, quantos_animais_possui, motivos_para_adotar, quem_vai_sustentar_o_animal, 
        numero_adultos_na_casa, numero_criancas_na_casa, idades_criancas, residencia_tipo, 
        proprietario_permite_animaistodos_de_acordo_com_adocao, responsavel_pelo_animal, 
        responsavel_concorda_com_adocao, ha_alergico_ou_pessoas_que_nao_gostam, 
        gasto_mensal_estimado, valor_disponivel_no_orcamento, tipo_alimentacao, 
        local_que_o_animal_vai_ficar, forma_de_permanencia, forma_de_confinamento, 
        tera_brinquedos, tera_abrigo, tera_passeios_acompanhado, tera_passeios_sozinho, 
        companhia_outro_animal, companhia_humana_24h, companhia_humana_parcial, sem_companhia_humana,
        sem_companhia_animal, o_que_faz_em_viagem, o_que_faz_se_fugir, o_que_faz_se_nao_puder_criar,
        animais_que_ja_criou, destino_animais_anteriores, costuma_esterilizar, costuma_vacinar, 
        costuma_vermifugar, veterinario_usual, forma_de_educar, envia_fotos_e_videos_do_local, 
        aceita_visitas_e_fotos_do_animal, topa_entrar_grupo_adotantes, concorda_com_taxa_adocao, 
        data_disponivel_para_buscar_animal, createdAt, updatedAt } = request.body

        const questionario = {
            id, 
            tutorId, 
            empregado, 
            quantos_animais_possui, 
            motivos_para_adotar, 
            quem_vai_sustentar_o_animal, 
            numero_adultos_na_casa, 
            numero_criancas_na_casa, 
            idades_criancas, 
            residencia_tipo, 
            proprietario_permite_animaistodos_de_acordo_com_adocao, 
            responsavel_pelo_animal, 
            responsavel_concorda_com_adocao, 
            ha_alergico_ou_pessoas_que_nao_gostam, 
            gasto_mensal_estimado, 
            valor_disponivel_no_orcamento, 
            tipo_alimentacao, 
            local_que_o_animal_vai_ficar, 
            forma_de_permanencia, 
            forma_de_confinamento, 
            tera_brinquedos, 
            tera_abrigo, 
            tera_passeios_acompanhado, 
            tera_passeios_sozinho, 
            companhia_outro_animal, 
            companhia_humana_24h, 
            companhia_humana_parcial, 
            sem_companhia_humana,
            sem_companhia_animal, 
            o_que_faz_em_viagem, 
            o_que_faz_se_fugir, 
            o_que_faz_se_nao_puder_criar,
            animais_que_ja_criou, 
            destino_animais_anteriores, 
            costuma_esterilizar, 
            costuma_vacinar, 
            costuma_vermifugar, 
            veterinario_usual, 
            forma_de_educar, 
            envia_fotos_e_videos_do_local, 
            aceita_visitas_e_fotos_do_animal, 
            topa_entrar_grupo_adotantes, 
            concorda_com_taxa_adocao, 
            data_disponivel_para_buscar_animal, 
            createdAt, 
            updatedAt
        }

        const id = uuidv4();

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
