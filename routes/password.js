var express = require('express');
var router = express.Router();
var path = require('path');
const User = require('../models/User');

router.get('/', (req, res) => {
  res.render('change-password');
});

// Handle password change form submission
router.post('/', async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
    return res.status(400).render('change-password', {
      error: 'New password and confirm password do not match.'
    });
  }

  // Find user by email
  const user = await User.findOne({ email: req.user.email });

  // Check if current password is correct
  if (currentPassword !== user.password) {
    return res.status(400).render('change-password', {
      error: 'Current password is incorrect.'
    });
  }

  // Update user password
  user.password = newPassword;
  await user.save();

  // Redirect to home page
  res.redirect('/');
});

module.exports = router;