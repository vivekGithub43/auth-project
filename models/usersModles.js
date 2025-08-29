const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        trim:true,
        minlength: [2, 'Name must have at least 2 characters'],
        maxlength: [50, 'Name can have max 50 characters']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        trim:true,
        unique:[true,'Email must be unique'],
        minLength:[5,'Email must have 5 charecters'],
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'Password required'],
        trim:true,
        select:false,
    },
    verified:{
        type:Boolean,
        default:false
    },
    verificationCode:{
        type:String,
        select:false
    },
    verificationCodeValidation:{
        type:Number,
        select:false
    },
    forgotPasswordCode:{
        type:String,
        select:false
    }, 
     forgotPasswordCodeValidation:{
        type:Number,
        select:false
    },
},{
    timestamps:true
});

module.exports = mongoose.model('User',userSchema)