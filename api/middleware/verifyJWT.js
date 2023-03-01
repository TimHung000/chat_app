const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                // forbidden
                return res.status(403).json({
                    "error": {
                        "name": "unauthorized",
                        "message": "token expired or invalid token"
                    }
                })
            }

            req.userId = decoded.userId;
            next();
        })
    } else {
        // unauthorized
        res.status(401).json({
            "error": {
                "nanme": "unauthorized",
                "message": "empty token"
            }
        })
    }
}

module.exports = verifyJWT