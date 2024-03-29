import 'reflect-metadata'

import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'

import dotenv from 'dotenv'

import 'express-async-errors'
import './database'

import AppError from './errors/AppError'
import routes from './routes'

import jwtConfig from './config/auth'

const app = express()

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200
}

dotenv.config()

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())

app.use(session({
  name: 'findafriend',
  secret: jwtConfig.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: jwtConfig.expiresIn
  }
}))

app.use('/api',routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: 'error', message: err.message })
    }
  
    console.error(err)
  
    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' })
  })

app.listen(process.env.APP_PORT, () => {
    console.log(`Server started on port: ${process.env.APP_PORT}`)
})