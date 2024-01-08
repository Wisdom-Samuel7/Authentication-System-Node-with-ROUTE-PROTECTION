const express = require("express")
const app = express()
const route = require("./router.js")
const bp = require("body-parser")
// require("dotenv").config()
const cookie = require("cookie-parser")
const {Auth} = require("./verify.js")

app.use(cookie())
app.use(bp.json())
app.use(bp.urlencoded({extended:true}))

app.use("/",route)
app.set("view engine","ejs")

app.get("/explore",Auth,(req,res)=>{
    res.render("explore")

})

app.get("/logout",(req,res)=>{
    res.cookie("jwt","",{
        maxAge : 1
    })

    res.redirect("/home")
})

app.listen(4000,()=>{
    console.log("SERVER RUNNING ON PORT 4000")
})


