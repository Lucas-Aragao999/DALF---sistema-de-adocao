const express = require('express')
const port = 3333
const animaisRoutes = require('./routes/animais.routes')
const tutoresRoutes = require('./routes/tutores.routes')
const questionarioRoutes = require('./routes/questionario.routes')
const adocoesRoutes = require('./routes/adocoes.routes')
const doacoesRoutes = require('./routes/doacoes.routes')
const adminRoutes = require('./routes/admin.routes')

const authController = require('./controller/authController')

const app = express()
app.use(express.json())

app.use('/auth', authController)

app.use('/animais', animaisRoutes)
app.use('/tutores', tutoresRoutes)
app.use('/questionario', questionarioRoutes)
app.use('/adocoes', adocoesRoutes)
app.use('/doacoes', doacoesRoutes)
app.use('/admin', adminRoutes)

app.listen(3333, () => {
    console.log(`🚀 servidor rodando na port ${port} `)
})

module.exports = app
