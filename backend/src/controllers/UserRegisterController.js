const validator = require('validator');
const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const InsertLoginModel = require("../model/InsertLoginModel")
const {CheckEmailAndNickNameModel} = require("../model/CheckExistingFields")

const UserRegisterController = async (client, req, res) => {
    try {

        const checkIfNicknameOrEmailExists = await CheckEmailAndNickNameModel(client, req.body.email, req.body.nickName) 
        
        const errorsVerification = {
            email: {
                isValid: validator.isEmail(req.body.email, { min: 10, max: 30 }),
                message: 'O campo de e-mail é inválido.'
            },
            password: {
                isValid: validator.isLength(req.body.password, { min: 6, max: 20 }),
                message: 'A senha deve ter entre 6 e 20 caracteres.'
            },
            nickName: {
                isValid: validator.isLength(req.body.nickName, { min: 6, max: 15 }),
                message: 'O apelido deve ter entre 6 e 15 caracteres.'
            },
            confirmPassword: {
                isValid: req.body.password === req.body.confirmPassword && validator.isLength(req.body.confirmPassword, { min: 6, max: 20 }),
                message: 'As senhas não coincidem.'
            },
            emailAlreadyExists: {
                isValid: checkIfNicknameOrEmailExists.email ? false : true,
                message: 'E-mail já está cadastrado. Escolha outro e-mail.'
            },
            nickNameAlreadyExists: {
                isValid: checkIfNicknameOrEmailExists.nickName ? false : true,
                message: 'Nickname já está cadastrado. Escolha outro nickname'
            }
        };

        console.log(errorsVerification.nickNameAlreadyExists, errorsVerification.emailAlreadyExists)
    
        const newErrorMessages = {};

        for (const fieldName in errorsVerification) {
            const { isValid, message } = errorsVerification[fieldName];
            if (!isValid) {
                newErrorMessages[fieldName] = message;
            }
        }

        if (Object.keys(newErrorMessages).length > 0) {
            console.log(newErrorMessages)
            res.status(400).json({newErrorMessages});
        } else {
            const {
                email,
                nickName,
            } =  req.body

            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            const actualDate = new Date();
            const days = actualDate.getDate();
            const month = actualDate.getMonth() + 1;
            const year = actualDate.getFullYear();

            function addLeadingZero(value) {
                return value < 10 ? `0${value}` : value;
            }

            const dayFormatted = addLeadingZero(days);
            const monthFormatted = addLeadingZero(month);

            const dateFormattedString = `${dayFormatted}/${monthFormatted}/${year}`;

            const data = {
                email, 
                nickName, 
                password: hashedPassword,
                createdInDate: dateFormattedString,
                userDescription: "Hi, I'm using Galaxy and would like to find friends.",
                avatar: "https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg"
            }

            try {
                await InsertLoginModel(client, data, email, nickName);
                res.status(201).json({ message: "Success" });
            } catch (error) {
                res.status(400).json({ message: "Não foi possível inserir um usuário! "});
            }
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erro ao tentar registrar usuário.' });
    }
}

module.exports = UserRegisterController