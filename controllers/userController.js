// code yg lain

const db = require('../models');
const bcrypt = require('bcryptjs');

exports.loginForm = (req, res) => {
  res.render('auth/login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = user;
      res.redirect('/home');
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.regisForm = (req, res) => {
  res.render('auth/register');
};

exports.register = async (req, res) => {
  const { nim, name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({ nim, name, email, password: hashedPassword, role });
    req.session.user = user;
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(400).send('User already exists');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error logging out');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};


exports.profile = async (req, res) => {
  try {
    const userId = req.session.user.id; 
    userRole = req.session.user.role;
    userName = req.session.user.name;
    const user = await db.User.findByPk(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('user/profile', { user, userRole, userName });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Server error');
  }
};

exports.changePassword = async (req, res) => {
    const { current_password, new_password, confirm_new_password } = req.body;
  
    if (new_password !== confirm_new_password) {
      return res.render('user/profile', {
        user: req.session.user,
        userRole: req.session.user.role,
        userName: req.session.user.name,
        error: 'New passwords do not match'
      });
    }
  
    try {
      const user = await db.User.findByPk(req.session.user.id);
  
      const isMatch = await bcrypt.compare(current_password, user.password);
      if (!isMatch) {
        return res.render('user/profile', {
          user: req.session.user,
          userRole: req.session.user.role,
          userName: req.session.user.name,
          error: 'Current password is incorrect'
        });
      }
  
      user.password = await bcrypt.hash(new_password, 10);
      await user.save();
  
      res.render('user/profile', {
        user: req.session.user,
        userRole: req.session.user.role,
        userName: req.session.user.name,
        success: 'Password changed successfully'
      });
    } catch (err) {
      console.error('Error changing password:', err);
      res.render('user/profile', {
        user: req.session.user,
        userRole: req.session.user.role,
        userName: req.session.user.name,
        error: 'An error occurred while changing the password'
      });
    }
  };