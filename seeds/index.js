const {
    User,
    Todo,
} = require('../models');
const users = require('./users');
const todos = require('./todos');

const seeder = async () => {

    await User.destroy({
        where: {}
    });
    await Todo.destroy({
        where: {}
    });

    const savedUsers = await User.bulkCreate(users, {
        individualHooks: true,
    });

    
    todos.forEach(todo => {
        const randomNum = Math.floor(Math.random() * savedUsers.length);
        todo.userId = savedUsers[randomNum].id;
    });

    const savedTodos = await Todo.bulkCreate(todos);

    console.log(savedTodos);
};

// IIFE
(async () => {
    await seeder();
})();