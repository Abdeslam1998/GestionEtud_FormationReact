import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

import 'express-async-errors'
import morgan from 'morgan'

// db and authenticateUser
import connectDB from './db/connect.js'

// routers
import StudentRouter from './routes/StudentRoute.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
//import authenticatedUser from './middleware/auth.js'


//afficher l'error sous forme : POST /api/v1/auth/register 400 35.018 ms - 30
if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Welcome !')
})

app.use('/api/v1/student', StudentRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log('Server is listening on port ' + port)
        })
    }catch(error){
        console.log(error)
    }
}

start()