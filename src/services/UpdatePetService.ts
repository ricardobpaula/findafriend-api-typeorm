import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Pet, { PetSizeType, PetSpecieType } from '../models/Pet'

interface Request {
    id: number,
    name: string,
    description: string,
    specie: PetSpecieType,
    size: PetSizeType
}

interface Response {
    name: string,
    description: string,
    specie: PetSpecieType,
    size: PetSizeType,
}

class UpdatePetService {
    
    public async execute({id, name, description, specie, size}:Request): Promise<Response>{
        const petRepository = getRepository(Pet)
        
        let pet = await petRepository.findOne(id)

        if(!pet){
            throw new AppError('Pet not found', 401)
        }
        
        pet.name = name
        pet.description = description
        pet.specie = specie
        pet.size = size

        await petRepository.save(pet)

        return pet

    }
}

export default UpdatePetService

