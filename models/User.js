const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcryptjs');

class User extends Model {}

User.init(
    {   
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                isMin5Char(username){
                    if(username.length < 5){
                        throw new Error('Username must be at least 5 characters');
                    }
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: true,
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: false,
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'users',
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 8);
                user.email = user.email.toLowerCase();
                return user;
            },
            beforeUpdate: (user) => {
                user.email = user.email.toLowerCase();
                return user;
            },
        }
    }
);

module.exports = User;