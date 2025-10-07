// src/data/index.js
import express from 'express'
// import dotenv from 'dotenv' <--- LINHA REMOVIDA
import { Sequelize } from 'sequelize'

// dotenv.config() <--- LINHA REMOVIDA

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

// ... (resto do código)