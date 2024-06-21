// code yg lain



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