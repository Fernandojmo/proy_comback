const express=require('express');
const userRouter=require('./routes/userRoutes');
// const productRouter=require('./routes/productRoutes');
const cors =require("cors");

require('dotenv').config();

//se trae la coneccion de la base de datos y el servidor
require('./config/database');

//instanciamos express
const app =express();
//middelwares
app.use(cors());
app.use(express.json());
app.use(userRouter);

// app.use(productRouter);

app.listen(process.env.PORT,()=>console.log(`Servidor conectado en puerto: ${process.env.PORT}`))
