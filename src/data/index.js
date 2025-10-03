// src/index.js
import express from 'express'
import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

// conexão com Postgres (Supabase)
export const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false
  }
)

const app = express()
app.use(express.json())

// testar conexão
try {
  await sequelize.authenticate()
  console.log('✅ Conectado ao PostgreSQL do Supabase!')
} catch (err) {
  console.error('❌ Erro na conexão:', err)
}

// importar rotas
import adminRoutes from './routes/admin.routes.js'
app.use('/admin', adminRoutes)

app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000')
})
