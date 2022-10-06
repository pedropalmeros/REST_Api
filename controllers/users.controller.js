const{ response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/roles');


const usersGet = async (req,res) => {
    const usuarios = await User.find();
    res.json({
        msg: 'get Api - modules',
        usuarios
    })
}

const usersPut = async(req,res) => {
    const {userId} = req.params;
    const { _id, password, google, ...reminderData } = req.body;

    // TODO Validate if the id exsits in Data Base
    if(password){
        const salt = bcryptjs.genSaltSync(10);
        reminderData.password = bcryptjs.hashSync(password,salt);
    }

    const  user = await User.findByIdAndUpdate(userId, reminderData);

    
    res.json({
        msg: 'put Api - modules',
        user
    })
}

const usersPost = async (req,res) => {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password,role});

    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password,salt);


    await user.save();

    res.json({
        msg: 'post Api - modules',
        user
    })
}

const usersDelete = async(req,res) => {

    const userAuth = req.user;

    const user = await User.findByIdAndDelete(userAuth.id);

    res.json({
        msg: 'delete Api - modules', 
        user
    })
}

const usersPatch = (req,res) => {

    res.json({
        msg: 'patch Api - modules'
    })
}


module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}