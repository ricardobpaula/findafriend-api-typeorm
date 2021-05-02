import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Pet, { PetSizeType, PetSpecieType } from '../models/Pet'
import User from '../models/User'

interface Request {
    name: string,
    description: string,
    specie: PetSpecieType,
    size: PetSizeType,
    owner: number,
}

interface Response {
    name: string,
    description: string,
    specie: PetSpecieType,
    size: PetSizeType,
}

class CreatePetService {
    
    public async execute({name, description, specie, size, owner}:Request): Promise<Response>{
        const petRepository = getRepository(Pet)
        const userRepository = getRepository(User)

        const user = await userRepository.findOne(owner)

        if (!user) {
            throw new AppError('User not found', 401)
        }

        const petCreated = petRepository.create({
            name,
            description,
            specie,
            size,
            owner:user,
        })

        const pet = {
            name: petCreated.name,
            description: petCreated.description,
            specie: petCreated.specie,
            size: petCreated.size,
        }

        await petRepository.save(petCreated)

        return pet

    }
}

export default CreatePetService

