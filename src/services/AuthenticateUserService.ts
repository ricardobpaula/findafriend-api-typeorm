import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'

import AppError from './../errors/AppError'
import User from './../models/User'

interface Request {
    email: string
    password: string
  }
  
interface Response {
    user: User
    token: string
}

class AuthenticateUserService {
    public async execute({email,password}:Request): Promise<Response> {
        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne({
            where: { email }
        })

        if(!user){
            throw new AppError('Incorrect user name/password combination', 401)
        }

        const passwordChecked = await compare(password, user.password)

        if(!passwordChecked) {
            throw new AppError('Incorrect user name/password combination', 401)
            
        }

        const { secret, expiresIn } = authConfig

        const token = sign({}, String(secret), {
            subject: user.id.toString(),
            expiresIn,
        })

        return {
            user,
            token
        }
    }
}

export default AuthenticateUserService