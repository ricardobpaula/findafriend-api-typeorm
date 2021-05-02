import { Request, Response, NextFunction} from 'express'
import AppError from '../errors/AppError'
import jwt from 'jsonwebtoken'
import jwtConfig from '../config/auth'

const sessionChecker = ((request:Request, response:Response, next:NextFunction) => {

    if (request.headers.authorization) {

        try {
            const token = request.headers.authorization.split(' ')[1]
            const tokenDecoded = jwt.decode(token)
            const { user_id } = request.cookies
            const tokenVerified = jwt.verify(token, jwtConfig.secret)
            
            if(!tokenVerified || user_id != tokenDecoded?.sub){
                throw new AppError('Cannot validate user',401)
            }

            next()

        }catch(error){
            throw new AppError(error.message,401)
        }
    } else {
        throw new AppError('No User Session Found',401)
    }
})
 
export default sessionChecker