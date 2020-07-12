const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Goal = require('../models/Goal');
const User = require('../models/User');

// router.get('/', ensureAuthenticated, (req, res) => {
//     console.log('req', req);
//     res.render('goal')
// });

//Goal page
//Passes goals data and tasks data to goal page
router.get('/:id', ensureAuthenticated, async (req, res) => {
    const goalTasks = await Goal.findOne({ description: req.params.id}).populate('tasks');

    const goalsData = await Goal.findOne({description: req.params.id})
    // console.log('goalsData', goalsData)

    let tasksArray = [];

    for(let i = 0; i < goalTasks.tasks.length; i++){
        tasksArray.push(goalTasks.tasks[i].description);
    }

    res.render('goal', {
        goalsData: goalsData,
        goal: req.params.id,
        tasks: tasksArray,
        user: req.user
    });
});

router.post('/delete/:id', ensureAuthenticated, (req, res) => {
    Goal.findOneAndDelete({description: req.params.id})
        .then(test => {
            // console.log('test', test);
        })
    res.redirect('/dashboard');
});

router.post('/complete/:goal', ensureAuthenticated, async (req, res) => {
    const filter = { description: req.params.goal };
    const update = { success: 1 };
    let updatedScore = 1000;

    Goal.findOneAndUpdate(filter, update, {
        returnOriginal: false
    })
    .catch((err) => {
        console.log('error', err);
    });



    // i want to find the goals data and i can get that from the params up there. req.params.goal is it i think. yeah thats it.
    // okay sooooooooo i guess you can do a find one on the goal model. that will give you the score/or points. you can store that
    // inside a variable and then do a findOneAndUpdate.

    const score = await Goal.findOne(filter, 'points');
    console.log('score', score);

    // you can probably find two separate ones? do it later though okay, i think you're ready to write some code!





    User.findOneAndUpdate({ username: req.user.username }, { score: score.points + req.user.score }, {
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

    // User.findOneAndUpdate({ username: req.params.username}, {score: 100}, {
    //     returnOriginal: false
    // })
    // .catch((err) => {
    //     console.log('error', err);
    // });

    // i want to get the goals

    // User.findOne({username: req.user.username})
    //     .then((user) => {
    //         console.log('user', user);
    //         updatedScore = (user.score + 20);
    //         console.log('updatedscore', updatedScore);
    //         User.findOneAndUpdate({ username: req.params.username }, { score: updatedScore }, {
    //             returnOriginal: false
    //         })
    //         .then((user) => {
    //             console.log('updated user: ', user);
    //             updatedScore = 0;
    //             res.redirect('/dashboard');
    //         })
    //         .catch((err) =>{
    //             console.log('err', err);
    //         })
    // });

});

router.post('/add', ensureAuthenticated, async (req, res) => {
    const { description, _id } = req.body;
    // console.log('description', description);
    // console.log('req.user', req.user._id);

    const goal = await Goal.create({
        description,
        success: false,
        points: 0,
        user: req.user._id
    });

    await goal.save();

    const userById = await User.findById(req.user._id);

    userById.goals.push(goal);
    await userById.save();

    res.status(200).redirect('/dashboard');
});

module.exports = router;
