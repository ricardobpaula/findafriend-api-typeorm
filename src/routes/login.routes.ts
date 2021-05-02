import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'
const loginRouter = Router()

loginRouter.post('/',async (request, response) => {
    const {email, password} = request.body

    const authService = new AuthenticateUserService()

    const { user, token } = await authService.execute({
        email,
        password
    })

    const userReturned = {
        id: user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        phone:user.phone,
        email:user.email,
        isFinding:user.isFinding,
        role:user.role,
    }
    
    return response.status(200).cookie('user_id',user.id).json({ user:userReturned, token })
})

export default loginRouter