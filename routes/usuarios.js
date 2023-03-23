const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuario, postUsuario, putUsuario, deleteUsuario } = require('../controllers/controller_usuario');
const { validarRol, validarEmail, validarIdUsuario } = require('../helpers/db-validaciones');
const { validarCampos } = require('../middlewares/validacion-campos');



const router = Router();

router.get('/',getUsuario)
router.post('/',[
    check('nombre', 'El nombre no puede estar vacio').not().isEmpty(),
    check('password', 'La contraseña no debe ser menor a 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( validarEmail ),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE'])
    check('rol').custom( validarRol ),
    validarCampos
],postUsuario )
router.put('/:id',[
    check('id','El id es invalido, favor de checarlo').isMongoId(),
    check('id').custom( validarIdUsuario ),
    //check('rol').custom( validarRol ),
    validarCampos
],putUsuario)
router.delete('/:id',[
    check('id','El id es invalido, favor de checarlo').isMongoId(),
    check('id').custom( validarIdUsuario ),
    validarCampos
], deleteUsuario)

module.exports = router;