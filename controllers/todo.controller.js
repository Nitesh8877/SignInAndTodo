
const db=require('../models')
const Todo=db.todo;



exports.insert=(req,res)=>{
    const todo={
        title:req.body.title,
        iscompleted:req.body.iscompleted
    }
    Todo.create(todo)
    .then(to=>{
        res.status(201).send(to);
    })
    .catch((err)=>{
        res.status(500).send({
            message:"some internale error"
        })
    })
}
exports.findAll=(req,res)=>{
    let promise;
    promise=Todo.findAll();
    promise
    .then(data=>{
        res.status(200).send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:"some internal"
        })
    })
}

exports.update=(req,res)=>{
    const todo={
        title:req.body.title,
        iscompleted:req.body.iscompleted
    }
    const todoId=req.params.id;
    Todo.update(todo,{
        where:{
            id:todoId
        }
    })
    .then(data=>{
        Todo.findByPk(todoId)
        .then(todo=>{
            res.status(200).send(todo)
        })
        .catch(er=>{
            res.status(500).send({
                message:"some internal error"
            })
        })
    })
    .catch(err=>{
        res.status(500).send({
            message:"some internal eroor"
        })
    })
}