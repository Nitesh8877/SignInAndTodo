module.exports=(sequelize,Sequelize)=>{
    const Todo=sequelize.define("todos",{
        title:{
            type:Sequelize.STRING
        },
        iscompleted:{
            type:Sequelize.BOOLEAN
        }  
    });
    return Todo;

}