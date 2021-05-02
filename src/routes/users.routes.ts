import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'
import AuthenticateUserService from '../services/AuthenticateUserService'

const usersRouter = Router()
usersRouter.post('/', async(request, response) => {
    const {
        firstName,
        lastName,
        phone,
        email,
        password,
        isFinding,
        role } = request.body

    const createUser = new CreateUserService()
    const authService = new AuthenticateUserService()

    await createUser.execute({
        firstName,
        lastName,
        phone,
        email,
        password,
        isFinding,
        role })

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

    return response.status(201).cookie('user_id',user.id).json({user: userReturned, token})

})

export default usersRouter