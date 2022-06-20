var jwt = require('jsonwebtoken');

module.exports = {
    varifyToken: async (req,res,next) =>{
        var token = req.headers.token;
        try {
            if(token){
                var payload = await jwt.verify(token, "thisisapp");
                req.user = payload;
                next();
            } else {
                res.status(400).json({error: "Token required"});
            }
        } catch (error) {
            next(error);
        }
    }
}