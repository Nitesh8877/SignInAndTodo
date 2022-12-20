const controller=require('../controllers/todo.controller');
const jwt=require('jsonwebtoken')
function verifyToken(req,res,next){
    let token=req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            message:"token not provided"
        })
    }
    jwt.verify(token,'nitesh-secret-key',(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"unathorised!"
            })
        }
        req.userId=decoded.id;
        next();
    })
}
module.exports=function(app){
    app.post('/todo',verifyToken,controller.insert);
    app.get('/tododata',controller.findAll);
    app.put('/todo/:id',verifyToken,controller.update);
}
