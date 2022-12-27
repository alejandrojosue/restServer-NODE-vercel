const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExist, userIdExist } = require('../helpers/db-validators');

const {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
} = require('../controllers/users');



const router = Router();

router.get('/', usersGet);

router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(userIdExist),
        check('rol').custom(esRoleValido),
        validarCampos
    ],
    usersPut);

router.post('/', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('clave', 'La clave debe tener al menos 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExist),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usersPost);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userIdExist),
    validarCampos
], usersDelete);

router.patch('/', usersPatch);

module.exports = router;