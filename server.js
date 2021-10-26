
require('dotenv').config({path:"./config.env"})

const express =  require('express');
var MongoDBUtil = require('./config/mongodb/modules/mongodb/mongodb.module').MongoDBUtil;
const errorHandler=require('./middleware/error');
const createRoles=require('./lib/inicioSetup')
var logger = require('morgan');
const cors=require("cors");



 // Use this after the variable declaration
////connections
MongoDBUtil.init();

var app=express();


app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://proyectominticfront4.herokuapp.com/"
      ],
     
      
      allowedOriginsPatterns: [],
      allowedHeaders:['*'],
      allowedMethods:['*'],
      exposedHeaders: [],
      maxAg: 0,
      credentials: true, //allow setting of cookies,
  

    })
  );
app.use(logger('dev'));
createRoles();
app.use(express.json());

app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))
app.use('/api/home', require('./routes/home'))
app.use('/api/products', require('./routes/products'))
app.use('/api/ventas', require('./routes/ventas'))

////error handler last middleware
app.use(errorHandler)

const PORT= process.env.PORT || 3001;

app.listen(PORT,()=>console.log(`server running on port ${PORT}`));

module.exports= app;