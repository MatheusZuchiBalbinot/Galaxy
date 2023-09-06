const CheckEmailModel = require("../model/CheckEmailModel")

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
            const usersCursor = await CheckEmailModel(client, userEmail);

            if(!usersCursor) {
                res.status(400).json({loginNotFound: true})
                return
            }

            const {nickName, password: hashedPassword} = usersCursor;
            const passwordsMatch = await bcrypt.compare(userPassword, hashedPassword);

            if(!passwordsMatch) {
                res.status(400).json({incorrectPassword: true})
                return
            }

            res.status(200).json({
                passwordsMatch,
                nickName,
            })
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Deu o caraio memo' });
    }
}

module.exports = UserLoginController