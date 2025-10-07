// app.js
import express, { json } from 'express'
import 'dotenv/config' // CORRETO: Carrega o .env antes de tudo

const port = 5432
import animaisRoutes from './src/routes/animais.routes.js'
import tutoresRoutes from './src/routes/tutores.routes.js'
import questionarioRoutes from './src/routes/questionario.routes.js'
import adocoesRoutes from './src/routes/adocoes.routes.js'
import doacoesRoutes from './src/routes/doacoes.routes.js'
import adminRoutes from './src/routes/admin.routes.js'

import authRoutes from './src/routes/auth.routes.js' // Roteador de autenticação (solução do problema inicial)

const app = express()
app.use(json())

app.use('/auth', authRoutes) // Agora aponta para um Router válido

app.use('/animais', animaisRoutes)
app.use('/tutores', tutoresRoutes)
app.use('/questionario', questionarioRoutes)
app.use('/adocoes', adocoesRoutes)
app.use('/doacoes', doacoesRoutes)
app.use('/admin', adminRoutes)

app.listen(port, () => {
    console.log(`🚀 servidor rodando na port ${port} `)
})

export default app