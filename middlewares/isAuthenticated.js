const jwt = require('jsonwebtoken')
//const cookieParser = require('cookie-parser')
var userEmail;
const isAuthenticated=(req, res, next)=> {
        let token;
        const check = req.headers.authorization;
        if(!check){
            res.status(201).json({ message: "Please login" })
        }else{
            token = req.headers["authorization"].split(" ")[1];
            //const token = req.cookies.jwt;

             //check token web exit 
            jwt.verify(token,'secret', (err,data) => {
                if(err){
                    res.status(401).json({ message: "You are not Unauthorized to go further" }); 
                }
                else{
                    userEmail = data.email;
                    userType = data.userType;
                    console.log(userEmail);         
                    next()
                }
            })
        }
       
}

module.exports = { isAuthenticated, userEmail};
