const {Router} = require('express');
const { check } = require('express-validator');
const { postLogin } = require('../controllers/controller_uath');
const { validarCampos } = require('../middlewares/validacion-campos');

const router = Router();

router.post('/login',[
    check('correo', 'El correo es invalido, porfavor de checarlo').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,postLogin);



module.exports = router;