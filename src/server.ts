import 'reflect-metadata'

import cors from 'cors'
import express from 'express'

import dotenv from 'dotenv'

const app = express()

dotenv.config()

app.use(cors());
app.use(express.json())

app.get('/api/',(request, response) => {
    response.json({message: 'Hello World'})
})

app.listen(process.env.APP_PORT, () => {
    console.log(`Server started on port: ${process.env.APP_PORT}`)
})