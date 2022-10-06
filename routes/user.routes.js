
const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet }    = require('../controllers/users.controller');
const { usersPut }    = require('../controllers/users.controller');
const { usersPost }   = require('../controllers/users.controller');
const { usersDelete } = require('../controllers/users.controller');
const { usersPatch }  = require('../controllers/users.controller');

const { validateFields }    = require('../middlewares/validateFields');
const { validateJWT }       = require('../middlewares/validateJWT');
const { validateAdminRole } = require('../middlewares/validateRole');

const { isValidRole } = require('../helpers/dataBaseValidators');
const { emailExists } = require('../helpers/dataBaseValidators');
const { userExistsById } = require('../helpers/dataBaseValidators');


const router = Router();

router.get('/',usersGet);

router.put('/:userId',[
    check('userId','Id is not valid').isMongoId(),
    check('userId').custom(userExistsById),
    validateFields
],usersPut);

router.post('/',[
    check('email','Email is not valid').isEmail(),
    check('name','Name is mandatory').not().isEmpty(),
    check('password','The password is mandatory and it should be greater than six characters').isLength({min: 6}),
    check('role').custom(isValidRole),
    check('email').custom(emailExists),
    validateFields,
],usersPost);

router.delete('/:userId',[
    validateJWT,
    validateAdminRole,
    check('userId','Id is not valid').isMongoId(),
    check('userId').custom(userExistsById),
    validateFields
],usersDelete);

router.patch('/',usersPatch);





module.exports = router; 