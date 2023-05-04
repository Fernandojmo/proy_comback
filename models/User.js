const mongoose=require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

    // se crea el schema de usuario
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLenght: 2,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLenght: 2,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/g],

    },
    password: {
        type: String,
        required: true,
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,21}$/gm],
    },
    salt: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    birthday: {
        type: Date,
        required: true,
        trim: true,
    },
    favoriteProducts: {
        type: mongoose.Types.ObjectId,
        ref: "product"
    }
})
 
    // se crea el metodo para encriptar la contraseña
userSchema.methods.hashPassword = function(password) {

    // se crea la salt ramdon y encriptada para agregar a la contraseña encriptada
    // se this. para hacer referencia a la variable del schema
    this.salt = crypto.randomBytes(10).toString('hex');
    
    // encriptacion de la contraseña
    // syntaxis = crypto.pbkdf2Sync(password, secret_key, iterations, key_length, digest_algorithm).toString('hex');
    // password corresponde a la contraseña que nos llega por el body
    // secret_key o salt corresponde a una variable que se genera aleatoriamente para encriptar la contraseña
    // iterations corresponde a la cantidad de veces que se va a encriptar la contraseña
    // key_length corresponde a la longitud de la contraseña encriptada
    // digest_algorithm corresponde al algoritmo de encriptacion
    // .toString('hex') convierte el resultado en hexadecimal
    // se utiliza this. para hacer referencia a la variable del schema
    this.password = crypto.pbkdf2Sync(password, this.salt, 5000, 8, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function(password, salt, DBpassword) {
    // se valida la contraseña
    const hash = crypto.pbkdf2Sync(password, salt, 5000, 8, 'sha512').toString('hex');
    return hash === DBpassword;
};

    // se genera el token con el id, nombre y correo del usuario 
userSchema.methods.generateJWT = function() {
    const payload = {
        id: this._id,
        firstname: this.firstname,
        email: this.email,
    };
    const token = jwt.sign(payload,process.env.SECRET, {expiresIn: '1h'});
    return token;
}

    //se crea el modelo de usuario
const User = mongoose.model('user', userSchema);
module.exports = User;
