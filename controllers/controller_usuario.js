const { request, response } = require('express');
const { encriptarPass } = require('../helpers/encriptacion');
const Usuario = require('../models/usuario');





const getUsuario = async (req = request, res = response) => {
    const { pageNo, limit = 5 } = req.query
    const query = {estado : true}


    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(pageNo))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        usuarios
    })
}


const postUsuario = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //encriptar el password
    usuario.password = encriptarPass(password);
    await usuario.save();

    res.json({
        msg: 'Usuario creado con exito',
        usuario
    })
}


const putUsuario = async (req = request, res) => {
    const { id } = req.params

    const { _id, password, estado, google, ...resto } = req.body;

    if (password) {
        resto.password = encriptarPass(password);
    }


    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        usuario
    })
}

const deleteUsuario = async (req, res) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id,{estado : false})
    res.json({
        msg: 'User has been deleted succesful.',
        usuario
    })
}

module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}