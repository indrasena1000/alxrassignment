
const jwt = require("jsonwebtoken");
const db = require("../models/index")
const bcrypt = require("bcrypt")
exports.register = async (req, res) => {
    try{
        if (!req.body.email || !req.body.password === 'smskadmin') {
            return res.status(400).send("Email and Password Required")
    
        }
        req.body.password = await bcrypt.hash(req.body.password, 8)
        await db.User.create(req.body)
        return res.status(200).send("user created successfully")
    }catch(error){
        return res.status(500).send("Internal server error",error)

    }
    
}


exports.login = async (req, res) => {
    try{
    console.log(req.body)
    if (!req.body.email || !req.body.password) {
        return res.status(400).send("Email and Password Required")
    }

    let user = await db.User.findOne({email:req.body.email})
    if(!user){
        return res.status(404).send("user not Found")

    }
    checkPassword = await bcrypt.compare(req.body.password,user.password)
    if(!checkPassword){
        return res.status(401).send("Incorrect Password")
    }
    const token = await jwt.sign({_id:user._id},"thisistokensecretdonotshare",{expiresIn:"24h"})
    console.log("token",token)
    user.token = token
    user.save()
    res.cookie('jwt', token,{
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
      });
    return res.redirect("/user/dashboard")
}catch(error){
    return res.status(500).send("Internal server error",error)

}
}
