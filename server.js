const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')

//dot config
dotenv.config(); //({path:'./config/filename})

//mongodb connection
connectDB();

//rest object
const app = express()

//middle wares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//adding routes
app.use('/api/v1/test',require("./routes/testRoutes"));
app.use('/api/v1/auth',require("./routes/authRoutes"));
app.use('/api/v1/inventory',require("./routes/inventoryRoutes"));

//creating port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT,()=>{
    //handleing responses
    // console.log('node server running on port ${process.env.PORT}');
    console.log(`node server running in ${process.env.DEV_MODE} on port ${process.env.PORT}`.bgBlue.white );

});