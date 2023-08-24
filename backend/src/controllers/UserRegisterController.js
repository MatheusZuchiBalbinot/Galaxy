const validator = require('validator');
const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const InsertModel = require("../model/InsertModel")

const UserRegisterController = async (client, req, res) => {
    try {
        const isEmailValid = validator.isEmail(req.body.email);
        const isPasswordValid = validator.isLength(req.body.password, { min: 6 });
        const isNicknameValid = validator.isLength(req.body.nickName, { min: 6 });
        const isPasswordsEqual = req.body.password == req.body.confirmPassword

        const errors = {
            isEmailValid,
            isPasswordValid,
            isNicknameValid, 
            isPasswordsEqual
        }

        let hasErrors = false;

        for (const key in errors) {
            if (!errors[key]) {
                hasErrors = true;
                break;
            }
        }
        
        if (hasErrors) {
            res.status(400).json({errors});
        } else {
            const {
                email,
                nickName,
            } =  req.body

            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            const data = {
                email, 
                nickName, 
                password: hashedPassword,
            }
            try {
                await InsertModel(client, data, email, nickName);
                res.status(201).json({ message: "Success" });
            } catch (error) {
                if (typeof error === "object") {
                    if (error.emailExists && error.nickNameExists) {
                        res.status(400).json({ emailExists: true, nickNameExists: true });
                    } else if (error.emailExists) {
                        res.status(400).json({ emailExists: true, nickNameExists: false });
                    } else if (error.nickNameExists) {
                        res.status(400).json({ nickNameExists: true, emailExists: false });
                    }
                } else {
                    res.status(400).json({ error: error.message });
                }
            }
        }

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = UserRegisterController