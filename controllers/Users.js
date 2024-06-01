const modeluser = require('../models/user')
const {Op, where, Model} = require('sequelize')
const bcrypt = require('bcrypt')
const path = require('path')

const formUbahPassword = async (req,res) =>{
    res.render('changepw', { title: 'changepw' });
}

const changePassword = async (req,res) =>{
        const { email, currentPassword, newPassword } = req.body
        try{
        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Isi semua kolom' });
        }

        const findAccount = await modeluser.findOne({
            where:{
                email: email
            }
        })

        if (!findAccount) {
            return res.status(400).json({
                success: false,
                message: "Akun tidak ditemukan"
            })
        }

        const passwordUser = findAccount.password
        const passwordmatch = bcrypt.compareSync(currentPassword, passwordUser)

        if (!passwordmatch) {
            return res.status(400).json({
                success: false,
                message: "Password lama tidak sesuai"
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const encryptPass = bcrypt.hashSync(newPassword, salt)
        await modeluser.update({
            password: encryptPass
        }, {
            where: {
                email: email
            }
        })
        return res.status(200).json({message: "Data Berhasil diperbarui"})
    } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Ada Error"})
    } 
}


//Dashboard User
const { user } = require('../models');
const userDashboardPath = path.join(__dirname, '../views/users/userDashboard');


async function renderUserDashboard(req, res, next) {
  try {
    const email = req.query.email;
    const regularUser = await user.findOne({ where: { email } }); // Ambil data admin dari database sesuai dengan email yang diberikan
    if (!regularUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.render(userDashboardPath, { users: regularUser }); // Kirim data adminUser ke template adminDashboard.ejs
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}



module.exports = {
  renderUserDashboard,
  changePassword, 
  formUbahPassword
};

