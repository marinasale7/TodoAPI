const jwt=require('jsonwebtoken')

const ValidateToken =(req,res,next)=>{
const authorization= req.headers.authorization
      if(!authorization)  res.status(401).json({msg:"Missing Token"})
      const token = authorization.split(" ")[1]
      try{
        const user= jwt.verify(token,'msreivtx')
         req.user=user 
         next()    
      }
      catch(err){
          console.log(err)
          res.status(401).json({msg:"Invalid Token"})
      }
}

module.exports={ValidateToken}