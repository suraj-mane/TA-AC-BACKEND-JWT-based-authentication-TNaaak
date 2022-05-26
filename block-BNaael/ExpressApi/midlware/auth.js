var jwt = require('jsonwebtoken');

module.exports = {
  verifytoken:  async (req,res,next) => {
    var token = req.headers.token;
    try {
      var payload = await jwt.verify(token, "thisisapp");
      req.user = payload;
      next();
    } catch (error) {
      next(error);
    }
  }
}