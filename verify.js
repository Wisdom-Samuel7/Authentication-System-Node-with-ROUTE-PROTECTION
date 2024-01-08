const jwt = require("jsonwebtoken")
//const User = require("./db.js")

const Auth = (req,res,next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token,"******",async (err,decodedToken)=>{
          if(err){
            console.log(err)
            res.redirect("/login")
          }else{
            next()
          }
        })
    }else{
        res.redirect("/login")
    }
}

module.exports = {Auth}






