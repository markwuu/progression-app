const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Goal = require('../models/Goal');
const User = require('../models/User');
const Task = require('../models/Task');

router.post('/add/:goal', ensureAuthenticated, async (req, res) => {
    const { description, _id } = req.body;
    console.log('description', description);
    console.log('req.body', req.body);
    console.log('req.user', req.user._id);
    console.log('req.params', req.params.goal);

    const goal = await Goal.findOne({ description: req.params.goal });

    const task = await Task.create({
        description,
        goal: goal._id
    })
    console.log('task', task);

    await task.save();

    const goalById = await Goal.findOne({description: req.params.goal });

    goalById.tasks.push(task);
    await goalById.save();

    res.status(200).redirect(`/goals/${req.params.goal}/${req.user.username}`);
});

module.exports = router;
