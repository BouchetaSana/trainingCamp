const config=require("../../config")
const jwt=require("jsonwebtoken")
function  verifyToken(req,res,next){
    const token = req.headers["x-auth-token"] 
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, config.myprivatekey, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      else{
        res.status(200).send(decoded);
        next()
      }
      

    });

}
module.exports=verifyToken;