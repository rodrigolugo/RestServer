const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { getJWToken } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');





const postLogin = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son validos - correo'
            })
        }
        //si el usuario esta activo en la base de datos 
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son validos - estado'
            })
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son validos - password'
            })
        }
        //generar el jtw
        const token = await getJWToken(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable on el administrador.'
        })
    }
}

const googleLogin = async(req = request, res = response) =>{
    
    
    const {id_token} = req.body;

    try {

        const {nombre, correo, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo})

       
        if (!usuario) {
            const data = {
               nombre,
               correo,
               password: ':P',
               img,
               rol: 'USER_ROLE',
               google: true 
            }

            usuario = new Usuario(data);
            await usuario.save();
        }


        //vañlidar que el usuario no este bloqueado
        if(!usuario.estado){
            res.status(401).json({
                msg: `El usuario ${correo} esta bloqueado favor de contactar al administrador`
            })
        }

        //generar el jtw
        const token = await getJWToken(usuario.id);

        res.json({
            msg: 'inicio de sesion corrrectamente con google sing',
            usuario,
            token
        })
        
    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: `El token:${id_token} no es valido`
        })
    }

   
}

module.exports = {
    postLogin,
    googleLogin
}