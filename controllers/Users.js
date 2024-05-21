const modeluser = require('../models/user')
const {Op, where, Model} = require('sequelize')
const bcrypt = require('bcrypt')

const changePassword = async (req,res) =>{
    try{
        const { email, currentPassword, newPassword } = req.body

        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Isi semua kolom' });
        }

        const findaccount = await modeluser.findOne({
            where:{
                email: email
            }
        })

        if (!findaccount) {
            return res.status(400).json({
                success: false,
                message: "Akun tidak ditemukan"
            })
        }

        const passwordAsli = findaccount.password
        const passwordmatch = bcrypt.compareSync(currentPassword, passwordAsli)

        if (!passwordmatch) {
            return res.status(400).json({
                success: false,
                message: "Password lama tidak sesuai"
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const encryptPass = bcrypt.hashSync(newPassword, salt)
        const updateaccount = await modeluser.update({
            password: encryptPass
        }, {
            where: {
                email: email
            }
        })

        if (!updateaccount) {
            return res.status(400).json({
                success: false,
                message: "Gagal memperbarui data"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Kata sandi berhasil diperbarui"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error });
    }
}

const formUbahPassword = async (req,res) =>{
    res.render('changepw', { title: 'changepw' });
}

module.exports = {
    changePassword, 
    formUbahPassword
}
