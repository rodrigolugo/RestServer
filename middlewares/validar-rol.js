const { request, response } = require("express")




const tieneRol = (...roles) => {

    return (req = request, res = response, next) => {

        if (!req.UsuarioAutenticado) {
            return res.status(401).json({
                msg: 'se quiere validar usuario sin antes validar el token'
            })
        }

        if (!roles.includes(req.UsuarioAutenticado.rol)) {
            return res.status(401).json({
                msg: `El usuario tiene que tener alguno de estos ${roles} para poder realizar la operacion`
            })
        }

        next();
    }
}


module.exports = {
    tieneRol
}