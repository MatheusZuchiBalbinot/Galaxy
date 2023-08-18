const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const validator = require('validator');

const { MongoClient } = require('mongodb');

const insertOneInRegister = require('./routes/insertOneInRegister');
const getUserByEmail = require("./routes/getUserByEmail")

const app = express();
const port = 3000;

const uri = "mongodb+srv://matheusbalbinotzuchi:wYo5DDkrix5NkjUP@cluster0.ub3ovh1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.use(express.json());
app.use(cors());

const saltRounds = parseInt(process.env.SALT_ROUNDS);
 
const connectingToDatabase = async () => {

    if(await client.connect()) {
        console.log("Successfully connected!")

        app.post('user/register', async (req, res) => {
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
                    await insertOneInRegister(client, data);
                    res.status(201).json({message: "Sucess"})
                }
        
            } catch (e) {
                console.error(e);
                res.status(500).json({ error: 'An error occurred' });
            }
        });

        app.post('/user/login', async (req, res) => {
            try {
                const {userEmail, userPassword} = req.body
                const usersCursor = await getUserByEmail(client, userEmail);
                const {email: databaseEmail, nickName, password: hashedPassword} = usersCursor;
                // console.log(databaseEmail, nickName, hashedPassword, userPassword)
                const passwordsMatch = await bcrypt.compare(userPassword, hashedPassword);

                res.status(200).json({
                    passwordsMatch,
                    nickName,
                })
            } catch(error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        })
    }

}

connectingToDatabase()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
