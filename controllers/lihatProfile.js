const { Admin, user } = require('../models');

const viewProfile = async (req, res) => {
  try {
    const { email } = req.params; // Mengambil email dari parameter URL

    // Log untuk memastikan email ada di parameter URL
    console.log("Email from params:", email);

    if (!email) {
      return res.status(400).json({ message: "Email parameter is missing" });
    }

    let userData;

    // Cek apakah email ada dalam model Admin
    let adminData = await Admin.findOne({ where: { email } });
    if (adminData) {
      userData = adminData;
    } else {
      // Cek apakah email ada dalam model user
      let regularUserData = await user.findOne({ where: { email } });
      if (regularUserData) {
        userData = regularUserData;
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    }

    if (userData.role === 'admin') {
      res.render('admin/admin-profile', { userData });
    } else if (userData.role === 'user') {
      res.render('user/user-profile', { userData });
    } else {
      res.status(400).json({ message: "Invalid user role" });
    }
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { 
  viewProfile
};
