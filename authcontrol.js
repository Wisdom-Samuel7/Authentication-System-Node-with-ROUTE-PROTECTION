const User = require('./db.js')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports.home = (req,res)=>{
    res.render("../views/home")
}

module.exports.signup_get = (req,res) =>{
    res.render("../views/signup")
}

module.exports.signup_post = async (req,res)=>{
    const {email, password} = req.body
       
    try{
   
      if(!password){
        console.log("please enter a password")

       }
              console.log(password)
            
            const user =  await User.create({email, password})
            
         console.log(user)
    
         res.redirect("/login") 

   }catch (error){
    console.log(error.errors)
   }
}

module.exports.login_get = (req,res) =>{
    res.render("../views/login")
}


module.exports.login_post = async (req,res) =>{
    try {

     const {email,password} = req.body
      const user = await User.login(email,password)
       const token = jwt.sign({email,password},"******",{
        expiresIn : 24 * 60 * 60
       })
 
       await res.cookie("jwt",token,{
        expiresIn : 24*60*60*1000
       })
        res.redirect("/explore")
    } catch (error) {
        console.log(error)
    }
}



