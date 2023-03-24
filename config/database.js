//se trae mongoose
const mongoose=require('mongoose');
//se configura el modo estricto
mongoose.set('strictQuery',true);
//se conecta a la base de datos cuya ruta esta en el archivo .env MONGODB
mongoose.connect(process.env.MONGODB).then(()=>console.log('Base de datos conectado con exito!!!'));
