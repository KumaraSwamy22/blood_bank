const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    role : {
        type : String,
        required : [true,'role required'],
        enum : ['admin','organisation','donar','hospital'],
    },
    name : {
        type : String,
        required : function(){
            if (this.role === 'admin' || this.role === 'donar'){
                return true
            }
            return false
        }
    },
    organisationName : {
        type : String,
        required : function(){
            if(this.role === 'organisation'){
                return true
            }
            return false 
        }
    },
    hospitalName : {
        type : String,
        required : function (){
            if(this.role === 'hospital'){
                return true
            }
            return false
        }
    },
    email:{
        type : String,
        required : [true,'email required'],
        unique : true,
    },
    password : {
        type : String,
        required : [true,'password required'],
    },
    website : {
        type : String,
    },
    address : {
        type : String,
        required : [true,'address is required'],
    },
    phone : {
        type : String,
        required : [true,'phone number required'],
    },
},{timestamps:true});

module.exports = mongoose.model('users',userSchema)