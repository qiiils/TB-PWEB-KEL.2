const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Admin, user } = require("../models");

const form = (req, res) => {
  const token = req.cookies.token;
  res.render('login.ejs');
};

const checklogin = async (req, res) => {
  const { email, password } = req.body;

  console.log("Email:", email, "Password", password);

  try {
    //const foundUser = await Admin.findOne({ where: { email } });

    //console.log("Found user:", foundUser);

    const adminUser = await Admin.findOne({ where : { email }});

    const regularUser = await user.findOne({ where: { email }});

    console.log("Admin Role : ", adminUser);
    console.log("User role : ", regularUser);

    if (!adminUser && !regularUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const users = adminUser || regularUser;
    const isValidPassword = await bcrypt.compare(password, users.password);

    console.log("Is valid password:", isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: users.id, email: users.email, role: users.role },
      process.env.ACCESS_SECRET_TOKEN,
      { expiresIn: 86400 }
    );

    res.cookie("token", token, { httpOnly: true });

    console.log("User role:", users.role);

    if (users.role === "admin") {
      const redirectUrl = '/admin/home?email=' + encodeURIComponent(users.email);
      console.log("Redirecting to:", redirectUrl);
      return res.redirect(redirectUrl);
    } else if (users.role === "user") {
      const redirectUrl = '/user/home?email=' + encodeURIComponent(users.email);
      console.log("Redirecting to:", redirectUrl);
      return res.redirect(redirectUrl);
    }

    res.status(200).send({ auth: true, token: token });

  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  form,
  checklogin,
};