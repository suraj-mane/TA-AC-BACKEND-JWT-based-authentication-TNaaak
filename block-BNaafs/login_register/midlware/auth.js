var jwt = require('jsonwebtoken');


module.exports = {
  varifyToken : async (req,res,next) => {
    var token = req.headers.token;
    try {
      if(token){
        var payload = await jwt.verify(token, process.env.secret);
        req.user = payload;
        next();
      } else {
        res.status(400).json({error : "Token is require"});
      }
    } catch (error) {
      next(error);
    }
  }
}