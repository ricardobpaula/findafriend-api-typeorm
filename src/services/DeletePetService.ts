import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Pet from '../models/Pet'

interface Response {
    name: string    
}

class DeletePetService {
    
    public async execute(id :number): Promise<Response>{
        const petRepository = getRepository(Pet)
        
        const pet = await petRepository.findOne(id)

        if(!pet){
            throw new AppError('Pet not found', 401)
        }

        await petRepository.remove(pet).catch(error => {
            throw new AppError(error,500 );
        })

        return {name: pet.name}
    }
}

export default DeletePetService

