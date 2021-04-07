import { getRepository } from 'typeorm'

import { hash } from 'bcryptjs'

import User, { UserRoleType } from '../models/User'

interface Request {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    isFinding: boolean,
    role: UserRoleType
}

class CreateUserService {
    public async execute({firstName, lastName, phone, email, password, isFinding, role}: Request):Promise<User> {
        const usersRepository = getRepository(User)

        const checkUserExists= await usersRepository.findOne({
            where: [{email}]
        })

        if(checkUserExists){
            throw new Error('Email already used')
        }

        const hashedPassword = await hash(password, 8)

        const user = usersRepository.create({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            role,
            isFinding,
            avatar: 'default.png'
        })

        await usersRepository.save(user)

        return user
    }
}

export default CreateUserService