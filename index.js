const express=require('express');
const userRouter=require('./routes/userRoutes');
// const productRouter=require('./routes/productRoutes');

require('dotenv').config();

//se trae la coneccion de la base de datos y el servidor
require('./config/database');

//instanciamos express
const app =express();
app.use(express.json());
app.use(userRouter);
// app.use(productRouter);

app.listen(process.env.PORT,()=>console.log(`Servidor conectado en puerto: ${process.env.PORT}`))
