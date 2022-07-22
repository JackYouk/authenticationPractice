const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Todo extends Model {}

Todo.init(
    {   
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        // set up for foreign key
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        todo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'todos',
    }
);

module.exports = Todo;