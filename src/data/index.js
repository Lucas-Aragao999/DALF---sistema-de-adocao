import dotenv from 'dotenv'

dotenv.config()
export const sequelize = new sequelize({
    username: 'postegres',
    password: 'dalfAdocoes@2025',
    database: 'postegres',
    host: 'https://srhtsvvrxafpeoypnksx.supabase.co/',
    port: 5432,
    dialect: 'postgres',
    loggin: false
})