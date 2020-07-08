const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Goal = require('../models/Goal');
const User = require('../models/User');

router.get('/', ensureAuthenticated, (req, res) => {
    console.log('req', req);
    res.render('goal')
});

router.get('/:id', ensureAuthenticated, async (req, res) => {
    const goalTasks = await Goal.findOne({ description: req.params.id}).populate('tasks');

    let tasksArray = [];

    for(let i = 0; i < goalTasks.tasks.length; i++){
        tasksArray.push(goalTasks.tasks[i].description);
    }

    res.render('goal', {
        goal: req.params.id,
        tasks: tasksArray,
        user: req.user
    });
});

router.post('/delete/:id', ensureAuthenticated, (req, res) => {
    Goal.findOneAndDelete({description: req.params.id})
        .then(test => {
            console.log('test', test);
        })
    res.redirect('/dashboard');
});

router.post('/complete/:goal/:username', ensureAuthenticated, (req, res) => {
    const filter = { description: req.params.goal };
    const update = { success: 1 };
    let updatedScore;

    console.log('username', req.params.username);

    Goal.findOneAndUpdate(filter, update, {
        returnOriginal: false
    })
    .catch((err) => {
        console.log('error', err);
    });

    // User.findOneAndUpdate({ username: req.params.username}, {score: 100}, {
    //     returnOriginal: false
    // })
    // .catch((err) => {
    //     console.log('error', err);
    // });

    User.findOne({username: req.params.username})
        .then((user) => {
            console.log('user', user);
            updatedScore = (user.score + 20);
            console.log('updatedscore', updatedScore);
            User.findOneAndUpdate({ username: req.params.username }, { score: updatedScore }, {
                returnOriginal: false
            })
            .then((user) => {
                console.log('updated user: ', user);
                updatedScore = 0;
                res.redirect('/dashboard');
            })
            .catch((err) =>{
                console.log('err', err);
            })
    });

});

router.post('/add', ensureAuthenticated, async (req, res) => {
    const { description, _id } = req.body;
    console.log('description', description);
    console.log('req.user', req.user._id);

    const goal = await Goal.create({
        description,
        success: false,
        user: req.user._id
    });

    await goal.save();

    const userById = await User.findById(req.user._id);

    userById.goals.push(goal);
    await userById.save();

    res.status(200).redirect('/dashboard');
});

module.exports = router;
