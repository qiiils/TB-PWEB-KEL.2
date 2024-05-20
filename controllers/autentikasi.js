import { use } from "../app";

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email, // req body atau halaman login => input email , email = req body emsil
      },
    });

    if (!user) {
      throw new Error("Email tidak ditemukan");
    }

    const match = await bcrypt.compare(req.body.password, user.password); // const adalah deklarasi data artinya nilainy konstan

    if (!match) { // tanda ! tidak ketemu
      throw new Error("Password salah");
    }

    const userId = user.id; 
    const name = user.name;
    const email = user.email;
    const role = user.role;
    const nim = user.nim;
    const hp = user.hp;
    const departemen = user.departemen;





    const token = jwt.sign({ userId, name, email,role,nim,hp,departemen }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "5s",
    });
    const refreshToken = jwt.sign({ userId, name, email,role,nim,hp,departemen }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "10s",
    });

    await Users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure:true
    });
    console.log(refreshToken)

    if (req.session) {
      req.session.user = {
        userId: userId,
        name: name,
        email: email,
        role: role,
        nim: nim,
        hp: hp,
        departemen:departemen        
      };
    } else {
      console.error('Sesi belum diinisialisasi');
    }


    res.cookie("token", token, { httpOnly: true });

    if (user.role === "mahasiswa") {
      return res.redirect("/home");
    } else if (user.role === "admin") {
      return res.redirect("/admin/dashboard");
    }

    
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

// Ubah Password
const changePassword = async (req, res, next) => {
  email = req.userEmail 
  const {currentPassword, newPassword } = req.body;

  try {
    const user = awaut admins,findOne({ where: {email}});

    if(!user) {
      return res.status(404).send("User not found");

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).send("Password is incorrect!");
      }

      await user.update({ password: await bcrypt.hash(newPassword, 10)});
      next();

    } catch (error) {
      console.log("Can not change password", error);
      return res.status(500).send("Internal Error");
    }
  }
};