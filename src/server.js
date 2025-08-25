const express = require ('express')
const app = express();
const port = 3333

app.listen(3333, () => {
    console.log(`🚀 servidor rodando na port ${port} `)
})