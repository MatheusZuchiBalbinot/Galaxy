import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

import spaceCat from '../../assets/cat_in_space.svg'
import styles from './Login.module.css'

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

import {BsFillPersonFill, BsFillLockFill} from 'react-icons/bs';
import {MdEmail} from 'react-icons/md'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'

import { useContext } from 'react';
import { userContext} from '../../context/userContext'

import RedirectButton from '../../components/LoginComponents/PageChangeButton/PageChangeButton';
import FormTitle from '../../components/LoginComponents/FormTitle/FormTitle';
import PageSubmitButton from '../../components/LoginComponents/PageSubmitButton/PageSubmitButton';
import FormInputs from '../../components/LoginComponents/FormInputs/FormInputs';

export default function Login() {

    const {setIsLogged} = useContext(userContext)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [nickName, setNickName] = useState('')
    const [email, setEmail] = useState('')

    const [showDialog, setShowDialog] = useState(false);

    const [errorMessages, setErrorMessages] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nickName: '',
    });

    const [passwordVisible, setPasswordVisible] = useState(true)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true)

    const navigate = useNavigate()

    const actualPage = window.location.href

    const goToRegister = () => {
        return navigate('/register')
    }

    const goToLogin = () => {
        return navigate('/login')
    }

    const colorErrorOrCorrectInput = (id, color) => {
        document.getElementById(id).style.borderBottom = `3px solid ${color}`
    }

    const handleErrorsResponse = (err, format) => {

        let errors;

        if(format == "login") {
            errors = err.response.data.newErrorMessages
        } else {
            errors = err.response.data.newErrorMessages
        }
        setErrorMessages(errors);
        colorInputsBasedOnErrors(errors, format);
    }

    const colorInputsBasedOnErrors = (errors, format) => {
        if(format == "login") {
            colorErrorOrCorrectInput("email", errors.email ? "red" : "green");
            colorErrorOrCorrectInput("password", errors.password ? "red" : "green");

            if(errors.mainError) {
                if (errors.mainError === 'Cadastro não encontrado.') {
                    colorErrorOrCorrectInput("password", "red");
                    colorErrorOrCorrectInput("email", "red");
                } else if (errors.mainError === 'Senha incorreta.') {
                    colorErrorOrCorrectInput("password", "red");
                    colorErrorOrCorrectInput("email", "green");
                } else {
                    colorErrorOrCorrectInput("password", "red");
                    colorErrorOrCorrectInput("email", "red");
                }
            }
        } else {
            colorErrorOrCorrectInput("password", errors.password ? "red" : "green");
            colorErrorOrCorrectInput("confirmPassword", errors.confirmPassword ? "red" : "green");

            colorErrorOrCorrectInput("email", errors.emailAlreadyExists || errors.email ? "red" : "green");
            colorErrorOrCorrectInput("nickname", errors.nickName || errors.nickNameAlreadyExists ? "red" : "green");

        }
    };

    const handleSuccessResponse = () => {
        setShowDialog(true);
        setTimeout(() => {
            setShowDialog(false);
        }, 2500);
    };
    
    const handleRegisterSubmit = (e) => {
        e.preventDefault()

        const data = {
            email, 
            nickName, 
            password,
            confirmPassword
        }

        let result;

        const creatingUser = async () => {
            try {
                result = await axios.post("http://localhost:3000/user/register", data);
            } 
            catch (err) {
                handleErrorsResponse(err, "register");
            } finally {
                if (result && result.status === 201) {
                    handleSuccessResponse();
                    return navigate("/login")
                }
            }
        }
        creatingUser()
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = { 
                userEmail: email,
                userPassword: password,
            }
            const result = await axios.post("http://localhost:3000/user/login", data);
            setIsLogged(result.data)
            return navigate('/home')
            
        } catch (error) {
            handleErrorsResponse(error, "login")
        }
    }

    return (
        <div className={styles.mainLoginDiv}>
            <div className={styles.loginDiv}>
                <div className={styles.formDiv}>
                    <form className={styles.mainForm}>
                        <div className={styles.formTitle}>
                            <FormTitle actualPage={actualPage} />
                        </div>
                        <div className={styles.formBody}>
                            <h1 className={styles.formBodyTitle}>Email: </h1>
                            <div className={styles.formInputDiv}>
                                <div className={styles.formIcon}>
                                    <MdEmail />
                                </div>
                                <input className={styles.formInput} id="email" maxLength={30} placeholder='Ex: matheus@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} type='text'></input>
                            </div>
                            {errorMessages.email ? <p className={styles.errorMessage}>{errorMessages.email}</p> : null}
                            {errorMessages.emailAlreadyExists ? <p className={styles.errorMessage}>{errorMessages.emailAlreadyExists}</p> : null}
                            <h1 className={styles.formBodyTitle}>Senha: </h1>
                            <div className={styles.formInputDiv}>
                                <div className={styles.formIcon}>
                                    <BsFillLockFill />
                                </div>
                                <input className={styles.formInput} id="password" autoComplete='off' maxLength={20} placeholder='#Ex: dsa5S!9' value={password} onChange={(e) => setPassword(e.target.value)} type={passwordVisible ? 'password' : 'text'}></input>
                                <div className={styles.showPasswordIcon} onClick={() => setPasswordVisible(!passwordVisible)}>
                                    {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </div>
                            </div>
                            {errorMessages.password ? <p className={styles.errorMessage}>{errorMessages.password}</p> : null}
                            <FormInputs
                                actualPage={actualPage}
                                confirmPassword={confirmPassword}
                                confirmPasswordVisible={confirmPasswordVisible}
                                nickName={nickName}
                                errorMessages={errorMessages}
                                setConfirmPassword={setConfirmPassword}
                                setConfirmPasswordVisible={setConfirmPasswordVisible}
                                setNickName={setNickName}
                            />
                            {errorMessages.mainError ? <p className={styles.errorMessage}>{errorMessages.mainError}</p> : null}
                            {errorMessages.nickNameAlreadyExists ? <p className={styles.errorMessage}>{errorMessages.nickNameAlreadyExists}</p> : null}
                        </div>
                        <div className={styles.formButton}>
                            <div className={styles.buttonDiv}>
                                <PageSubmitButton actualPage={actualPage} handleRegisterSubmit={handleRegisterSubmit} handleLoginSubmit={handleLoginSubmit} />
                            </div>
                            <div className={styles.buttonDiv}>
                                <RedirectButton actualPage={actualPage} goToRegister={goToRegister} goToLogin={goToLogin} />
                            </div>
                        </div>
                    </form>
                </div>
                <div className={styles.gifDiv}>
                    <img src={spaceCat} className={styles.spaceCatStyle}></img>
                    <a href="https://storyset.com/cute" className={styles.storysetText}>Cute illustrations by Storyset</a>
                </div>
            </div>
            {showDialog && (
            <div className={styles.dialogDiv}>
                <Alert status='success'>
                    <AlertIcon />
                    <AlertTitle> Usuário </AlertTitle>
                    <AlertDescription> Um usuário foi criado com sucesso! </AlertDescription>
                </Alert>
            </div>
        )}
        </div>
    )
}