const jwt = require('jsonwebtoken')
// middleware for verifying token - router specific
const jwtMiddleware = (req, res, next) => {
    console.log("Inside jwtMiddleware...");
    const token = req.headers['authorization'].split(" ")[1]
    // console.log(token);
    try {
        const jwtResponse = jwt.verify(token, "empdjwt")
        // console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
    } catch (err) {
        res.status(401).json("Authorizaation failed!!! Please login... ")
    }

}

module.exports = jwtMiddleware