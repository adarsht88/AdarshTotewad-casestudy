const jwt = require("jsonwebtoken");

module.exports = async function isAuthenticated(req, res, next) {
    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, "secret", (err, user) => {
        if (err) {
            console.log(err)
            return res.json({ message: "Invalid Token" });
        } else {
            req.user = user;
            // req.userId = decodedData.id;
            // req.userType=decodedData.userType;  
            next();
        }
    });

};
