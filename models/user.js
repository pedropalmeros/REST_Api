
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true,'Error: NAME is mandatory']
    },
    email:{
        type: String,
        required: [true, 'Error: EMAIL is mandatory'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'Error: PASSWORD is mandatory']
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

UserSchema.methods.toJSON = function(){
    const {__v,password,_id,...userData} = this.toObject();
    userData.id = _id;
    return userData;
}

module.exports = model('User',UserSchema);