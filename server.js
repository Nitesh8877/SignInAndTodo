const express= require('express');
const app=express();
const serverConfig=require('./configs/server.config');
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const db=require('./models');

const Todo=db.todo;
db.sequelize.sync({force:true})
.then(()=>{
    
    todoList();
})

function todoList(){
    var todo=[
        {
            title:"home work",
            iscompleted:true
        },{
            title:"assingment",
            iscompleted:false
        }
    ]
    Todo.bulkCreate(todo)
    .then(()=>{
        console.log("table has been created");
    })
    .catch(()=>{
        console.log("some error while table is created")
    })
}


require('./routes/user')(app);
require('./routes/todo')(app);

app.listen(serverConfig.PORT,()=>{
    console.log("Application Started on the port numberber",serverConfig.PORT);
})