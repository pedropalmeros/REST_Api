const {response, request, json } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateWebToken');
const { googleValidator } = require('../helpers/googeValidator');



const login = async(req, res = response ) =>{
    const { email, password} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                msg:"User/Password incorrect - user"
            })
        }


        const validPassword = bcryptjs.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: "User/Password incorrect - password"
            })
        }

        const token = await generateJWT(user.id);


    
        res.json({
            msg: "all ok till now",
            user,
            token
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'INTERNAL ERROR: Reach out the administrator'
        });
    }
}

const googleSignIn = async(req = request, res = response) => {
    console.log(req.body);

    const {id_token} = req.body;
    
    try{
        const { email, name, img} = await googleValidator(id_token);

        let user = await User.findOne({email});
        if( !user ){// User does not exist
            const data = { // Creating the data for the user
                name,
                email,
                password: 'Not_Needed',
                role: 'USER_ROLE',
                img,
                google: true
            }

            user = new User( data );
            await user.save();
        }


        const token = await generateJWT(user.id);


        res.json({
            msg: "All OK till now",
            name,
            email
            
        })
    } catch (error){
        json.status(400).json({
            ok: false,
            msg: 'Invalid GOOGLE Token'
        })

    }




}

module.exports = {
    login,
    googleSignIn
}