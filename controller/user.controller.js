const User = require('../models/User');

// crear un usuario
const createUser = async (req, res) => {
try {
    //* Crear una variable que guarde la informacion del usuario pasandole al schema el req.body
    const newUser = new User(req.body);
    //* Guardar la informacion en la base de datos
    await newUser.save();
    
    res.status(201).json({ success: true, message:"usuario creado" , info:newUser });
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

//
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

module.exports = { createUser, getUsers, editUser };