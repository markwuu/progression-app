const router = require('express').Router();
let Goal = require('../models/goals.model');

router.route('/').get((req, res) => {
  Goal.find()
    .then(goals => res.json(goals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const description = req.body.description;
  const success = req.body.success;

  const newGoal = new Goal({
      description,
      success,
    });

    newGoal.save()
    .then(() => res.json('Goal added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
