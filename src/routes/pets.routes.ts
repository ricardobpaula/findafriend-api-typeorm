import { Router } from 'express'
import { getRepository } from 'typeorm'

import Pet from '../models/Pet'

import CreatePetService from '../services/CreatePetService'
import DeletePetService from '../services/DeletePetService'
import UpdatePetService from '../services/UpdatePetService'

const petsRouter = Router()

petsRouter.get('/', async (request, response) => {
    const petsRepository = getRepository(Pet)

    const pets = await petsRepository.find({
        select: ['id', 'name', 'description','specie','size']
    })
    
    return response.status(200).json({ pets })
    
})

petsRouter.post('/', async (request, response) => {
    
    const createPet = new CreatePetService()
    
    const {
        name, 
        description,
        specie,
        size
    } = request.body

    const owner = request.cookies.user_id

    const pet = await createPet.execute({name, description, specie, size, owner })

    return response.status(201).json(pet)

})

petsRouter.put('/:id', async (request, response) => {
    const petUpdate = new UpdatePetService()
    const {
        name, 
        description,
        specie,
        size
    } = request.body

    const id = Number(request.params.id)

    const pet = petUpdate.execute({id, name, description, specie, size})

    return response.status(200).json(pet)

})

petsRouter.delete('/:id', async (request, response) => {

    const deletePet = new DeletePetService()

    const id = Number(request.params.id)

    const pet = await deletePet.execute(id)

    return response.status(200).json({message: `Pet ${pet.name} Deleted`})
})

export default petsRouter