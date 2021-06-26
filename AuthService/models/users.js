const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;



//user Schema
const userSchema = new Schema({
    email: {
        type:String,
        required:[true, 'Please enter an email'],
        unique:true,
        lowercase:true         
    },
    // userId:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    password: {
        type:String,
        required:[true, 'Please enter an password'],
        minlength: [6,'Minimum password length is 6 characters']
    }
}) 


//fire function before saving to DB

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})


// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }else{
            return ("incorrect password")
        throw Error('incorrect password')    
        }   
    }else{
        return ("incorrect email")
    throw Error('incorrect email')
    }   
    
};


const User = mongoose.model('User',userSchema);
module.exports = User;


