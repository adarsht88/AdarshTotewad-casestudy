const jwt = require('jsonwebtoken')
//const cookieParser = require('cookie-parser')
module.exports = async function isAuthenticated(req, res, next) {
        const token = req.headers["authorization"].split(" ")[1];
        //const token = req.cookies.jwt;

    //check token web exit 
    if(token){
        jwt.verify(token,'secret', (err,data) => {
            if(err){
                res.status(401).json({ message: "Unauthorized client" }); 
            }
            else{
                userEmail = data.email;
                console.log(userEmail);         
                next()
            }
        })
    }
    else{
        // res.status(401).json({ message: "Unauthorized client" }); 
        res.status(205).json({ message: "Please login" })
    }
    
}

