// se trae el schema de usuario 
const User = require('../models/User');

// se trae el modulo de encriptacion de contraseñas
const crypto = require('crypto');
const { find } = require('../models/User');


// crear un usuario
const createUser = async (req, res) => {
try {

    // validación de email
    // guarda en la variable userEmail el resultado de la busqueda de un usuario con el email que nos llega por el body
    const userEmail = await User.findOne({ email: req.body.email });

    // si el email ya esta registrado devolvemos un json con el mensaje de error
    if (userEmail) {
        return res.status(400).json({ success: false, message: "El email ya esta registrado" });
    }

    //! metodo para encriptar en el controller
    // se crea la salt ramdon y encriptada para agregar a la contraseña encriptada
    // const salt= crypto.randomBytes(10).toString('hex');

    // encriptacion de la contraseña
    // syntaxis = crypto.pbkdf2Sync(password, secret_key, iterations, key_length, digest_algorithm).toString('hex');
    // password corresponde a la contraseña que nos llega por el body
    // secret_key o salt corresponde a una variable que se genera aleatoriamente para encriptar la contraseña
    // iterations corresponde a la cantidad de veces que se va a encriptar la contraseña
    // key_length corresponde a la longitud de la contraseña encriptada
    // digest_algorithm corresponde al algoritmo de encriptacion
    // .toString('hex') convierte el resultado en hexadecimal
    // const hash = crypto.pbkdf2Sync(req.body.password, salt, 5000, 8, 'sha-512').toString('hex');

    // Crear una variable que guarde la informacion del usuario
    // se le pasa al schema User un spread operator req.body y la contraseña encriptada
    // const newUser = new User({...req.body, password: hash, salt});

    //! metodo para encriptar con función en el schema User

    const newUser = new User(req.body);
    newUser.hashPassword(req.body.password);
    // Guardar la informacion en la base de datos
    await newUser.save();
    
    // devolvemos la respuesta con el status 201 y el json con el mensaje de usuario creado
    res.status(201).json({ success: true, message:"usuario creado" , info:newUser, token: newUser.generateJWT()});
} catch (error) {
    res.status(400).json({ success: false, error });
}
}

// obtener todos los usuarios
const getUsers = async (req, res) => {
try {
    // buscamos todos los usuarios con el metodo find()
    // guardamos todos los usuarios en la variable users
    const users = await User.find();
    // devolvemos la respuesta con el status 200 y el json con la informacion de los usuarios
    res.status(200).json({ success: true, info: users });
} catch (error) {
    // devolvemos la respuesta con el status 400 y el json con el error
    res.status(400).json({ success: false, error });
}
}

// editar un usuario
const editUser = async (req, res) => {
    try {
        // obtenemos el id del usuario que nos llega por la url
        const { id } = req.params;
        // obtenemos la informacion que nos llega por el body
        const contain = req.body
        
        // buscamos el usuario por el id que nos llega por la url
        const user = await User.findById(id);

        // si no existe el usuario devolvemos un error
        if (!user) {
            // devolvemos la respuesta con el status 404 y el json con el error de usuario no encontrado
            return res.status(404).json({ success: false, message: "usuario no encontrado" });
        }

        // si existe el usuario, actualizamos la informacion con el metodo updateOne()
        else {
            // le pasamos el id del usuario y la informacion que queremos actualizar
            // guardamos el usuario en la variable user
            //
            const userUpdate = await User.findByIdAndUpdate(id, contain, {new:true});
            return res.status(200).json({ success: true, message: "usuario actualizado", info: userUpdate });
        }

    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

// iniciar sesion
const logIn = async (req, res) => {
    try {
        // se obtiene el email y la contraseña que nos llega por el body y se guarda en email y password
        const { email, password } = req.body;

        // se busca el usuario segun el email que nos llega por el body
        const user= await User.findOne({ email });

        // si no existe el usuario devolvemos un error
        if (!user) {
            // devolvemos la respuesta con el status 400 y el json con el error de usuario no registrado
            return res.status(400).json({ success: false, message: "El email no esta registrado" });
        }

        // metodo para validar la contraseña en el controller, luego se cambia la validación en el if a continuación
        // si existe el usuario, se encripta la contraseña que nos llega por el body con el salt del usuario
        // const hash = crypto.pbkdf2Sync(password, user.salt, 5000, 8, 'sha-512').toString('hex');


        // metodo para validar contraseña con función en el schema User
        const validateHash = user.validatePassword(password, user.salt, user.password)

        // si la contraseña encriptada es diferente a la contraseña encriptada del usuario, devolvemos un json con el mensaje de email o contraseña incorrectos
        if (!validateHash) {
            return res.status(200).json({ success: true, message: "Email o contraseña incorrectos", info: user });
        }

        // si la contraseña encriptada es igual a la contraseña encriptada del usuario, devolvemos un json con el mensaje de usuario logueado
        res.json({ success: true, message: "usuario logueado", info: user, token: user.generateJWT()});

        
    // si hay un error, devolvemos un json con el error
    }catch (error) {
        // devolvemos la respuesta con el status 500 y el json con el error
        res.status(500).json({ success: false, message: error.message });
    }
}

// exportamos las funciones
module.exports = { createUser, getUsers, editUser, logIn };