require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const userRouter = require('./routes/user');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT;
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DATABASE_URL)

app.use('/api/v1/user',userRouter)

app.listen(PORT, (error) => {
    if(!error){
        console.log(`Server is Successfully Running, and App is listening on port  ${PORT}`)
    }
    else{
        console.log("error in port")
    }
})

