const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type:String,
        required:[true, 'Please enter an email'],
        unique:true,
        lowercase:true         
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:[true, 'Please enter an password'],
        minlength: [6,'Minimum password length is 6 characters']
    }
}) 

const User = mongoose.model('User',userSchema);
module.exports = User;