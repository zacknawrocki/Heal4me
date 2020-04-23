const jwt = require('jsonwebtoken');
const config = require('config');
const anonID = config.get('anonID');

module.exports = function(req, res, next) {
     // Get token from header
     const token = req.header('x-auth-token');

    if ((req.baseUrl === "/api/posts") && !token) {
        next();
    }
    else if(!token) {
         return res.status(401).json({msg : "No token, authorization denied"});
    }
    else {
        // Verify token
        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'));

            req.user = decoded.user;
            next();

        } catch(err) {
            res.status(401).json({msg: 'Token is not valid'});
        }
    }
}