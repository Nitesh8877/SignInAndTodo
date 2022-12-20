
const db=require('../models/index');

const User=db.user;
const Op=db.Sequelize.Op;

var jwt=require('jsonwebtoken');
var bcrypt=require('bcryptjs');


exports.signUp=(req,res)=>{
    User.create({
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)


    })
    .then(()=>{
        res.status(200).send({
            message:"User Register Successfully !"
        });
    })
    .catch((err)=>{
        res.status(500).send({
            message:err.message
        })
    })
}

exports.signIn=(req,res)=>{
    User.findOne({
        where:{
            username:req.body.username
        }
    })
    .then(user=>{
        if(!user){
            return res.status(404).send({
                message:"user not found"
            })
        }
        var pass=bcrypt.compareSync(req.body.password,user.password);
        if(!pass){
            return res.status(404).send({
                message:"invalid password"
            })
        }
        var token=jwt.sign({
            id:user.id
        },"nitesh-secret-key",{
            expiresIn:86400
        })
        res.status(200).send({
            id:user.id,
            username:user.username,
            email:user.email,
            accessToke:token,
        })
    })
    .catch((err)=>{
        res.status(500).send({
            message:err.message
        })
    })
}