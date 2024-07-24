import sequelize  from'./db.js';
import { DataTypes } from 'sequelize';

// By default, NULL is  allowed 
// By dafalt NOTUNIQUE

export const Subject = sequelize.define('subject',{
    id:{
        type:DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    subject:{
        type:DataTypes.STRING, 
        allowNull:false

    }
})

export const User = sequelize.define('user',{
    id:{
        type:DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    // 
    name:{
        type:DataTypes.STRING, 
        allowNull: false, 
    },
    email:{
        type:DataTypes.STRING, 
        allowNull: false, 
        unique: true
    },    
    password:{
        type:DataTypes.STRING, 
        allowNull: false, 
    },  
    role:{
        type:DataTypes.STRING, 
        allowNull: false, 
    },
    // 
    about:{
        type:DataTypes.TEXT, 
    },
    experience:{
        type:DataTypes.TEXT, 
    },
    education:{
        type:DataTypes.TEXT, 
    },
    telnum:{
        type:DataTypes.INTEGER, 
    },
    status:{
        type:DataTypes.BOOLEAN, 
        defaultValue:true,
    },
    img:{
        type:DataTypes.STRING, 
        defaultValue:"placeholder.jpg",
    }
        
})


export const Group = sequelize.define('group',{
    id:{
        type:DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    groupname:{
        type:DataTypes.TEXT,
        allowNull: false, 
    },
    description:{
        type:DataTypes.TEXT,
    },
    adress:{
        type:DataTypes.TEXT,
    },
    price:{
        type:DataTypes.INTEGER,

    },
    mon:{
        type:DataTypes.STRING,

    },
    wen:{
        type:DataTypes.STRING,

    },
    tue:{
        type:DataTypes.STRING,

    },
    thur:{
        type:DataTypes.STRING,

    },
    fri:{
        type:DataTypes.STRING,

    },
    sat:{
        type:DataTypes.STRING,

    },
    sun:{
        type:DataTypes.STRING,

    }
})

export const Review = sequelize.define('review',{
    id:{
        type:DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    reviewtext:{
        type:DataTypes.TEXT, 

    },
    studentid:{
        type:DataTypes.INTEGER, 

    },


})


export const Application = sequelize.define('application',{
    id:{
        type:DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    staus:{
        type:DataTypes.BOOLEAN, 
        allowNull:false,
        defaultValue:false,
    }
})

Subject.hasMany(User)
User.belongsTo(Subject)

User.hasMany(Review)
Review.belongsTo(User)


User.hasMany(Group)
Group.belongsTo(User)


User.hasMany(Application)
Application.belongsTo(User)


Group.hasMany(Application)
Application.belongsTo(Group)
