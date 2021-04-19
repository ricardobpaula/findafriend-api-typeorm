import {Router} from 'express'

import usersRouter from './users.routes'
import loginRouter from './login.routes'
import petsRouter from './pets.routes'
import sessionChecker from '../middlewares/sessionChecker'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/login', loginRouter)
routes.use('/',sessionChecker)
routes.use('/pets', petsRouter)

export default routes