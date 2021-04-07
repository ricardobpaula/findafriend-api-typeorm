import 'reflect-metadata'

import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'

import dotenv from 'dotenv'

import 'express-async-errors'
import './database'
import routes from './routes'

const app = express()

dotenv.config()

app.use(cors());
app.use(express.json())

app.use('/api',routes)

// app.get('/api/',(request, response) => {
//     response.json({message: 'Hello World'})
// })

app.use((err: Error, request:Request, response:Response, _: NextFunction) => {
    if (err instanceof Error) {
      return response
        .status(400)
        .json({ status: 'error', message: err.message });
    }
  
    console.error(err);
  
    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  });

app.listen(process.env.APP_PORT, () => {
    console.log(`Server started on port: ${process.env.APP_PORT}`)
})