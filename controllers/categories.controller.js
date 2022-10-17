const {response} = require('express');
const { Category } = require('../models/categories');
const {User} = require('../models/user')


const createCategory = async(req, res = response) => {
    const name = req.body.name.toUpperCase(); 
    console.log('name: ',name);
    
    
    const categoryDB = await Category.findOne({name});


    if( !categoryDB) {
        return res.status(400).json({
            status: false,
            msg: "Course already exists, choose other title"
        });
    }
  // Generate the data to save to the DB
    const data = {
        name,
        user: req.user._id
    }

    console.log(data);

    const category = new Category( {data} ); 

    await category.save();

    res.status(201).json(category);


}


module.exports = {
    createCategory
}