const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
let User = require('../models/users.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post( async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('hashedpassword', hashedPassword);
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    email,
    password: hashedPassword
  });

  console.log('newuser', newUser);

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
