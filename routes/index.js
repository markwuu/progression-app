const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const { unsubscribe } = require('./goals');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard Page
router.get('/dashboard', ensureAuthenticated, async (req, res) => {

  const userGoals = await User.findById(req.user._id).populate('goals');
  console.log('usergoals', userGoals);

  let uncompletedGoals = [];
  let completedGoals = [];
  let score = [];

  for(let i = 0; i < userGoals.goals.length; i++){
    console.log(userGoals.goals[i].points, userGoals.goals[i].success);
    if(!userGoals.goals[i].success !== true){
      completedGoals.push(userGoals.goals[i].description);
    } else {
      score.push(userGoals.goals[i].points)
      uncompletedGoals.push(userGoals.goals[i].description)
    }
  }

  console.log('score', score);

  res.render('dashboard', {
    user: req.user,
    completedGoals,
    uncompletedGoals,
    score
  });

  goalsArray = [];
});

module.exports = router;
