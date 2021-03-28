import cors from 'cors'
import express from 'express'

const server = express();

server.use(cors());
server.use(express.json());


server.get('/',(request, response) => {
    response.json({message: 'Hello'})
});

server.listen(3000, () => {
    console.log('Server started on port: 3000')
});