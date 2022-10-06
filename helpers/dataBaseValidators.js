const Role = require('../models/roles')
const User = require('../models/user')

const isValidRole = async( role = '' )=>{
    const rolExists = await Role.findOne({role});
    if( !rolExists ){
        throw new Error(`The role ${role} is unknown`);
    }
}

const emailExists = async(email = '') => {
    const availableEmail = await User.findOne({email});
    if(availableEmail){
        throw new Error(`The email is no longer available`);
    } 
}

const userExistsById = async(userId) =>{

    const availableUser = await User.findById(userId);
    if(!availableUser){
        throw new Error(`Error: User not found`);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userExistsById
}