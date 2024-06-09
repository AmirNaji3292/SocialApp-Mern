import jwt from 'jsonwebtoken'

export const verifyToken=async(req,res,next)=>{
    const authHeaders=req.headers["authorization"];
    const token=authHeaders && authHeaders.split(" ")[1]
    if(token == null)return res.status(401).send('firs login')
    jwt.verify(token,process.env.ACCESSTOKEN_KEY,(err,decoded)=>{
     if(err)return res.status(403).send('token expired.')
    //  req.email=decoded.email;
     req.userId=decoded.userId;

    next()
    })
}