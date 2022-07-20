const router = require('express').Router();
const bcrypt = require('bcryptjs');

const {User} = require('../../../models');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({error});
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = req.body;
        newUser.password = await bcrypt.hash(newUser.password, 8);

        const createdUser = await User.create(newUser);
        // const newUser = await User.create(req.body);
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