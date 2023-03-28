const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json(
            {
                msg: 'el token es obligatorio'
            }
        )
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leemos el usuario autenticado
        const UsuarioAutenticado = await Usuario.findById(uid);
        
        if (!UsuarioAutenticado || UsuarioAutenticado.estado === false) {
            return res.status(401).json({
                msg: 'El usuario no existe en la base de datos'
            })
        }
        
        req.UsuarioAutenticado = UsuarioAutenticado

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'el token es incorrecto, favor de verificarlo'
        })
    }

    //console.log(token);
}


module.exports = {
    validarJWT
}