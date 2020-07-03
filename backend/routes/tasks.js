const router = require('express').Router();
let Task = require('../models/tasks.model');

router.route('/').get((req, res) => {
    Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const description = req.body.description;
  const due_date = req.body.due_date;

  const newTask = new Task({
    description,
    due_date
  });

   newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
