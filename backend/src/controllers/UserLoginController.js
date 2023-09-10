const CheckEmailModel = require("../model/CheckEmailModel")
const generateTokenMiddleware = require("../model/generateTokenModel")

const bcrypt = require('bcrypt');

const UserLoginController = async (client, req, res) => {
    try {
        const {userEmail, userPassword} = req.body
        if(userEmail == '' || userPassword == '') {
            const userEmailEmpty = userEmail.length == 0
            const userPasswordEmpty = userPassword.length == 0
            res.status(422).json({userEmailEmpty, userPasswordEmpty})
            return
        }
        else {
            const userInfo = await CheckEmailModel(client, userEmail);

            if(!userInfo) {
                res.status(400).json({loginNotFound: true})
                return
            }

            const {nickName, password: hashedPassword, _id} = userInfo;
            const passwordsMatch = await bcrypt.compare(userPassword, hashedPassword);

            if(!passwordsMatch) {
                res.status(400).json({incorrectPassword: true})
                return
            }
            const id = _id.toString()
            const token = generateTokenMiddleware(id)
    
            res.status(200).json({
                passwordsMatch,
                token,
            })
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Deu o caraio memo' });
    }
}

module.exports = UserLoginController