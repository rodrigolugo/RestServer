const Role = require('../models/role');
const Usuario = require('../models/usuario')

const validarRol = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const validarEmail = async (correo = '') => {
    const existeCorreo = await Usuario.findOne({ correo });

    if (existeCorreo) {
        throw new Error('El correo ya existe, utilice otro porfavor');
    }
}

const validarIdUsuario = async (id) => {

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existId = await Usuario.findById(id);
        if (!existId) {
            throw new Error(`El ${id} no existe favor de verificarlo`);
        }

    }
}

module.exports = {
    validarRol,
    validarEmail,
    validarIdUsuario
}