import { getRepository } from 'typeorm'

import { hash } from 'bcryptjs'

import AppError from '../errors/AppError'
import User, { UserRoleType } from '../models/User'

interface Request {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    isFinding: boolean,
    role: UserRoleType,
    isOng: boolean
}

class CreateUserService {
    public async execute({firstName, lastName, phone, email, password, isFinding, role, isOng}: Request):Promise<User> {
        const usersRepository = getRepository(User)

        const checkUserExists= await usersRepository.findOne({
            where: [{email}]
        })

        if(checkUserExists){
            throw new AppError('Email already used', 401)
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
            isOng,
            avatar: 'default.png'
        })

        await usersRepository.save(user)

        return user
    }
}

export default CreateUserService