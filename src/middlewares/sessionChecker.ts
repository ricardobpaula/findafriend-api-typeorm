import { Request, Response, NextFunction} from 'express'
import AppError from '../errors/AppError'
import jwt from 'jsonwebtoken'
import jwtConfig from '../config/auth'

const sessionChecker = ((request:Request, response:Response, next:NextFunction) => {

    if (request.headers.authorization) {

        const token = request.headers.authorization.split(' ')[1]
        const tokenVerified = jwt.verify(token, jwtConfig.secret)

        if(tokenVerified){
            console.log('User found')
        }else{
            throw new AppError('Cannot validate token',401)
        }

        next()
    } else {
        throw new AppError('No User Session Found',401)
    }
})
 
export default sessionChecker