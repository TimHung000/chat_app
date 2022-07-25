const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerNewAccount = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({
            'error': 'Usernam, password, email are required.'
        });
    };
    let duplicateQuery = await User.findOne({ email }).exec();
    if (duplicateQuery) {
        return res.status(409).json({
            'error': 'email duplicate with others'
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({
            "username": username,
            "email": email,
            "password": hashedPassword
        });
        
        res.status(201).json({
            "success created": {
                "username": username,
                "email": email
            }
        });
    } catch (err) {
        console.log({ "failed created": err })
        res.status(500).json({
            'name': err.name,
            'message': err.message
        });
    }
};


const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            'error': 'email and password are required'
        });
    };

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) {
        return res.status(401).json({
            'error': "can't find the email"
        })
    };

    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
        const accessToken = jwt.sign(
            {
                "userId": foundUser._id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '15m'
            }
        );

        const refreshToken = jwt.sign(
            {
                "userId": foundUser._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '1d'
            }
        )

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        // console.log(result);

        res.cookie(
            'refreshToken', refreshToken,
            {
                httpOnly: true,
                secure: true,
                sameSite: 'NONE',
                maxAge: 24 * 60 * 60 * 1000
            }
        );

        res.json({ accessToken });
    } else {
        res.status(401).json({
            "error": {
                'name': 'authentication fail',
                'message': 'false password'
            }
        });
    }
};


const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
        // No content
        return res.sendStatus(204);
    }
    const refreshToken = cookies.refreshToken;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete token in database
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    // console.log(result);

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
        // Unauthorized
        return res.status(401).json({
            "error": {
                'name': 'authentication fail',
                'message': 'empty refreshToken'
            }
        });
    }

    const refreshToken = cookies.refreshToken;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        //Forbidden
        return res.status(403).json({
            "error": {
                "name": "authentication fail",
                "message": "refreshToken not match"
            }
        }); 
    }

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser._id.toString() !== decoded.userId){
                return res.status(403).json({
                    "error": {
                        "name": "authentication fail",
                        "message": "refreshToken fail"
                    }
                });
            }

            const accessToken = jwt.sign(
                {
                    "userId": foundUser._id
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '15m'
                }
            )

            res.json({ accessToken })
        }
    );
}



module.exports = { handleLogin, handleLogout, registerNewAccount, handleRefreshToken };