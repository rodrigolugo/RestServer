const { Router } = require('express');
const { getUsuario, postUsuario, putUsuario, deleteUsuario } = require('../controllers/controller_usuario');

const router = Router();

router.get('/',getUsuario)
router.post('/',postUsuario )
router.put('/:id', putUsuario)
router.delete('/', deleteUsuario)

module.exports = router;