const { Sequelize, DataTypes, Model } = require('sequelize')
const { post } = require('../controller/todo')

{/*
    var sequelize = function (database, username , password , options)
    var urlParts;
    options = options || {};
 */}  
const sequelize = new Sequelize(
    'testDB',
    'postgres',
    'admin',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
)

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
})
const Posts = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // userId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: User,
    //         key: 'id'
    //     }
    // }
}, {
    timestamps: false
})

User.hasMany(Posts)
Posts.belongsTo(User);



// User.hasOne(Posts , {
//     foreignKey : { name : 'PostId',  },
//     onDelete : 'CASCADE',
//     onUpdate : 'CASCADE'
// })

// Posts.hasOne(User)
// Posts.belongsTo(User , {
//     foreignKey : 'userId',
//     onDelete : 'CASCADE'
// })
  

    // sequelize.drop({
    //     tableName : 'Posts',
    //     cascade : true

    // })

sequelize.sync({ force: false }).then(() => {
    console.log('Database & table created')
})


module.exports = { User, Posts }