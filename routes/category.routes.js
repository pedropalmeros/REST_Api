const { Router } = require('express'); 
const { check } = require('express-validator'); 
const { createCategory } = require('../controllers/categories.controller');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT')

const router = Router(); 

// Get all the categories
router.get('/', (req,res)=>{
    res.json('GET ALL Categories');
});


// Get a single category
router.get('/:category_id', (req,res)=>{
    res.json('GET SINGLE Category');
});

// Create a new category
// Any person with a valid token
router.post('/',[
    validateJWT,
    check('name','course name is mandatory').not().isEmpty(),
    validateFields
], createCategory);

// UPDATE Category
// Any person with a valid token
router.put('/', (req,res)=>{
    res.json('PUT - UPDATE Category');
});

// DELETE Category
// USER_ADMIN User
router.delete('/', (req,res)=>{
    res.json('POST - CREATE new category');
});





module.exports = router; 