const path = require('path')

//Dashboard Admin 
const { Admin } = require('../models');
const adminDashboardPath = path.join(__dirname, '../views/admin/adminDashboard');

async function renderAdminDashboard(req, res, next) {
  try {
    const email = req.query.email;
    const adminUser = await Admin.findOne({ where: { email } }); // Ambil data admin dari database sesuai dengan email yang diberikan
    if (!adminUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.render(adminDashboardPath, { users: adminUser }); // Kirim data adminUser ke template adminDashboard.ejs
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}


const viewProfile = async (req, res) => {
  try {
    const admin = await Admin.findOne({ where: { email: req.query.email } });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.render('admin-profile.ejs', { admin });
  } catch (err) {
    console.error("Error fetching admin profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  renderAdminDashboard,
  viewProfile
};
