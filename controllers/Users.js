
const User = require('../models/UserModel.js')
const bcrypt = require('bcrypt')
export const changePassword = async (req, res, next) =>{
    console.log("change password");
    try {
        const { currentPassword } = req.params;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const userPassword = await User.findNyIdAndUpdate({ _id, userId}, { password: password }, { new: true });
        return res.status(200).json({ status: true, data: userPassword});
    } catch (error) {
        return res.status(400).json({ status: false, error: "Error Occured"});
    }
}
