const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const { unsubscribe } = require('./goals');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {

  const userGoals = await User.findById(req.user._id).populate('goals');

  let uncompletedGoals = [];
  let completedGoals = [];

  for(let i = 0; i < userGoals.goals.length; i++){
    if(!userGoals.goals[i].success !== true){
      completedGoals.push(userGoals.goals[i].description);
    } else {
      uncompletedGoals.push(userGoals.goals[i].description)
    }
  }

  res.render('dashboard', {
    user: req.user,
    completedGoals,
    uncompletedGoals
  });

  goalsArray = [];
});

module.exports = router;
