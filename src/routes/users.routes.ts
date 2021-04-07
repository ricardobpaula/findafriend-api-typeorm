import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'

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

    const user = await createUser.execute({
        firstName,
        lastName,
        phone,
        email,
        password,
        isFinding,
        role })

    const userReturned = {
        id: user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        phone:user.phone,
        email:user.email,
        isFinding:user.isFinding,
        role:user.role,
    }

    return response.status(201).json(userReturned)

})

export default usersRouter