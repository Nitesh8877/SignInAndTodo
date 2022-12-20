const config=require('../configs/db.config');
const Sequelize=require('sequelize');

const sequelize=new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        host:config.HOST,
        dialect:config.dialect
    }
)

const db={
    

}

db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.user=require('./user.model')(sequelize,Sequelize);
db.todo=require('./todo')(sequelize,Sequelize);

module.exports=db;
