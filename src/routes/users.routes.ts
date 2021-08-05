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
        role,
        isOng } = request.body

    const createUser = new CreateUserService()
    const authService = new AuthenticateUserService()

    await createUser.execute({
        firstName,
        lastName,
        phone,
        email,
        password,
        isFinding,
        role,
        isOng })

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
        isOng: user.isOng
    }

    return response.status(201).json({user: userReturned, token})

})

export default usersRouter