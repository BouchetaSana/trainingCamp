const mongoose  = require('mongoose')
const config = require("config");
const jwt = require("jsonwebtoken");
const joi=require('joi');


const UserSchema  = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        auto:true
    },

    Firstname:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    Lastname:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
   
    email:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    Username:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength: 7,
        maxlength: 255
    },
    address:{
        type:String,
        required:true,
        trim:true,
        minlength: 7,
        maxlength: 255
    },
    paye:{
        type:String,
        required:true,
        trim:true,
    },
    

});

UserSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id }, config.get('myprivatekey')); 
    return token;
  }

function validate(user) {
    const schema = {
      Firstname: joi
        .string()
        .min(3)
        .max(50)
        .required(),
      Lastname: joi
        .string()
        .min(5)
        .max(255)
        .required(),
      password: joi
        .string()
        .min(7)
        .max(255)
        .required(),
      email:joi
        .string()
        .min(5)
        .max(255)
        .email()
        .required(),
      address:joi
        .string(),
      Username: joi
        .string()
        .min(5)
        .max(255)
        .required(),
      paye: joi
        .string()
        .required()

    };
    return joi.validate(user, schema);
}

const User = mongoose.model('User', UserSchema);

exports.User = User;
exports.validate=validate;