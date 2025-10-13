// app.js
import express, { json } from 'express'
import 'dotenv/config' 

// Importa o database.js para iniciar a conexão SQLite e a sincronização dos modelos
import './src/data/database.js' 

const port = 3000
import animaisRoutes from './src/routes/animais.routes.js'
import tutoresRoutes from './src/routes/tutores.routes.js'
import questionarioRoutes from './src/routes/questionario.routes.js' // Corrigido o nome do arquivo
import adocoesRoutes from './src/routes/adocoes.routes.js'
import doacoesRoutes from './src/routes/doacoes.routes.js'
import adminRoutes from './src/routes/admin.routes.js'
import authRoutes from './src/routes/auth.routes.js'

const app = express()
app.use(json())

// Configuração das Rotas
app.use('/auth', authRoutes)
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