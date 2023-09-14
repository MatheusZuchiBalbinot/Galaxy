const CheckEmailModel = require("../model/CheckEmailModel")
const generateTokenMiddleware = require("../model/generateTokenModel")

const validator = require('validator');

const bcrypt = require('bcrypt');

const UserLoginController = async (client, req, res) => {
    try {
        const {userEmail, userPassword} = req.body

        if (userEmail === '' && userPassword === '') {
            res.status(422).json({
                newErrorMessages: {
                    email: "Campo de email vazio.",
                    password: "Campo de senha vazio."
                }
            });
        } else if (userEmail === '') {
            res.status(422).json({
                newErrorMessages: {
                    email: "Campo de email vazio.",
                }
            });
        } else if (userPassword === '') {
            res.status(422).json({
                newErrorMessages: {
                    password: "Campo de senha vazio."
                }
            });
        } else {

            const errorsVerification = {
                email: {
                    isValid: validator.isEmail(userEmail, { min: 10, max: 30 }),
                    message: 'O campo de e-mail é inválido.'
                },
                password: {
                    isValid: validator.isLength(userPassword, { min: 6, max: 20 }),
                    message: 'A senha deve ter entre 6 e 20 caracteres.'
                },
            }

            const newErrorMessages = {};

            for (const fieldName in errorsVerification) {
                const { isValid, message } = errorsVerification[fieldName];
                if (!isValid) {
                    newErrorMessages[fieldName] = message;
                }
            }

            if (Object.keys(newErrorMessages).length > 0) {
                res.status(400).json({newErrorMessages});
            } else {
                const userInfo = await CheckEmailModel(client, userEmail);
                if(!userInfo) {
                    res.status(400).json({newErrorMessages: {
                        mainError: "Cadastro não encontrado.",
                    }})
                    return
                }

                const {nickName, password: hashedPassword, _id} = userInfo;
                const passwordsMatch = await bcrypt.compare(userPassword, hashedPassword);

                if(!passwordsMatch) {
                    res.status(400).json({newErrorMessages: {
                        mainError: "Senha incorreta.",
                    }})
                    return
                }
                const id = _id.toString()
                const token = generateTokenMiddleware(id)
        
                res.status(200).json({
                    passwordsMatch,
                    token,
                })
            }
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao tentar logar usuário. ' });
    }
}

module.exports = UserLoginController