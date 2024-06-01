const bcrypt = require('bcrypt');
const { user, Admin } = require('../models');

const changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { email, role } = req.user;  // Get email and role from the authenticated user

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const regularUser = await user.findOne({ where: { email } });
    const adminUser = await Admin.findOne({ where: { email } });

    if (!regularUser && !adminUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (regularUser) {
      await user.update({ password: hashedPassword }, { where: { email } });
    } else if (adminUser) {
      await Admin.update({ password: hashedPassword }, { where: { email } });
    }

    // Redirect after showing an alert
    const redirectUrl = role === "admin" 
      ? `/admin/home?email=${encodeURIComponent(email)}`
      : `/user/home?email=${encodeURIComponent(email)}`;
      
    res.send(`
      <script>
        alert("Password updated successfully");
        window.location.href = "${redirectUrl}";
      </script>
    `);
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  changePassword
};
