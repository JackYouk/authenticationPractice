const router = require('express').Router();

const {
    User,
    Todo
} = require('../../../models');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            // performs join sql query
            include: [
                {
                    model: Todo
                },
            ],
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({error});
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = req.body;
        const createdUser = await User.create(newUser);
        res.json(createdUser);
    } catch (error) {
        res.status(500).json({error});
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if(!user){
            return res.status(404).json({error: 'No user found'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({error});
    }
});

module.exports = router;