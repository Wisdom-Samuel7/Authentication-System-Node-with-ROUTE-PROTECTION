const { func } = require("joi")
const mongoose = require("mongoose")
const {Schema,model} = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcryptjs")

mongoose.connect("***************")

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        lowercase : true,
        validate : [isEmail,"Please enter a correct email"]
    },
    password : {
        type : String,
        required : true,
        minLength : [8, "Minimum character is 8"]
    },

},{timestamps:true})

userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(this.password,salt)
    this.password = hash
    next()
})

userSchema.statics.login = async function(email,password) {
    const user = await this.findOne({email})

   if(user){
      const check_key = await bcrypt.compare(password,user.password)
     if(check_key){
        return(user)
     }
     
  }
throw Error("INCORRECT EMAIL")

}

const User = model("owner",userSchema)

module.exports = User
