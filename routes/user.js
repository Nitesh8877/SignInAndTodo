const controller=require('../controllers/user.controller');
const jwt=require('jsonwebtoken');



module.exports=function(app){
    app.post("/signup",controller.signUp);
    app.post("/signin",controller.signIn);
}
