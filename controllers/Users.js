const changePassword = async (req, res, next) => {
  email = req.userEmail
  const {currentPassword, newpassword } = req.body;
  
  try {
    // Retrieve the user from the database
    const user = await admins.findOne({ where: { email } });

    // Check if the user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare old password
    
    const isMatch = await bcrypt.compare(oldpassword, user.password);
      // Proceed with your logic based on whether passwords match
      if (!isMatch) {
        return res.status(400).send("Password is incorrect");
      }
  
  
      // Update the user record with the new hashed password
      await user.update({ password: await bcrypt.hash(newPassword, 10), });
     next();
    
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).send("Internal server error");
  }
};