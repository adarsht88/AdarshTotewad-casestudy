const User = require('../models/users')
const jwt = require("jsonwebtoken");

const handleErrors = (err)=>{
    console.log(err.message, err.code);
    let errors = {email: '', password:''};

    if(err.code == 11000){
        errors.email = "Email is already registerd.";
        return errors;
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(error =>{
            error[error.properties.path] = error.properties.message;
        });
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id, email) => {
    return jwt.sign({ id, email }, 'secret', {
        expiresIn: maxAge
    })
}


//user signup get

module.exports.signup_get = (req, res) => {
    User.find({})
    .then( (user) => {
        res.status(200).json(user);
    })
    .catch((err) => {
        res.status(400).json({ message: "Email already exist" });
    })
}


//user signup post

module.exports.signup_post = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,  
    }
    try {
        User.create(user)
            .then((user) => {
                console.log(user)
                //const token = createToken(user._id, user.email)
                //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                res.status(200).json({ message: "User Created Successfully!" });
            })
            .catch((err) => {
                res.status(400).json({ message: "Email already exist" });
            })
    } catch (err) {
        const errors = "page not found"
        res.status(404).json({ errors });
    }
    // console.log(user);
}



// Find user by email
// module.exports.userByName = async (req, res) => {
//     const query = { email: req.params.email }
//     const user = await User.findOne(query)
//     console.log(user.email)
//     res.json(user)
// }

// user login_get
// module.exports.login_get = (req, res) => {
//     res.send('user login get')
// }

//user login post
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (Object.keys(req.body).length === 0) 
        {
            res.status(205).json({ message: "Please enter all Fields" })
        }
    else {
            try {
                const user = await User.login(email, password)
                const token = createToken(user._id, user.email)
                //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                res.status(200).json({ token });
            }
            catch (err) {
                const errors = handleErrors(err);
                const { email, password } = errors
                res.status(400).json({ message: email.length > 0 ? email : password });
            }
        }
    }


