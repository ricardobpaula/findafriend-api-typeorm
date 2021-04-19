import { request, response, Router } from 'express'

const petsRouter = Router()

petsRouter.get('/', (request, response) => {
    return response.json({ ok: true })
    
})

export default petsRouter