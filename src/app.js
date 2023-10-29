const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors())

require('dotenv').config({path: './src/config/.env'});
const { PORT, ENV } = process.env
const config = require("./config/config");

const BookRoutes = require('./routes/BookRoutes')

app.use(express.json({limit: '25mb'}))
app.use(express.urlencoded({limit: '25mb', extended: true, parameterLimit: 20000000}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next()
})

app.use([BookRoutes]);

// connect database
require("./db/mongoose")(config["databases"][ENV])

app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})