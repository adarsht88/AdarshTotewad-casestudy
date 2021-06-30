const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


//admin Schema
const adminSchema = new mongoose.Schema({
   
    email: {
        type : String,
        required :true,
        unique : true,
        lowercase : true
    },
    password: {
        type : String,
        required : true,
        minlength : 8
    },
    userType : {
        type : Boolean,
        default : true
    }

})

//password encryption
adminSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

// static method to login admin
adminSchema.statics.login = async function(email, password) {
    const admin = await this.findOne({ email });
    if (admin) {
        const auth = await bcrypt.compare(password, admin.password);
        if (auth) {
            return admin;
        }
        else{
        throw Error("incorrect password")    
        }
    }
    else{
        throw Error("email password")
    }
    
};

const Admin = mongoose.model('admin-db',adminSchema)
module.exports = Admin