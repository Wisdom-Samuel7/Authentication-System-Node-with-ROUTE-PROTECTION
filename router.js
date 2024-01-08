const {Router} = require("express")
const route = Router()
const {home,signup_get,signup_post, login_get,login_post,explore} = require("./authcontrol.js")

route.get("/home",home)
route.get("/signup",signup_get)
route.post("/signup",signup_post)
route.get("/login",login_get)
route.post("/login",login_post)


module.exports = route