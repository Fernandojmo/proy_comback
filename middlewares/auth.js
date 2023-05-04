const { expressjwt } = require('express-jwt');
require('dotenv').config();

// se crea la funcion para obtener el token
const getToken = (req,res,next) => {
    const { authorization } = req.headers;
//se revisa si existe el token en headers
    if(authorization){
        //si existe se separa el tipo de token y el token
        const [type, token] = authorization.split(' ');
        //se returna el token si el tipo es Bearer
        return type === 'Bearer' ? token : null;
    }
    //si no existe se devuelve null
    return null;
}

// se crea el middleware para validar el token
const auth = expressjwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: 'user',
    getToken
}) 
// se exporta el middleware
module.exports = auth;